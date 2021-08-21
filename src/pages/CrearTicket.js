import React, { useContext, useState } from "react";
import { useHideMenu } from "../hooks/useHideMenu";
import { SocketContext } from "../context/SocketContext";

import Typography from "antd/lib/typography";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Button from "antd/lib/button";
// import { Button, Col, Row, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const CrearTicket = () => {
  useHideMenu(false);

  const { socket } = useContext(SocketContext);

  const [ticket, setTicket] = useState(null);

  const nuevoTicket = () => {
    //el callback se va a ejecutar cuando el backend quiera
    socket.emit("solicitar-ticket", null, (ticket) => {
      // console.log(ticket)
      setTicket(ticket);
    });
  };

  return (
    <>
      <Row>
        <Col span={14} offset={6} align="center">
          <Title level={3}>
            Presione el botón para generar un nuevo ticket
          </Title>

          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size="large"
            onClick={nuevoTicket}
          >
            {}
          </Button>
        </Col>
      </Row>

      {ticket && (
        <Row style={{ marginTop: 100 }}>
          <Col span={14} offset={6} align="center">
            <Text level={2}>Su número</Text>
            <br />
            <Text type="success" style={{ fontSize: 55 }}>
              {ticket.numero}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};
