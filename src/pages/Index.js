import React from 'react';
import ArticleList from '../components/DriversList';
import ShowError from '../components/ShowError';
import RoutesList from "../components/RoutesList";

const HomePage = () => {


  return (
    <div style={{ margin: '70px 50px',padding: 24, minHeight: 360, textAlign:"center", background:"#96B2DC"}}>
        <p style={{ margin: '120px 50px' }}>Este es un prototipo de una aplicacion Web que tiene como fin ayudar a las cooperativas de buses a poder compartir sus rutas,
          paradas, puntos de interes y horarios a sus usuarios.</p>
    <RoutesList />
    </div>
  );
};


export default HomePage;

/*
{
        articles.isLoading
          ? 'Cargando...'
          : articles.isError
          ? <ShowError error={ articles.isError } />
          : <ArticleList articles={ articles.articles } />
      }
 */
