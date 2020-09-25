import React, { useState } from 'react';
import { Modal, Form, Input, message, Upload, Select, DatePicker, Space, Button } from 'antd';
import { translateMessage } from '../utils/translateMessage';
import API from '../data/index';
import ErrorList from './ErrorList';
import { PlusOutlined } from '@ant-design/icons';
import { mutate } from 'swr';
import {useUnidadesList} from "../data/useUnidadesList";
import {useCooperativaList} from "../data/useCooperativaList";
import {useDriversList} from "../data/useDriversList";

const { Option } = Select;

function getBase64( file, callback ) {
    console.log( 'file', file );
    const reader = new FileReader();
    reader.addEventListener( 'load', () => callback( reader.result ) );
    reader.readAsDataURL( file );
}

function onChange(date, dateString) {
    console.log(date, dateString);
}

const UnidadesForm = ({
                        visible,
                        update,
                        onSubmit,
                        onCancel

                    } ) => {
    const { cooperativas } = useCooperativaList();
    const { drivers } = useDriversList();

    const [ form ] = Form.useForm();
    const [ fileList, setFileList ] = useState( [] );
    const [ isSaving, setIsSaving ] = useState( false );
    /**
     * onCreate article
     * Called when the user clicks on button to create article
     * @param values
     */
    const onCreate = async values => {

        console.log( 'Received values of form: ', values );

        form.validateFields()
            .then( async( values ) => {
                console.log( 'values', values );
                setIsSaving( true );

                // use form data to be able to send a file to the server
                const data = new FormData();
                data.append( 'cooperativa_id', values.cooperativa_id );
                data.append( 'driver_id', values.driver_id );
                data.append( 'placa', values.placa );
                data.append( 'unit_number', values.unit_numberlast_name );

                try {
                    await API.post( '/drivers', data ); // post data to server
                    form.resetFields();
                    //cooperativas_id:cooperativasId
                    setFileList( [] );
                    //setImageUrl( null );
                    setIsSaving( false );
                    onSubmit();
                } catch( e ) {
                    setIsSaving( false );

                    const errorList = e.error && <ErrorList errors={ e.error } />;
                    message.error( <>{ translateMessage( e.message ) }{ errorList }</> );
                }
            } )
            .catch( info => {
                console.log( 'Validate Failed:', info );
            } );

    };

    const onUpdate = async values => {
        console.log( 'Received values of form: ', values );

        form.validateFields()
            .then( async( values ) => {
                try {
                    await API.put( '/unidads', values ); // post data to server
                    form.resetFields();
                    onSubmit();
                } catch( error ) {
                    console.error(
                        'You have an error in your code or there are Network issues.',
                        error
                    );

                    message.error( translateMessage( error.message ) );
                }
            } )
            .catch( info => {
                console.log( 'Validate Failed:', info );
            } );

    };

    const handleChangeCooperativa = () => {};

    return (
        <Modal key="Mod2"
            visible={ visible }
            title='Crear nueva unidad'
            okText='Crear'
            confirmLoading={ isSaving }
            cancelText='Cancelar'
            onCancel={ onCancel }
            onOk={ !update
                ? onCreate
                : onUpdate }
        >

            <Form

                form={ form }
                layout='vertical'
                name='form_in_modal'
            >
                <Form.Item
                    name='placac'
                    label='Placa'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa el nombre del conductor'
                        }
                    ] }
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='unit_numbre'
                    label='Numero de unidades'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa el apellido del conductor'
                        }
                    ] }>
                    <Input type='textarea' />
                </Form.Item>


                <Form.Item name='cooperativa_id'
                           label='Cooperativa'
                           rules={ [
                               {
                                   required: true,
                                   message: 'Selecciona una Cooperativa'
                               }
                           ] }
                >
                    <Select style={ { width: 180 } } onChange={ handleChangeCooperativa } loading={ !drivers }>
                        {
                            cooperativas && cooperativas.map( ( cooperativa, index ) =>
                                <Option value={ 1 } key={ index }>{ cooperativa.name }</Option>
                            )
                        }
                    </Select>
                </Form.Item>

                <Form.Item name='driver_id'
                           label='Conductor'
                           rules={ [
                               {
                                   required: true,
                                   message: 'Selecciona un Conductor'
                               }
                           ] }
                >
                    <Select style={ { width: 180 } } onChange={ handleChangeCooperativa } loading={ !drivers }>
                        {
                            drivers && drivers .map( ( driver, index ) =>
                                <Option value={ driver.id } key={ index }>{ driver.name} {driver.last_name }</Option>
                            )
                        }
                    </Select>
                </Form.Item>


            </Form>
        </Modal>
    );
};

export default UnidadesForm;
