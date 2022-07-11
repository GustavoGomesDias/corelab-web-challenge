import { useEffect, useState, MouseEvent } from "react";
import { IoOptionsOutline } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Card, Modal, Search, CreateForm, FilterForm, Loader, Toast } from "../../components";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";
import api from "../../services/fetchAPI/init";
import useToast from "../../hooks/useToast";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalChildre, setModalChildren] = useState<JSX.Element | JSX.Element[]>(<FilterForm setIsOpen={setIsOpen} />)
  const { addToast } = useToast();

  useEffect(() => {
    const fetchVehicles = async () => {
      addToast('Não tem veículos cadastrados')
      const response = await api.get('/');
      if (response.data.error) {
        setVehicles([]);

        return;
      }
      setVehicles(response.data.content as IVehicle[]);

      if ((response.data.content as IVehicle[]).length <= 0) {
        addToast('Não tem veículos cadastrados')
      }
    };

    fetchVehicles();
  }, []);

  const handleOpenModal = (e: MouseEvent<HTMLButtonElement>, type: 'add' | 'filter') => {

    e.preventDefault();

    if (type === 'add') {
      setModalChildren(<CreateForm setIsOpen={setIsOpen} />);
    } else {
      setModalChildren(<FilterForm setIsOpen={setIsOpen} />);
    }

    setIsOpen(true);
  }

  return (
    <div className={styles.Vehicles}>
      {isOpen && <Modal setIsOpen={setIsOpen} isOpen={isOpen} children={(modalChildre)} />}
      <main className={styles.main}>
        <div className={styles.filter}>
          <Search placeholder="Search" value={search} onChange={() => { }} />
          <button onClick={(e) => handleOpenModal(e, 'filter')}><IoOptionsOutline width="30px" height="30%" /></button>
        </div>

        <Button Icon={AiOutlinePlus} text="Adicionar" onClick={(e) => handleOpenModal(e, 'add')} />
        {vehicles.length <= 0 && <Loader />}
        <div className={styles['card-grid']}>
          {vehicles.length > 0 && vehicles.map((vehicle) => (
            <Card vehicle={vehicle} key={vehicle.plate} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default VehiclesPage;
