import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import { IoOptionsOutline } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Card, Modal, Search, CreateForm, FilterForm, Loader, Toast } from "../../components";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";
import api from "../../services/fetchAPI/init";
import useToast from "../../hooks/useToast";
import useVehicleControl from "../../hooks/useVehicleControl";

const VehiclesPage = () => {
  const { allVehicles, favorites, filterResultVehicles, searchResultVehicles, handleAddAllVehicles, handleAddVehiclesInSearchList } = useVehicleControl();
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [isFavorites, setIsFavorites] = useState<IVehicle[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalChildre, setModalChildren] = useState<JSX.Element | JSX.Element[]>(<FilterForm setIsOpen={setIsOpen} />)
  const { addToast } = useToast();

  useEffect(() => {
    const fetchVehicles = async () => {
      await handleAddAllVehicles();
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    setVehicles(allVehicles)
  }, [allVehicles]);

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsFavorites(favorites);
    };

    fetchVehicles();
  }, [favorites]);

  useEffect(() => {
    const handleFilters = () => {
      if (searchResultVehicles.length > 0) {
        setVehicles([]);
        setVehicles(searchResultVehicles);
      }
    };

    handleFilters();
  }, [searchResultVehicles]);

  useEffect(() => {
    const handleFilters = () => {
      if (filterResultVehicles.length > 0) {
        setVehicles(filterResultVehicles);
      }
    };

    handleFilters();
  }, [filterResultVehicles]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const timer = setTimeout(() => setSearch(e.target.value), 2000);

    return () => clearTimeout(timer);
  }

  useEffect(() => {
    handleAddVehiclesInSearchList(search);
  }, [search])

  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
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
          <Search placeholder="Pesquise aqui..." value={search} onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e)} />
          <button onClick={(e) => handleOpenModal(e, 'filter')}><IoOptionsOutline width="30px" height="30%" /></button>
        </div>

        <Button Icon={AiOutlinePlus} text="Adicionar" onClick={(e) => handleOpenModal(e, 'add')} />
        {vehicles.length <= 0 && <Loader />}
        {vehicles.length > 0 && <h2>Favoritos</h2>}
        <div className={styles['card-grid']}>
          {isFavorites.length > 0 && isFavorites.map((vehicle) => (
            <Card vehicle={vehicle} key={vehicle.plate} />
          ))}
        </div>

        {vehicles.length > 0 && <h2>Todos</h2>}
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
