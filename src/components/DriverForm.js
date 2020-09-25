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

const DriverForm = ({
                        visible,
                        update,
                        onSubmit,
                        onCancel

                    } ) => {
    const { cooperativas } = useCooperativaList();
    const [startDate, setStartDate] = useState(new Date());
    const [ form ] = Form.useForm();
    const [ imageUrl, setImageUrl ] = useState( null );
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
                data.append( 'name', values.name );
                data.append( 'last_name', values.last_name );
                data.append( 'cellphone', values.cellphone );
                data.append( 'phone', values.phone );
                data.append( 'direction', values.direction );
                data.append( 'date', values.date );
                data.append( 'mail', values.mail );


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
                    await API.put( '/drivers', values ); // post data to server
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

    // const handleChangePhoto = info => {
    //   getBase64( info.file, imageUrl => setImageUrl( imageUrl ) );
    // };

    /*const normPhotoFile = e => {
      console.log( 'Upload event:', e );
      const file = e.file;
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if( !isJpgOrPng ) {
        message.error( 'La imagen debe tener formato JPG o PNG' );
        setFileList( [] );
        setImageUrl( null );
        return null;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if( !isLt2M ) {
        message.error( 'La imagen debe ser menor a 2MB' );
        setFileList( [] );
        setImageUrl( null );
        return null;
      }

      if( file.status === 'removed' ) {
        setFileList( [] );
        setImageUrl( null );
        return null;
      }

      getBase64( e.file, imageUrl => setImageUrl( imageUrl ) );

      if( Array.isArray( e ) ) {
        return e;
      }

      console.log( 'e.file', e.file );
      console.log( 'e.fileList', e.fileList );
      setFileList( [ file ] );

      return e && [ e.file ];
    };*/

    const handleChangeCooperativa = () => {};

    return (
        <Modal key="Mod1"
            visible={ visible }
            title='Crear nuevo conductor'
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
                            message: 'Ingresa el nombre del conductor'
                        }
                    ] }
                >
                    <Input type='textarea'  />
                </Form.Item>
                <Form.Item
                    name='last_name'
                    label='Apellido'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa el apellido del conductor'
                        }
                    ] }>
                    <Input type='textarea' />
                </Form.Item>

                <Form.Item
                    name='cellphone'
                    label='Teléfono'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa el teléfono del conductor'
                        }
                    ] }>
                    <Input type='textarea' />
                </Form.Item>

                <Form.Item
                    name='phone'
                    label='Celular'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa el celular del conductor'
                        }
                    ] }>
                    <Input type='textarea' />
                </Form.Item>

                <Form.Item
                    name='direction'
                    label='Dirección'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa la dirección del conductor'
                        }
                    ] }>
                    <Input type='textarea' />
                </Form.Item>

                <Form.Item
                    name='mail'
                    label='E-mail'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa el E-mail del conductor'
                        }
                    ] }>
                    <Input type='textarea' />
                </Form.Item>

                <Form.Item
                    name='date'
                    label='Fecha de nacimiento'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa la fecha de nacimiento del conductor'
                        }
                    ] }
                >
                    <Space direction="vertical">
                        <Input type='date'  />
                    </Space>

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
                    <Select style={ { width: 120 } } onChange={ handleChangeCooperativa } loading={ !cooperativas }>
                        {
                            cooperativas && cooperativas.map( ( cooperativa, index ) =>
                                <Option value={ cooperativa.id } key={ index }>{ cooperativa.name }</Option>
                            )
                        }
                    </Select>
                </Form.Item>


            </Form>
        </Modal>
    );
};

export default DriverForm;
