import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <span>:c</span>
      <h1>Nothing found</h1>

      <p className={styles.description}>
        Sorry, this page is not available in our online store.
      </p>
    </div>
  );
};
