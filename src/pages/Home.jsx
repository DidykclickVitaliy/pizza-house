import React from "react";

import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";

export const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        await fetch("https://6304c03394b8c58fd7244553.mockapi.io/items")
          .then((response) => response.json())
          .then((json) => {
            setItems(json);
          });

        setIsLoading(false);
        // window.scrollTo(0, 0);
      } catch (error) {
        alert(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">All pizzas</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
            : items.map((item, index) => (
                <PizzaBlock key={index} loading={isLoading} {...item} />
              ))}
        </div>
      </div>
    </>
  );
};
