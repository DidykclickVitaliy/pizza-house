export type CartItemType = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  count: number;
  type: string;
  size: number;
};

export interface CartSliceState {
  items: CartItemType[];
  totalPrice: number;
  totalCount: number;
}
