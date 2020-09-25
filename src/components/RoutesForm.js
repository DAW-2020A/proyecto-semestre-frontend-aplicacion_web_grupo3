import React, { useState } from 'react';
import { Modal, Form, Input, message, Upload, Select, DatePicker, Space, Button } from 'antd';
import { translateMessage } from '../utils/translateMessage';
import API from '../data/index';
import ErrorList from './ErrorList';
import { PlusOutlined } from '@ant-design/icons';
import { mutate } from 'swr';
import {useCooperativaList} from "../data/useCooperativaList";
import {useBusstopList} from "../data/useBusstopList";
import {useRoutesList} from "../data/useRoutesList";

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
    const { busstops } = useBusstopList();

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

                data.append( 'name', values.name );
                data.append( 'units_number', values.units_number );



                try {
                    await API.post( '/rutas', data ); // post data to server
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
                    await API.put( '/rutas', values ); // post data to server
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


    const handleChangeCooperativa = () => {}
    const handleChangeRutas = () => {};


    return (
        <Modal key="Mod4"
               visible={ visible }
               title='Crear nueva rutas'
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
                            message: 'Ingresa el nombre de la ruta'
                        }
                    ] }
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='units_number'
                    label='Número de unidades'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa el numero de unidades'
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
                    <Select style={ { width: 120 } } onChange={ handleChangeCooperativa } loading={ !cooperativas }>
                        {
                            cooperativas && cooperativas.map( ( cooperativa, index ) =>
                                <Option value={ 1 } key={ index }>{ cooperativa.name }</Option>
                            )
                        }
                    </Select>


                </Form.Item>

                <Form.Item name='Bustops'
                           label='Paradas'
                           rules={ [
                               {
                                   required: true,
                                   message: 'Selecciona almenos una parada'
                               }
                           ] }
                >

                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Porfavor seleccione"
                        onChange={handleChangeRutas}
                    >
                        {
                            busstops && busstops.map( ( busStop, index ) =>
                                <Option value={ busStop.id } key={ index }>{ busStop.name }</Option>
                            )
                        }
                    </Select>


                </Form.Item>


            </Form>
        </Modal>
    );
};

export default DriverForm;
