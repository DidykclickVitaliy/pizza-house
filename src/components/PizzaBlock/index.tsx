import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartItemById } from "../../redux/cart/selectors";

import { addItem } from "../../redux/cart/slice";
import { CartItemType } from "../../redux/cart/types";

type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  title: string;
  count: number;
  price: number;
  types: number[];
  sizes: number[];
};

const pizzaTypes: string[] = ["subtle", "traditional"];

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  imageUrl,
  title,
  price,
  types,
  sizes,
}) => {
  const cartItem = useSelector(selectCartItemById(id));
  const dispatch = useDispatch();

  const [typeActive, setTypeActive] = React.useState(types[0]);
  const [sizeActive, setSizeActive] = React.useState(0);
  const amountOfAdded: number = cartItem ? cartItem.count : 0;

  const addItemToCart = () => {
    const item: CartItemType = {
      id,
      imageUrl,
      title,
      price,
      count: 0,
      type: pizzaTypes[typeActive],
      size: sizes[sizeActive],
    };

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <Link to={`pizza/${id}`}>
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeIndex) => {
            return (
              <li
                key={typeIndex}
                className={typeActive === typeIndex ? "active" : ""}
                onClick={() => setTypeActive(typeIndex)}
              >
                {pizzaTypes[typeIndex]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, index) => {
            return (
              <li
                key={index}
                className={sizeActive === index ? "active" : ""}
                onClick={() => setSizeActive(index)}
              >
                {size} cm.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">from {price} ₴</div>
        <button
          className="button button--outline button--add"
          onClick={addItemToCart}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {amountOfAdded > 0 && <i>{amountOfAdded}</i>}
        </button>
      </div>
    </div>
  );
};
