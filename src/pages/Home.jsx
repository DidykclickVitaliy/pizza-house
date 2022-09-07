import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { Pagination } from "../components/Pagination";

export const Home = () => {
  // create a commit SROCHNA  debounce, usecallback useref
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const [sort, setSortType] = React.useState({
  //   name: "popularity (DESC)",
  //   sortProperty: "rating",
  // });
  //do to click on svg and change desc asc 9 lesson comms

  React.useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);

    async function fetchData() {
      const page = `page=${currentPage}&limit=4`;
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const sortBy = sort.sortProperty.replace("-", "");
      const order = sort.sortProperty.includes("-") ? "asc" : "desc";
      const search = searchValue ? `&search=${searchValue}` : "";

      try {
        // await fetch(
        //   `https://6304c03394b8c58fd7244553.mockapi.io/items?${page}&${category}&sortBy=${sortBy}&order=${order}${search}`
        // )
        //   .then((response) => response.json())
        //   .then((json) => {
        //     setItems(json);
        //   });

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

    fetchData();
  }, [categoryId, sort, currentPage, searchValue]);

  // const filterItems = (item) => {
  //   const filteredItems = item.filter((obj) =>
  //     obj.title.toLowerCase().includes(searchValue.toLowerCase())
  //   );

  //   return filteredItems;
  // };
  // for static data, like a 50 countries in 1 array

  const skeleton = [...new Array(8)].map((_, index) => (
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
