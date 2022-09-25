import React from "react";
import { Link } from "react-router-dom";

import emptyCartImg from "../assets/img/empty-cart.png";

export const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Cart is empty <span>:c</span>
      </h2>
      <p>
        You probably haven't ordered pizza yet.
        <br />
        To order pizza, go to the main page.
      </p>
      <img src={emptyCartImg} alt="Empty cart" />

      <Link to="/" className="button button--black">
        <span>Return back</span>
      </Link>
    </div>
  );
};
