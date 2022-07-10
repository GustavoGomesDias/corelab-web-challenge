import React, { useEffect, useState } from "react";
import { BiEdit } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import {  VehicleCard } from "../../types/Vehicle";
import { colorNameToHex, getFontColor, hexToRgb } from "../../util/helpers";
import { isHexColor, isValidColor } from "../../util/validations";
import styles from "./Card.module.scss";

interface ICard {
  vehicle: VehicleCard
}

const Card = ({ vehicle }: ICard) => {
  const [cardColor, setCardColor] = useState<string>('white');
  const [fontColorCard, setFontColorCard] = useState<string>('white');

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

  return (
    <div className={styles.Card} style={{ background: cardColor, color: fontColorCard }}>
      <div className={styles['button-group']} style={{ color: fontColorCard }} >
        <button><BiEdit color={fontColorCard} /></button>
        <button><AiOutlineCloseCircle color={fontColorCard} /></button>
        <button>{vehicle.isFavorite ? <BsHeartFill  color={fontColorCard} /> : <BsHeart color={fontColorCard} />}</button>
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
