import React, {useContext, useState, useEffect, useRef } from 'react';
import {Skeleton, Card, Col, Row, Radio, Typography, Table, Input, Button, Popconfirm, Form, Select} from 'antd';
import Routes from '../constants/routes';
import { Link } from 'react-router-dom';
import { useDriversList } from '../data/useDriversList';
import ShowError from './ShowError';
import {useCategoriesList} from "../data/useCategoriesList";
import ReactDOM from 'react';
const { Text } = Typography;
const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};



const CategoriesList = ( props ) => {

    const {categories, isLoading, isError, mutate} = useCategoriesList();
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',

        }
    ];

    if (isLoading) {
        return <Row justify='center' gutter={30}>
            {
                [...new Array(9)].map((_, i) =>
                    <Col xs={24} sm={12} md={8} style={{marginBottom: 30}} key={i}>
                        <div style={{textAlign: 'center'}}>
                            <Skeleton.Image style={{width: 200}}/>
                            <Card title='' extra='' cover='' loading/>
                        </div>
                    </Col>
                )
            }
        </Row>;
    }

    if (isError) {
        return <ShowError error={isError}/>;
    }
    return (
        <>
            <Table columns={columns} dataSource={categories}>

            </Table>

        </>
    );

};
export default CategoriesList;
