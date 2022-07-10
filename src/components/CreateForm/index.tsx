import React, { useState, FormEvent } from 'react';
import Form from '../Form';
import Input from '../Input';

const CreateForm = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [year, setYear] = useState<number>(1900);
  const [plate, setPlate] = useState<string>('');

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
  }

  return (
    <Form handleSubmit={handleSubmit}>
      <Input label="Nome" placeholder="Nome do carro" setValue={setName} value={name} type="text" />
      <Input label="Marca" placeholder="Marca do carro" setValue={setBrand} value={brand} type="text" />
      <Input label="Cor" placeholder="Cor do carro" setValue={setColor} value={color} type="text" />
      <Input label="Ano" placeholder="Ano do carro" setValue={setYear} value={year} type="number" />
      <Input label="Placa" placeholder="Placa do carro" setValue={setPlate} value={plate} type="text" />
    </Form>
  );
}

export default CreateForm;