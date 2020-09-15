
import React, { useState } from 'react';

import Routes from '../constants/routes';
import { useAuth } from '../providers/Auth';
import { Menu, Layout } from 'antd';
import { LogoutOutlined, LoginOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';


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
            <SubMenu style={{ color: "#000000" }} key="sub1" icon={<UserOutlined />} title="Cooperativa">

              <Menu.Item style={{ background: "#E6F7FF", color: "#1890FF" }} key={Routes.HOME}>Registrar
                <Link to={ Routes.HOME } className='logout-link'>

                </Link>
              </Menu.Item>

              <Menu.Item style={{ background: "#E6F7FF", color: "#1890FF" }}>Ver
                <Link to={ Routes.ABOUT } className='logout-link'>

                </Link>
              </Menu.Item>

            </SubMenu>

            <SubMenu style={{ color: "#000000" }} key="sub2" icon={<UserOutlined />} title="Conductor">
              <Menu.Item style={{ background: "#E6F7FF", color: "#1890FF" }}>Registrar
                <Link to={ Routes.HOME } className='logout-link'>

                </Link>
              </Menu.Item>

              <Menu.Item style={{ background: "#E6F7FF", color: "#1890FF" }}>Ver
                <Link to={ Routes.ABOUT } className='logout-link'></Link>
              </Menu.Item>
            </SubMenu>

          </Menu>
        </Sider>
      </Layout>
    </>
  );
};

export default Navigation1;
