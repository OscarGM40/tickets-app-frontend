import React, { useContext, useEffect, useState } from 'react';
import { useHideMenu } from '../hooks/useHideMenu';

import Typography from "antd/lib/typography";
import Tag from "antd/lib/tag";
import Row from "antd/lib/row";
import List from "antd/lib/list";
import Divider from "antd/lib/divider";
import Col from "antd/lib/col";
import Card from "antd/lib/card";
import { SocketContext } from '../context/SocketContext';
import { getUltimos } from '../helpers/getUltimos';
// import { Card, Col, Divider, List, Row, Tag, Typography } from 'antd';

const { Title,Text } = Typography;

export const Cola = () => {

   useHideMenu(false);

   const { socket } = useContext(SocketContext);
   const [ tickets, setTickets ] = useState( [] );

   useEffect(() => {
      //recuerda que por defecto la funcion va a usar el parametro inmediatamente anterior
      getUltimos().then( ticket => setTickets(ticket) )
   },[])
   
   useEffect(() => {
      socket.on('ticket-asignado',(asignados) => { 
         setTickets(asignados)
      })
    /*   return(()=> {
         socket.off('ticket-asignado')
      }) */
   },[socket])
   
   return (
      <>
      <Title level={1}>Atendiendo al cliente</Title>
      <Row>
         <Col span={12} align="center">
            <List 
            // con dos argumentos corta y devuelve el trozo indicado
            dataSource={ tickets.slice(0,3) }
            renderItem={ item => (
               <List.Item>
                  <Card 
                  style={{width:300,marginTop:16}}
                  actions={[
                     <Tag color="volcano">{item.agente}</Tag>,
                     <Tag color="magenta">Escritorio: {item.escritorio}</Tag>,
                  ]}
                  >
                     <Title> No. {item.numero}</Title>

                  </Card>
               </List.Item>
            )}
            />
         </Col>
         <Col span={12} align="center">
            <Divider> Historial </Divider>
            <List
            // Con un argumento corta los tres primeros y devuelve el resto
               dataSource={ tickets.slice(3) }
               renderItem={ item => (
                  <List.Item>
                     <List.Item.Meta
                     title={`Ticket No. ${ item.numero }`}
                     description={ 
                        <>
                        <Text type="secondary">En el escritorio: </Text>
                        <Tag color="magenta">{item.numero} </Tag>
                        <Text type="secondary">Agente: </Text>
                        <Tag color="volcano">{item.agente} </Tag>
                        </>
                      }
                     />
                  </List.Item>
               )}
            >


            </List>
         </Col>
      </Row>
      </>
   )
}
