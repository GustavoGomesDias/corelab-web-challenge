import React, { MouseEvent, useRef } from "react";
import styles from "./Modal.module.scss";
import { AiOutlineArrowLeft } from 'react-icons/ai';

export interface ModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
  children: JSX.Element | JSX.Element[]
}

const Modal = ({ setIsOpen, isOpen, children }: ModalProps): JSX.Element => {
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
        <div className={styles.content}>
          {children}
        </div>
      </div >
    </>
  )
};

export default Modal;