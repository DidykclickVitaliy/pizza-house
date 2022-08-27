import React from "react";

export const Categories = ({ value, onChangeCategory }) => {
  const categories = ["All", "Meaty", "Vegetarian", "Grill", "Spicy", "Closed"];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              className={value === index ? "active" : ""}
              onClick={() => onChangeCategory(index)}
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
