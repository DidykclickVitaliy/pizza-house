export enum SortPropertiesEnum {
  RATING_DESK = "rating",
  RATING_ASK = "-rating",
  PRICE_DESK = "price",
  PRICE_ASK = "-price",
  TITLE_DESK = "title",
  TITLE_ASK = "-title",
}

export type SortType = {
  name: string;
  sortProperty: SortPropertiesEnum;
};

export interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  searchValue: string;
  sort: SortType;
}
