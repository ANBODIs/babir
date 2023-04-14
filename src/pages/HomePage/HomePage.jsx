import React, { useState, useEffect } from 'react';
import { Input, Button } from "antd";
import Header from "../../components/Header/Header.jsx";
import ServicesList from "../../components/ServicesList/ServicesList.jsx";
import styles from "./HomePage.module.css";
import { discount } from "../../utils/discount.js";

function HomePage() {
  const [allServices, setAllServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://exam.avavion.ru/api/services");
      const data = await response.json();
      setAllServices(data.data);
      setFilteredServices(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    const matchingServices = allServices.filter((service) =>
      service.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredServices(matchingServices);
  };

  const handleSearch = () => {
    // This function is no longer needed because the filtering is done in the handleInputChange function.
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.filters}>
        <Input
          onChange={handleInputChange}
          placeholder="Введите название"
        />
        <Button type="primary" onClick={handleSearch}>Найти</Button>
      </div>
      <ServicesList services={filteredServices.map(service => ({...service, price: discount(service.price, service.dicsount_percent)}))} />
    </div>
  );
}

export default HomePage;
