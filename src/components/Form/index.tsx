import React, { FormEvent } from 'react';
import Button from '../Button';
import styles from './Form.module.scss';

export interface FormProps {
  children: JSX.Element | JSX.Element[]
  handleSubmit(e: FormEvent): void
}

const Form = ({ children, handleSubmit }: FormProps): JSX.Element => {
  return (
    <div className={styles['wrapper']}>
    <form onSubmit={handleSubmit} className={styles.form}>
      {children}
      <div className={styles['button-group']}>
        <Button width="100px" type="submit" text={'Salvar'} />
      </div>
    </form>
    </div>
  );
}

export default Form;