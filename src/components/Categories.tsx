import React from "react";
import { useDispatch } from "react-redux";

import { setCategoryId } from "../redux/filter/slice";

type CategoriesProps = {
  value: number;
  // onChangeCateogry: (id: number) => void
};

const categories: string[] = [
  "All",
  "Meaty",
  "Vegetarian",
  "Grill",
  "Spicy",
  "Closed",
];

export const Categories: React.FC<CategoriesProps> = ({ value }) => {
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              className={value === index ? "active" : ""}
              onClick={() => dispatch(setCategoryId(index))}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
  // 4 urok 56:58
};
