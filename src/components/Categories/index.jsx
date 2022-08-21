import React from "react";

export const Categories = () => {
  const categories = ["All", "Meaty", "Vegetarian", "Grill", "Spicy", "Closed"];

  const [activeCategory, setActiveCategory] = React.useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              className={activeCategory === index ? "active" : ""}
              onClick={() => setActiveCategory(index)}
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
