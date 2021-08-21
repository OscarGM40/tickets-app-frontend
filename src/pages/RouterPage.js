import React, { useContext } from "react";

import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import Typography from "antd/lib/typography";
import  Space from "antd/lib/space";

import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { Ingresar } from "./Ingresar";
import { Cola } from "./Cola";
import { CrearTicket } from "./CrearTicket";
import { Escritorio } from "./Escritorio";
import { UIContext } from "../context/UIContext";

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

export const RouterPage = () => {

  const { ocultarMenu } = useContext(UIContext);
  
  return (
    <Router>
      <Layout style={{ height: "auto" }}>
        <Sider hidden={ ocultarMenu }
        collapsedWidth="0" breakpoint="md"
        style = {{minHeight:'100vh'}}
        >
          <div className="logo" style={{textAlign:'center',paddingTop:5}}>
          <Text type="warning">Seleccionar</Text>
             </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/ingresar">Ingresar</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/cola">Cola</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to="/crear">Crear ticket</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ paddingLeft: 15,textAlign: 'center' }}
          >
            <Space direction="vertical">
              <Title level={5}>
                <Text type="strong">Aplicacion de tickets(Ant Design)</Text>
              </Title>
            </Space>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
               <Route path="/ingresar" component={ Ingresar } />
               <Route path="/cola" component={ Cola } />
               <Route path="/crear" component={ CrearTicket } />

               <Route path="/escritorio" component={ Escritorio } />
               {/* Si no hace match que redireccione a /ingresar */}
               <Redirect to="/ingresar" />

            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
