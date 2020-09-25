import React from 'react';
import '../styles/vercooperativa.css'

import CooperativasList from "../components/CooperativasList";
import { Table, Tag, Space } from 'antd';
import RoutesList from "../components/RoutesList";
const VerCooperativas = () => (
    <>
        <div className='div1'>
            <h1 className='title'>
                Ver Cooperativa
            </h1>
            <RoutesList/>
        </div>
        <div>

        </div>

    </>
);

export default VerCooperativas;