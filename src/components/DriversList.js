import React, {useContext, useState, useEffect, useRef } from 'react';
import {Skeleton, Card, Col, Row, Radio, Typography, Table, Input, Button, Popconfirm, Form, Select} from 'antd';
import Routes from '../constants/routes';
import { Link } from 'react-router-dom';
import { useDriversList } from '../data/useDriversList';
import ShowError from './ShowError';
import {useCooperativaList} from "../data/useCooperativaList";

const { Text } = Typography;


const DriversList = ( props ) => {

    const { drivers, isLoading, isError, mutate } = useDriversList();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',

        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];

    const data = [

        {
            key: '2',
            name: 'drivers.name',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ];

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
          <Table columns={columns}  size="middle" >

              {
                  drivers.map( ( driver, i ) => (
                      <col>{driver.name}</col>
                  ) )
              }
          </Table>
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
