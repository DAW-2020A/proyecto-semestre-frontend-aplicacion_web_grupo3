import React from 'react';
import '../styles/vercooperativa.css'

import CooperativasList from "../components/CooperativasList";
import { Table, Tag, Space } from 'antd';
import RoutesList from "../components/RoutesList";
const VerCooperativas = () => (
    <>
        <div className='div1' style={{ textAlign: "center"  }}>
            <h1 className='title'>
                 Cooperativa
            </h1>
            <CooperativasList/>
        </div>
        <div>

        </div>

    </>
);

export default VerCooperativas;
