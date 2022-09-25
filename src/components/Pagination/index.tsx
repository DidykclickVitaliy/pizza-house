import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";

import { setCurrentPage } from "../../redux/filter/slice";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage: number;
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage }) => {
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
    />
  );
};
