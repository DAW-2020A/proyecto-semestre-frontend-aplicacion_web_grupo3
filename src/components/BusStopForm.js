import React, { useState } from 'react';
import { Modal, Form, Input, message, Upload, Select, DatePicker, Space, Button } from 'antd';
import { translateMessage } from '../utils/translateMessage';
import API from '../data/index';
import ErrorList from './ErrorList';
import { PlusOutlined } from '@ant-design/icons';
import { mutate } from 'swr';
import {useCooperativaList} from "../data/useCooperativaList";

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

const BusStopForm = ({
                        visible,
                        update,
                        onSubmit,
                        onCancel

                    } ) => {


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
                data.append( 'name', values.name );
                data.append( 'direction', values.direction );
                data.append( 'longitude', values.longitude );
                data.append( 'latitude', values.latitude );

                try{
                    await API.post( '/bus_stops', data ); // post data to server
                    form.resetFields();
                    setFileList( [] );
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
                    await API.put( '/bus_stops', values ); // post data to server
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


    const handleChangeBusstop = () => {};

    return (
        <Modal key="Mod3"
            visible={ visible }
            title='Crear nueva parada'
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
                    name='name'
                    label='Nombre'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa el nombre de la parada'
                        }
                    ] }
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='direction'
                    label='Dirección'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa la dirección de la parada'
                        }
                    ] }>
                    <Input type='textarea' />
                </Form.Item>

                <Form.Item
                    name='longitude'
                    label='Longitud'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa la longitud de la parada'
                        }
                    ] }>
                    <Input type='textarea' />
                </Form.Item>

                <Form.Item
                    name='latitude'
                    label='Latitud'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa la latitud de la parada'
                        }
                    ] }>
                    <Input type='textarea' />
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default BusStopForm;
