import React from 'react';
import { FaReact } from 'react-icons/fa';
import styles from './Loader.module.scss';

const Loader = (): JSX.Element => (
  <div className={styles.loader}>
    <FaReact className={styles.spin}  />
  </div>
);

export default Loader;