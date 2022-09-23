import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import qs from "qs";

import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { Pagination } from "../components/Pagination";
import { setFilters } from "../redux/filter/slice";
import { selectPizza } from "../redux/pizza/selectors";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { SortType } from "../redux/filter/types";
import { fetchPizzas } from "../redux/pizza/asyncActions";

// #19: 🍕 React Pizza v2

export const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSearchRef = React.useRef(false);
  const isMountedRef = React.useRef(false);
  // const [items, setItems] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const [sort, setSortType] = React.useState({
  //   name: "popularity (DESC)",
  //   sortProperty: "rating",
  // });
  //do to click on svg and change desc asc 9 lesson comms

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMountedRef.current) {
      const queryString = qs.stringify(
        {
          sortProperty: sort.sortProperty,
          categoryId,
          currentPage,
          // fix it in sort component searchValiue
        },
        { addQueryPrefix: true }
      );

      navigate(queryString);
    }

    isMountedRef.current = true;
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

  // Если был первый рендер, то проверяем УРЛ-параметры и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      // #24: 🍕 React Pizza v2
      // const params = qs.parse(window.location.search.substring(1));

      // const sort = sortTypes.find(
      //   (obj) => obj.sortProperty === params.sortProperty
      // );

      dispatch(
        setFilters({
          categoryId,
          currentPage,
          searchValue,
          sort: sort as SortType,
        })
      );

      isSearchRef.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    // setIsLoading(true);
    window.scrollTo(0, 0);

    function getPizzas() {
      const page = `page=${currentPage}&limit=4`;
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const sortBy = sort.sortProperty.replace("-", "");
      const order = sort.sortProperty.includes("-") ? "asc" : "desc";
      const search = searchValue ? `&search=${searchValue}` : "";

      dispatch(
        fetchPizzas({
          page,
          category,
          sortBy,
          order,
          search,
        })
      );
      // try {
      //   await dispatch(fetchPizzas({ page, category, sortBy, order, search }));
      // } catch (error) {
      //   console.log("Cannot fetch pizzas".error);
      // }
    }

    if (!isSearchRef.current) {
      getPizzas();
    }

    isSearchRef.current = false;
  }, [categoryId, sort, currentPage, searchValue]);

  // const filterItems = (item) => {
  //   const filteredItems = item.filter((obj) =>
  //     obj.title.toLowerCase().includes(searchValue.toLowerCase())
  //   );

  //   return filteredItems;
  // };
  // for static data, like a 50 countries in 1 array

  const skeleton = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = items.map((item: any) => (
    <PizzaBlock key={item.id} {...item} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} />
          <Sort value={sort} />
        </div>
        <h2 className="content__title">All pizzas</h2>
        {status === "rejected" ? (
          <div className="content__error-info">
            <h2>An error has occurred :c</h2>
            <p>
              Unfortunately it was not possible to get pizzas. Please try again
              later.
            </p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeleton : pizzas}
          </div>
        )}

        <Pagination currentPage={currentPage} />
      </div>
    </>
  );
};
