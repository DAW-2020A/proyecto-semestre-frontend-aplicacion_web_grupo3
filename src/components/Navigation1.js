
import React, { useState } from 'react';

import Routes from '../constants/routes';
import { useAuth } from '../providers/Auth';
import { Menu, Layout } from 'antd';
import { LogoutOutlined, LoginOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navigation.css';

const linkStyle = {};
const {SubMenu} = Menu;
const Sider = Layout.Sider;

const Navigation1 = ( props ) => {
  let location = useLocation();

  const [ menuState, setMenuState ] = useState( {
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: []
  } );
  const { isAuthenticated, isCheckingAuth, currentUser } = useAuth();

  React.useEffect( () => {
    setMenuState( {
      ...menuState,
      current: location.pathname
    } );
  }, [ location, isAuthenticated ] );

  const handleClick = ( e ) => {
    console.log( 'click ', e );
    setMenuState( {
      ...menuState,
      current: e.key
    } );
  };

  return (
    <>
      <Layout style={{ minHeight: '70vh' }}>

        <Sider style={{ background: "#ffffff" }}>
          <div className="logo" />
          <Menu style={{ background: "#ffffff" }} theme="light" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu style={{ color: "#1890FF" }} key="sub1" icon={<UserOutlined />} title="Administrador">
              <Menu.Item style={{ background: "#E6F7FF", color: "#1890FF" }} key="3">Iniciar Sesión</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      </Layout>
    </>
  );
};

export default Navigation1;
