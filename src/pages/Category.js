import React from 'react';
import '../styles/vercooperativa.css'

import CooperativasList from "../components/CooperativasList";
import { Table, Tag, Space } from 'antd';
import CategoriesList from "../components/CategoriesList";
const Category = () => (
    <>
        <div className='div1' style={{ textAlign: "center"  }}>
            <h1 className='title'>
                Categorias
            </h1>
            <CategoriesList/>
        </div>
        <div>

        </div>

    </>
);

export default Category;
