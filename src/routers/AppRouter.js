import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Routes from '../constants/routes';
import NotFoundPage from '../pages/NotFoundPage';
import Loading from '../components/Loading';

/**
 * El módulo loadable (https://loadable-components.com/docs/code-splitting/)
 * Permite dividir los componentes en diferentes "bundles" (archivos js compilados)
 * de esta manera la aplicación puede ir cargando los compoenentes bajo demanda.
 * Solo cargará los componentes que sean utilizados por el usuario.
 *
 * Esto acelera la carga de la aplicación ya que de lo contrario tendríamos un solo
 * bundle de gran tamaño y el navegador demoraría en descargarlo para renderizar la aplicación.
 *
 * @type {{fallback: JSX.Element}}
 */
const loadableOptions = { fallback: <Loading /> };

const AsyncHome = loadable( () => import( '../pages/Index' ), loadableOptions );
const AsyncLogin = loadable( () => import( '../pages/Login' ), loadableOptions );
const AsyncRegister = loadable( () => import( '../pages/Register' ), loadableOptions );
const AsyncPrivate = loadable( () => import( '../pages/Private' ), loadableOptions );
//const AsyncArticles = loadable( () => import( '../pages/Articles' ), loadableOptions );
const AsyncArticle = loadable( () => import( '../pages/Article' ), loadableOptions );
const AsyncAbout = loadable( () => import( '../pages/About' ), loadableOptions );
const AsyncLogout = loadable( () => import( '../pages/Logout' ), loadableOptions );
const AsyncVerCooperativa = loadable( () => import( '../pages/VerCooperativa' ), loadableOptions );
const AsyncDrivers = loadable( () => import( '../pages/Drivers' ), loadableOptions );
const AsyncRutas = loadable( () => import( '../pages/Rutas' ), loadableOptions );
const AsyncUnidades = loadable( () => import( '../pages/Unidades' ), loadableOptions );
const AsyncBusStop = loadable( () => import( '../pages/Busstop' ), loadableOptions );
const AsyncCategories = loadable( () => import( '../pages/Category' ), loadableOptions );
const AsyncPuntosInteres = loadable( () => import( '../pages/PuntosInteres' ), loadableOptions );
const AsyncHorarios = loadable( () => import( '../pages/Horarios' ), loadableOptions );
/**
 * Este es el componente que se encarga de renderizar el componente adecuado
 * de acuerdo a la ruta en la que se encuentra el navegador.
 * <Switch> https://reactrouter.com/web/api/Switch
 * <PublicRoute> Utilizado para las páginas que son accesibles por todos los usuarios.
 * <PrivateRoute> Utilizado para lás páginas que son protegidas,
 *                este componente valida si existe una sesión activa.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const AppRouter = () => (
  <Switch>
    <PublicRoute exact path={ Routes.HOME } component={ AsyncHome } />
    <PublicRoute path={ Routes.LOGIN } component={ AsyncLogin } />
    <PublicRoute path={ Routes.REGISTER } component={ AsyncRegister } />

    <PublicRoute path={ Routes.ABOUT } component={ AsyncAbout } />
    <PublicRoute path={ Routes.VERCOOPERATIVA } component={ AsyncVerCooperativa } />

      <PrivateRoute path={ Routes.DRIVERS } component={ AsyncDrivers } />
      <PrivateRoute path={ Routes.RUTAS } component={ AsyncRutas } />
      <PrivateRoute path={ Routes.UNIDADES } component={ AsyncUnidades } />
      <PrivateRoute path={ Routes.BUSSTOP } component={ AsyncBusStop } />
      <PrivateRoute path={ Routes.CATEGORIES } component={ AsyncCategories } />
      <PrivateRoute path={ Routes.PUNTOSINTERES } component={ AsyncPuntosInteres } />
      <PrivateRoute path={ Routes.HORARIOS } component={ AsyncHorarios } />

    <PrivateRoute path={ Routes.PRIVATE } component={ AsyncPrivate } />
    <PrivateRoute path={ Routes.ARTICLE_ID } component={ AsyncArticle } />
    <PrivateRoute path={ Routes.LOGOUT } component={ AsyncLogout } />

    <Route component={ NotFoundPage } />
  </Switch>
);

export default AppRouter;
