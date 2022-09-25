import { CartItemType } from "../redux/cart/types";

export const calcTotalCount = (items: CartItemType[]) => {
  return items.reduce((sum, obj) => {
    return obj.count + sum;
  }, 0);
};
