import React, { FormEvent, useState } from 'react';
import ActionLoader from '../ActionLoader';
import Button from '../Button';
import styles from './Form.module.scss';

export interface FormProps {
  children: JSX.Element | JSX.Element[]
  handleSubmit(e: FormEvent): Promise<void>
}

const Form = ({ children, handleSubmit }: FormProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await handleSubmit(e);
    setIsLoading(false);

  }

  return (
    <div className={styles['wrapper']}>
      {isLoading && <ActionLoader />}
    <form onSubmit={handleFormSubmit} className={styles.form}>
      {children}
      <div className={styles['button-group']}>
        <Button width="100px" type="submit" text={'Salvar'} />
      </div>
    </form>
    </div>
  );
}

export default Form;