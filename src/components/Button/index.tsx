import React, { MouseEvent } from 'react';
import { IconType } from 'react-icons';
import styles from './Button.module.scss';

interface IButton {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  text: string;
  Icon?: IconType;
  width?: string
  type?: 'submit' | 'button'
}

const Button = ({ onClick, text, Icon, width, type }: IButton) => {
  return (
    <button type={type ? type : 'button'} style={{ width: width ? width : '100%' }} className={styles.Button} onClick={onClick}>
      {Icon && <Icon className={styles.icon} />} {text}
    </button>);
};

export default Button;
