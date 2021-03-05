import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useHideMenu } from "../hooks/useHideMenu";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";


import Typography from "antd/lib/typography";
import Divider from "antd/lib/divider";
import InputNumber from "antd/lib/input-number";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
// import { Form, Input, Button, InputNumber, Typography, Divider } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

// Consideraciones del layout(constantes)
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }, //16+8=24 ant trabaja con 24 columnas
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 }, // de nuevo suman 24
};

//Componente funcional
export const Ingresar = () => {

  const history = useHistory();
  useHideMenu(false);
//vamos a manejar la persistencia del agente mediante un estado
  const [usuario] = useState(getUsuarioStorage());



  //saltará si todo va bien,ojo con los objetos implícitos
  const onFinish = (values) => {

    const { agente,escritorio } = values;
    localStorage.setItem('agente',agente)
    localStorage.setItem('escritorio',escritorio);
    
    history.push('/escritorio')
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (usuario.agente && usuario.escritorio) {
    return <Redirect to="/escritorio" />
  }

  return (
    <>
    <Title level={2} style={{textAlign: 'center'}}>Ingresar</Title>
    <Text>Ingrese su nombre y numero de escritorio</Text>
    <Divider />
      <Form
        {...layout} //es un SPREAD no un REST pues esparce
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Nombre del agente"
          name="agente"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su nombre",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="escritorio"
          rules={[
            {
              required: true,
              message: "Ingrese el número de escritorio",
            },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" shape="round">
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
