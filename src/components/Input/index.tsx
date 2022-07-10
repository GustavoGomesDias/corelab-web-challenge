import React from 'react';
import styles from './Input.module.scss';

export interface InputProps {
  label: string
  placeholder: string
  setValue: React.Dispatch<React.SetStateAction<any>>
  value: string | number
  type: 'number' | 'text' | 'date'
}

const Input = ({ label, placeholder, setValue, value, type }: InputProps): JSX.Element => {
  return (
    <div className={styles['input-wrapper']}>
      <label className={styles.label} >{label}</label>
      <input className={styles.input} type={type} placeholder={placeholder} value={value} onChange={(e) =>{
        e.preventDefault();
        setValue(e.target.value);
      }} />
    </div>
  );
}

export default Input;