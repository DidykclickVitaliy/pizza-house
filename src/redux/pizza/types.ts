export type PizzaItem = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
};

export enum StatusEnum {
  LOADIND = "loading",
  SUCCESS = "success",
  REJECTED = "rejected",
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: StatusEnum;
}
