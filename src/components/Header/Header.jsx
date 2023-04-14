import React, { useState } from 'react';
import styles from "./Header.module.css";
import { Button, Input, Modal, Typography } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
    const [modalVisible, setModalVisible] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://exam.avavion.ru/api/requests/create", {
            full_name: formData.name,
            email: formData.email,
            message: formData.message,
            service_id: 1
      });
      console.log(response);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoWrapper}>
        <h2 className={styles.logo}>Suck Internet Optimization</h2>
      </Link>
      <nav className={styles.menu}>
        <Button type="primary" onClick={() => setModalVisible(true)}>Оставить заявку</Button>
        <Modal title="Оставить заявку" visible={modalVisible} onCancel={() => setModalVisible(false)}>
          <form onSubmit={handleSubmit}>
            <Input name="email" placeholder="Введите email" type="email" value={formData.email} onChange={handleChange} />
            <Input name="name" placeholder="Введите имя" type="text" value={formData.name} onChange={handleChange} />
            <Input name="message" placeholder="Введите сообщение" type="text" value={formData.message} onChange={handleChange} />
            <Button type="primary" htmlType="submit">Отправить</Button>
          </form>
        </Modal>
      </nav>
    </header>
  );
};

export default Header;