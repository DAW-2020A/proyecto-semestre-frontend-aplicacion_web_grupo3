import React from 'react';
import Routes from '../constants/routes';
import Navigation1 from './Navigation1';
import { Layout, Row, Col, Button, Popover } from 'antd';
import { FacebookOutlined, InstagramOutlined, GithubOutlined, MailOutlined, WhatsAppOutlined } from '@ant-design/icons';
import logo from '../images/logo-menta.png';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Header = Layout.Header;
const Content = Layout.Content;
const Footer = Layout.Footer;

/**
 * Este componente renderiza los elementos comunes para toda la aplicación
 *
 * Header (menu), Content y Footer
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MainLayout = props => {
    console.log( 'props', props );
    return (
        <div className='app'>
            <Layout>

                <Header className='header1'>
                    <h1 >Bienvenido</h1>
                </Header>
                <Content className='content'>

                    <div ><Navigation1></Navigation1>    </div>


                    <div>{ props.children }</div>

                </Content>

                <Footer className='footer'>
                    <Row>
                        <Col xs={ { span: 24 } } md={ 8 } className='logo-blanco'>
                            LOGO
                        </Col>

                        <Col xs={ {
                            span: 24,
                            offset: 0
                        } }
                             md={ {
                                 span: 4,
                                 offset: 3
                             } }
                             className='logo-menta'>
                            Elaborado por: <br />
                            <a href='https://grupomenta.com' rel='noopener noreferrer' target='_blank'>
                                <img src={ logo } alt='Profe a Tiempo' height={ 50 } />
                            </a>
                            <div>-> Miguel Torres</div>
                            <div>-> Freddy Calahorrano</div>
                        </Col>

                        <Col xs={ {
                            span: 24,
                            offset: 0
                        } }
                             md={ {
                                 span: 5,
                                 offset: 4
                             } }
                             className='contact-links'>
                            <p><strong>Contáctanos</strong></p>
                            <p><MailOutlined /> <a href='mailto:jordy.torres@epn.edu.ec'>jordy.torres@epn.edu.ec</a></p>
                            <p><MailOutlined /> <a href='mailto:freddy.calahorrano01@epn.edu.ec'>freddy.calahorrano01@epn.edu.ec</a></p>
                            <p><WhatsAppOutlined /> <a href='https://wa.me/593984794808' target='_blank' rel='noopener noreferrer'>+593
                                9-8479-4808</a></p>
                            <p><GithubOutlined /> <a href='https://github.com/DAW-2020A/proyecto-semestre-frontend-aplicacion_web_grupo3'
                                                     target='_blank'
                                                     rel='noopener noreferrer'>@Migueltorresp</a>
                                <div><a href='https://github.com/DAW-2020A/proyecto-semestre-frontend-aplicacion_web_grupo3'
                                   target='_blank'
                                   rel='noopener noreferrer'>@Freddy_Calahorrano</a></div>
                            </p>
                        </Col>
                    </Row>

                    <Row type='flex' justify='space-between' align='bottom'>
                        <Col xs={ 24 } md={ 8 }>
                            { moment().format( 'YYYY' ) } - Para uso libre.
                        </Col>

                        <Col xs={ 24 } md={ 4 } className='footer-links'>
                            <Link to={ Routes.ABOUT } style={ { marginRight: 20 } }>Preguntas frecuentes</Link>
                        </Col>
                        <Col xs={ 24 } md={ 4 } className='footer-links'>
                            <Link to={ Routes.ABOUT }>Términos y condiciones</Link>
                        </Col>

                        <Col xs={ 24 } md={ 8 } className='logos-social'>
                            <strong>Síguenos en:</strong>
                            <a href='https://www.facebook.com'
                               target='_blank'
                               rel='noopener noreferrer'
                               style={ {
                                   marginLeft: 30,
                                   marginRight: 30
                               } }>
                                <FacebookOutlined />
                            </a>

                            <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
                                <InstagramOutlined />
                            </a>
                        </Col>
                    </Row>
                </Footer>
            </Layout>
        </div>
    );
};

export default MainLayout;
