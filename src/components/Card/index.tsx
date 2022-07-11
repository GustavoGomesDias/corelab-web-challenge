import React, { MouseEvent, useEffect, useState } from "react";
import { BiEdit } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { IVehicle, VehicleCard } from "../../types/Vehicle";
import { colorNameToHex, getFontColor, hexToRgb } from "../../util/helpers";
import { isHexColor, isValidColor } from "../../util/validations";
import styles from "./Card.module.scss";
import useVehicleControl from "../../hooks/useVehicleControl";
import Modal from "../Modal";
import VehicleForm from "../VehicleForm";

interface ICard {
  vehicle: VehicleCard
}

const Card = ({ vehicle }: ICard) => {
  const [cardColor, setCardColor] = useState<string>('white');
  const [fontColorCard, setFontColorCard] = useState<string>('white');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalChildre, setModalChildren] = useState<JSX.Element | JSX.Element[]>(<VehicleForm setIsOpen={setIsOpen}/>);


  const { handleAddVehicleInFavorites, handleRemoveVehicle, handleAddAllVehicles, handleRemoveVehicleFromFavorites } = useVehicleControl();

  useEffect(() => {
    const handleSetCardColor = () => {
      if (isValidColor(vehicle.color)) {
        setCardColor(vehicle.color);
        if (isHexColor(vehicle.color)) {
          const fontColor = getFontColor(hexToRgb(vehicle.color));
          setFontColorCard(fontColor);
        } else {
          const fontColor = getFontColor(hexToRgb(colorNameToHex(vehicle.color)));
          setFontColorCard(fontColor);
        }
      }
    }

    handleSetCardColor();

  }, [vehicle.color]);

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalChildren(<VehicleForm setIsOpen={setIsOpen} id={vehicle._id} />);
    setIsOpen(true);
  }

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    await handleRemoveVehicle(vehicle._id);
  }

  const handleAddFavorite = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!vehicle.isFavorite) {
      await handleAddVehicleInFavorites(vehicle as IVehicle);
      await handleAddAllVehicles();
      return;
    } else {
      await handleRemoveVehicleFromFavorites(vehicle as IVehicle);
      await handleAddAllVehicles();
      return;
    }
  }

  return (
    <div key={vehicle.plate} className={styles.Card} style={{ background: cardColor, color: fontColorCard }}>
      {isOpen && <Modal setIsOpen={setIsOpen} isOpen={isOpen} children={(modalChildre)} />}

      <div className={styles['button-group']} style={{ color: fontColorCard }} >
        <button onClick={(e) => handleEdit(e)}><BiEdit color={fontColorCard} /></button>
        <button onClick={async (e) => await handleDelete(e)}><AiOutlineCloseCircle color={fontColorCard} /></button>
        <button onClick={async (e) => await handleAddFavorite(e)}>{vehicle.isFavorite ? <BsHeartFill color={fontColorCard} /> : <BsHeart color={fontColorCard} />}</button>
      </div>
      <h2>{vehicle.name}</h2>
      <div className={styles.content}>
        <p>Preço: {vehicle.price}</p>
        <p>Descrição: {vehicle.description}</p>
        <p>Year: {vehicle.year}</p>
        <p>Placa: {vehicle.plate}</p>
        <p>Cor: {vehicle.color}</p>
      </div>
    </div>
  );
};

export default Card;
