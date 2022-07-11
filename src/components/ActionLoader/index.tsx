import React from 'react';
import Loader from '../Loader';
import styles from '../Modal/Modal.module.scss';


const ActionLoader = (): JSX.Element => (
  <div  className={styles.overlay}>
    <Loader />
  </div>
);

export default ActionLoader;