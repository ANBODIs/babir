import React, { useState } from 'react';
import { Button, Card, Typography, Modal, InputNumber } from "antd";
import styles from "./ServiceItem.module.css";

const ServiceItem = ({ name, content, price, img }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleOk = () => {
    setModalVisible(false);
    // Implement your code to handle the purchase, such as adding the service to a cart or submitting an order.
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <Card
      hoverable
      className={styles.card}
      title={<h4>{name}</h4>}
      cover={<img src={img} alt={name} />}
      actions={[
        <Button type="primary" key="buy" onClick={() => setModalVisible(true)}>
          Купить
        </Button>
      ]}
    >
      <div className={styles.contentContainer}>
        <Typography.Text className={styles.content}>
          {content}
        </Typography.Text>
        <div className={styles.priceContainer}>
          <Typography.Text className={styles.price}>
            {price} руб.
          </Typography.Text>
        </div>
      </div>
      <Modal
        title={name}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Отменить
          </Button>,
          <Button key="buy" type="primary" onClick={handleOk}>
            Купить
          </Button>
        ]}
      >
        <p>{content}</p>
        <p>Цена: {price} руб.</p>
        <InputNumber min={1} defaultValue={1} onChange={(value) => setQuantity(value)} />
        <Typography.Text>Количество: {quantity}</Typography.Text>
      </Modal>
    </Card>
  );
};

export default ServiceItem;
