import { useWhyDidYouUpdate } from "ahooks";
import React from "react";
import { useDispatch } from "react-redux";

import { setCategoryId } from "../redux/filter/slice";

type CategoriesProps = {
  value: number;
};

const categories: string[] = [
  "All",
  "Meaty",
  "Vegetarian",
  "Grill",
  "Spicy",
  "Closed",
];

export const Categories: React.FC<CategoriesProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();

  const onChangeCateogry = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  useWhyDidYouUpdate("Categories", { value, onChangeCateogry });

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              className={value === index ? "active" : ""}
              onClick={() => onChangeCateogry(index)}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
});
