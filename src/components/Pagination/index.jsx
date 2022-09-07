import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/filter/slice";

import styles from "./Pagination.module.scss";

export const Pagination = ({ currentPage }) => {
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      // forcePage={currentPage - 1} by deffaut index 0 propably
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
