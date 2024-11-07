import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <span className={styles.main}>:(</span>
      <h1>Ничего не найдено</h1>
      <br />
      <h1 className={styles.description}>Ну не найдено ничего</h1>
    </div>
  );
};

export default NotFoundBlock;
