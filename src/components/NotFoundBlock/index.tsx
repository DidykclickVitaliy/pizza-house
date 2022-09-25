import React from "react";
import { Link } from "react-router-dom";

import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <span>:c</span>
      <h1>Nothing found</h1>

      <p className={styles.description}>
        Sorry, this page is not available in our online store.
      </p>

      <Link to="/" className="button button--black">
        <p className={styles.button}>Return to main page</p>
      </Link>
    </div>
  );
};
