import { useEffect, useState, MouseEvent } from "react";
import { IoOptionsOutline } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { getVehicles } from "../../lib/api";
import { Button, Card, Modal, Search, Form, Input, CreateForm, FilterForm } from "../../components";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      const payload = await getVehicles();
      setVehicles(payload);
    };

    fetchVehicles();
  }, []);

  const handleOpenModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsOpen(true);
  }

  return (
    <div className={styles.Vehicles}>
      {isOpen && <Modal setIsOpen={setIsOpen} isOpen={isOpen} children={(<FilterForm />)} />}
      <main className={styles.main}>
        <div className={styles.filter}>
          <Search placeholder="Search" value={search} onChange={() => { }} />
          <button onClick={(e) => handleOpenModal(e)}><IoOptionsOutline width="30px" height="30%" /></button>
        </div>

        <Button Icon={AiOutlinePlus} text="Adicionar" onClick={(e) => handleOpenModal(e)} />

        <div className={styles['card-grid']}>
          <Card vehicle={{
            name: 'Sandero Stepway',
            color: 'red',
            description: 'Descrição provisória',
            plate: 'ABCD1234',
            price: 29000.90,
            isFavorite: true,
            year: 2010,
          }} />
          <Card vehicle={{
            name: 'Sandero Stepway',
            color: 'yellow',
            description: 'Descrição provisória',
            plate: 'ABCD1234',
            price: 29000.90,
            isFavorite: true,
            year: 2010,
          }} />
        </div>
      </main>
    </div>
  );
};

export default VehiclesPage;
