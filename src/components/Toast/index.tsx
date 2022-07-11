import React, { useEffect } from "react";
import { ToastProps } from "../../context/ToastContext";
import useToast from "../../hooks/useToast";
import styles from './Toast.module.scss'

const Toast = ({ id, text }: ToastProps): JSX.Element => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  return (
    <div className={styles.wrapper}>
      <span className={styles.time} />
      <p className={styles.content}>
        {text}
      </p>
    </div>
  );
}

export default Toast;
