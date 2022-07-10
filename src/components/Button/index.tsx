import React, { MouseEvent } from 'react';
import { IconType } from 'react-icons';
import styles from './Button.module.scss';

interface IButton {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  text: string;
  Icon?: IconType;
}

const Button = ({ onClick, text, Icon }: IButton) => {
  return (
    <button className={styles.Button} onClick={onClick}>
      {Icon && <Icon className={styles.icon} />} {text}
    </button>);
};

export default Button;
