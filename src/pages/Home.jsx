import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";

import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Categories } from "../components/Categories";
import { Sort, sortTypes } from "../components/Sort";
import { Pagination } from "../components/Pagination";
import { setFilters } from "../redux/filter/slice";

export const Home = () => {
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearchRef = React.useRef(false);
  const isMountedRef = React.useRef(false);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
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
        },
        { addQueryPrefix: true }
      );

      navigate(queryString);
    }

    isMountedRef.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер, то проверяем УРЛ-параметры и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortTypes.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      if (sort) {
        params.sort = sort;
      }

      dispatch(setFilters(params));

      // dispatch(
      //   setFilters({
      //     ...params,
      //     sort,
      //   })
      // );

      isSearchRef.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);

    async function fetchItems() {
      const page = `page=${currentPage}&limit=4`;
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const sortBy = sort.sortProperty.replace("-", "");
      const order = sort.sortProperty.includes("-") ? "asc" : "desc";
      const search = searchValue ? `&search=${searchValue}` : "";

      try {
        await axios
          .get(
            `https://6304c03394b8c58fd7244553.mockapi.io/items?${page}&${category}&sortBy=${sortBy}&order=${order}${search}`
          )
          .then((response) => setItems(response.data));

        setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    }

    if (!isSearchRef.current) {
      fetchItems();
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

  const pizzas = items.map((item, index) => (
    <PizzaBlock key={index} loading={isLoading} {...item} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} />
          <Sort value={sort} />
        </div>
        <h2 className="content__title">All pizzas</h2>
        <div className="content__items">{isLoading ? skeleton : pizzas}</div>
        <Pagination currentPage={currentPage} />
      </div>
    </>
  );
};
