import React, { useState } from 'react';

import Routes from '../constants/routes';
import { useAuth } from '../providers/Auth';
import { Menu, Layout,Button } from 'antd';
import { LogoutOutlined, LoginOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import UnidadesForm from "./UnidadesForm";
import DriverForm from "./DriverForm";
import { Link, useLocation } from 'react-router-dom';
import UnidadesList from "./UnidadesList";


const linkStyle = {};
const {SubMenu} = Menu;
const Sider = Layout.Sider;

const Navigation1 = ( props ) => {
  const [ visible1, setVisible1 ] = useState( false );
  const [ visible2, setVisible2 ] = useState( false );

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
                <Link to={ Routes.VERCOOPERATIVA } className='logout-link'>

                </Link>
              </Menu.Item>

            </SubMenu>

            <SubMenu style={{ color: "#000000" }} key="sub2" icon={<UserOutlined />} title="Conductor">
              <Menu.Item  key={Routes.DRIVERS} style={{ background: "#E6F7FF", color: "#1890FF" }}>
                <Button
                    type="link"
                    onClick={ () => {
                      setVisible1( true );
                    } }
                    block
                >
                  Registrar
                </Button>
                <DriverForm

                    visible={ visible1 }
                    update={ false }

                    onCancel={ () => {
                      setVisible1( false );
                    } }
                />

              </Menu.Item>

              <Menu.Item style={{ background: "#E6F7FF", color: "#1890FF" }}>Ver

                  <Link to={ Routes.DRIVERS } className='logout-link'>
                  </Link>


                </Menu.Item>
            </SubMenu>

            <SubMenu style={{ color: "#000000" }} key="sub3" icon={<UserOutlined />} title="Unidades">
              <Menu.Item  key={Routes.UNIDADES} style={{ background: "#E6F7FF", color: "#1890FF" }}>
                <Button
                    type="link"
                    onClick={ () => {
                      setVisible2( true );
                    } }
                    block
                >
                  Registrar
                </Button>
                <UnidadesForm

                    visible={ visible2 }
                    update={ false }

                    onCancel={ () => {
                      setVisible2( false );
                    } }
                />
              </Menu.Item>

              <Menu.Item style={{ background: "#E6F7FF", color: "#1890FF" }}>Ver

                <Link to={ Routes.DRIVERS } className='logout-link'>
                </Link>


              </Menu.Item>
            </SubMenu>

          </Menu>
        </Sider>
      </Layout>
    </>
  );
};

export default Navigation1;
