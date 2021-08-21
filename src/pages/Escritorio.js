import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";
import { useHideMenu } from "../hooks/useHideMenu";

import Typography from "antd/lib/typography";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Button from "antd/lib/button";
import Divider from "antd/lib/divider";

import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { SocketContext } from "../context/SocketContext";

const { Title, Text } = Typography;

export const Escritorio = () => {

  useHideMenu(false);

  //esto vendrá de la API LocalStorage 
  //usuario es un objeto con dos properties
  const [usuario] = useState(getUsuarioStorage());
  const { socket } = useContext(SocketContext);

  const [ticket, setTicket] = useState(null);

  const history = useHistory();

  const {agente,escritorio} =usuario;

   const salir = () => {
    localStorage.removeItem('agente')
    localStorage.removeItem('escritorio');
    history.replace("/ingresar")
   };

   const siguienteTicket = () => {
     //el backend debe de saber el usuario y mandará el ticket
    socket.emit('siguiente-ticket-trabajar', usuario,(ticket)=>{
      setTicket(ticket);
    })    
   }

   if ( !usuario.agente || !usuario.escritorio ) {
    return <Redirect to="/ingresar" />
  }


  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{agente}</Title>
          <Text>Usted está trabajando en el escritorio: </Text>
          <Text type="success">{ escritorio }</Text>
        </Col>
        <Col span={4} align="right">
          <Button shape="round" type="danger" onClick={salir}>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider />

{
  ticket 
  ? (
      <Row>
        <Col>
          <Text>Está atendiendo el ticket número: </Text>
          <Text 
          style={{ fontSize:30 }}
          type="danger"
          >{ ticket.numero }</Text>
        </Col>
      </Row>
  )
  : (
    <Row>
    <Col>
      <Text     
      style={{ fontSize:24,textAlign: 'center' }}
      type="success"
      >No hay tickets en cola</Text>
    </Col>
  </Row>
  )
}

      <Row>
         <Col offset={18} span={6} align="right">
         <Button 
            onClick={ siguienteTicket }
            shape="round"
            type="primary"
         >
            <RightOutlined />
            Siguiente
         </Button>
         </Col>
      </Row>
    </>
  );
};
