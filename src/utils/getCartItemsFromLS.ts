import { CartItemType } from "../redux/cart/types";
import { calcTotalCount } from "./calcTotalCount";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartItemsFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];

  return {
    items: items as CartItemType[],
    totalPrice: calcTotalPrice(items),
    totalCount: calcTotalCount(items),
  };
};
