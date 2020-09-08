import React, { useEffect, useState } from 'react';
import { Skeleton, Card, Col, Row, Radio, Typography, Button } from 'antd';
import Routes from '../constants/routes';
import { Link } from 'react-router-dom';
import { useDriversList } from '../data/useDriversList';
import ShowError from './ShowError';

const { Text } = Typography;

const DriversList = ( props ) => {

    const { drivers, isLoading, isError, mutate } = useDriversList();


    if( isLoading ) {
      return <Row justify='center' gutter={ 30 }>
        {
          [ ...new Array( 9 ) ].map( ( _, i ) =>
            <Col xs={ 24 } sm={ 12 } md={ 8 } style={ { marginBottom: 30 } } key={ i }>
              <div style={ { textAlign: 'center' } }>
                <Skeleton.Image style={ { width: 200 } } />
                <Card title='' extra='' cover='' loading />
              </div>
            </Col>
          )
        }
      </Row>;
    }

    if( isError ) {
      return <ShowError error={ isError } />;
    }

    return (
      <>

        <ul>
          {
            drivers.map( ( driver, i ) => (
              <li>{driver.name}</li>
            ) )
          }
        </ul>
      </>
    );
  }
;

export default DriversList;
