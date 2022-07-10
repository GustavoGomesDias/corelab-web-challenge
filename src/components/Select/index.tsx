import React, { ChangeEvent } from 'react';
import styles from './Select.module.scss'

export interface SelectProps {
  label: string
  values: string[]
  setValue: React.Dispatch<React.SetStateAction<any>>
}

const Select = ({ setValue, values, label }: SelectProps): JSX.Element => {
  return (
    <div className={styles['input-wrapper']}>
      <label>{label}</label>
      <select onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setValue(e.target.value);
      }} className={styles.select}>
        <option value="default" >Selecione um modelo</option>
      </select>
    </div>
  );
}

export default Select;