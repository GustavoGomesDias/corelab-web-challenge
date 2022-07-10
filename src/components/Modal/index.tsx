import React, { MouseEvent, useRef } from "react";
import styles from "./Modal.module.scss";
import { AiOutlineArrowLeft } from 'react-icons/ai';

export interface ModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
}

const Modal = ({ setIsOpen, isOpen }: ModalProps): JSX.Element => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    console.log(e.currentTarget.id);

    if (overlayRef.current && overlayRef.current.contains(e.currentTarget)) {
      setIsOpen(false);
    }
  }

  return (
    <>
      {isOpen && <div ref={overlayRef} onClick={(e) => handleOutsideClick(e)} className={styles.overlay} />}
      <div id="modal" className={styles.modal}>
        <div className={styles['go-back']}>
          <button onClick={
            (e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          >
            <AiOutlineArrowLeft />
          </button>
        </div>
        <p className={styles.content}>Modal</p>
      </div >
    </>
  )
};

export default Modal;