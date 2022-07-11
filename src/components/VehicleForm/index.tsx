import React, { useState, FormEvent, useEffect } from 'react';
import useLoad from '../../hooks/useLoader';
import useToast from '../../hooks/useToast';
import api from '../../services/fetchAPI/init';
import { IVehicle } from '../../types/Vehicle';
import { validationField, validationPlate, validationYear } from '../../util/validations';
import Form from '../Form';
import Input from '../Input';

export interface ModalFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>> 
}

export interface VehicleFormProps extends ModalFormProps {
  id?: string
}

const VehicleForm = ({ setIsOpen, id }: VehicleFormProps): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [year, setYear] = useState<number>(1900);
  const [plate, setPlate] = useState<string>('');
  const [price, setPrice] = useState<number>(0);

  const { addToast } = useToast();
  const load = useLoad();

  useEffect(() => {
    const setEditVehicle = async () => {
      if (id) {
        const response = await api.get(`/id/${id}`);
        const vehicle = response.data.content as IVehicle;
        if (vehicle !== undefined) {
          setName(vehicle.name);
          setDescription(vehicle.description);
          setColor(vehicle.color);
          setYear(vehicle.year);
          setPlate(vehicle.plate);
          setPrice(vehicle.price);
        } else {
          addToast('Id inválido ou veículo não existente.');
        }
      }
    }

    setEditVehicle();
  }, [id]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (validationField(price) || validationField(name) || validationField(color) || validationField(plate) || validationField(year)) {
      addToast('Todos os campos precisam estar preenchidos.');
      return;
    }

    if (price < 1) {
      addToast('Preço inválido.');
    }

    if (!validationPlate(plate)) {
      addToast('A placa precisa estar no estilo ABC123');
      return;
    }

    if (!validationYear(year)) {
      addToast('O ano do carro precisa ser maior 1900');
      return;
    }


    setIsOpen(false);
    load.enableLoader();
    const response = await api.post('/', {
      name,
      plate,
      description,
      year,
      color,
      price,
    })
    load.disableLoader();

    if (response.data.error) {
      addToast(response.data.error);
      return;
    }

    addToast(response.data.message as string);
  }

  return (
    <Form handleSubmit={handleSubmit}>
      <Input label="Nome" placeholder="Nome do carro" setValue={setName} value={name} type="text" />
      <Input label="Descrição" placeholder="Breve descrição do carro..." setValue={setDescription} value={description} type="text" />
      <Input label="Cor" placeholder="Cor do carro" setValue={setColor} value={color} type="text" />
      <Input label="Ano" placeholder="Ano do carro" setValue={setYear} value={year} type="number" />
      <Input label="Placa" placeholder="Placa do carro" setValue={setPlate} value={plate} type="text" />
      <Input label="Preço" placeholder="19.900" setValue={setPrice} value={price} type="number" />
    </Form>
  );
}

export default VehicleForm;  