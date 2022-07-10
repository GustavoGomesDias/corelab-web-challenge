import React, { useState, FormEvent } from 'react';
import Form from '../Form';
import Input from '../Input';
import Select from '../Select';
import styles from './FilterForm.module.scss';

const FilterForm = (): JSX.Element => {
  const [brand, setBrand] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [year, setYear] = useState<number>(1900);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
  }

  return (
    <Form handleSubmit={handleSubmit}>
      <Select label="Marca" values={[]} setValue={setBrand} />
      <Select label="Cor" values={[]} setValue={setColor} />
      <Select label="Ano" values={[]} setValue={setYear} />
      <div className={styles.price}>
        <Input label="Preço mínimo" placeholder="100.00" setValue={setMinPrice} value={minPrice} type="number" />
        <Input label="Preço máximo" placeholder="100.00" setValue={setMaxPrice} value={maxPrice} type="number" /> 
      </div>
    </Form>
  );
}

export default FilterForm;