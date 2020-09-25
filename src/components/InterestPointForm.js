import React, { useState } from 'react';
import { Modal, Form, Input, message, Upload, Select, DatePicker, Space, Button } from 'antd';
import { translateMessage } from '../utils/translateMessage';
import API from '../data/index';
import ErrorList from './ErrorList';
import { PlusOutlined } from '@ant-design/icons';
import { mutate } from 'swr';
import {useCooperativaList} from "../data/useCooperativaList";
import {useBusstopList} from "../data/useBusstopList";


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

const InterestPointForm = ({
                        visible,
                        update,
                        onSubmit,
                        onCancel

                    } ) => {
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
                data.append( 'categorie_places_id', values.categorie_id );
                data.append( 'bus_stop_id', values.bus_stop_id );
                data.append( 'name', values.name );
                data.append( 'direction', values.direction );
                data.append( 'phone', values.phone );
                data.append( 'longitude', values.longitude );
                data.append( 'latitude', values.latitude );
                data.append( 'hour_start', values.hour_start );
                data.append( 'hour_end', values.hour_end);

                try {
                    await API.post( '/interest_points', data ); // post data to server
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
                    await API.put( '/interest_points', values ); // post data to server
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


    const handleChangeRutas = () => {};

    return (
        <Modal key="Mod5"
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
                            message: 'Ingresa el nombre del punto de interes'
                        }
                    ] }
                >
                    <Input type='textarea'  />
                </Form.Item>


                <Form.Item
                    name='direction'
                    label='Dirección'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa la dirección del  punto de interes'
                        }
                    ] }>
                    <Input type='textarea' />
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
                    name='phone'
                    label='Celular'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa el celular del  punto de interes'
                        }
                    ] }>
                    <Input type='textarea' />
                </Form.Item>



                <Form.Item
                    name='hour_start'
                    label='Hora inicio'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa la hora inicio'
                        }
                    ] }
                >

                    <Space direction="vertical">
                        <Input id="appt-time" type="time" name="appt-time" step="2" />
                    </Space>

                </Form.Item>

                <Form.Item
                    name='hour_end'
                    label='Hora fin'
                    rules={ [
                        {
                            required: true,
                            message: 'Ingresa la hora fin'
                        }
                    ] }
                >

                    <Space direction="vertical">
                        <Input id="appt-time" type="time" name="appt-time" step="2"  />

                    </Space>

                </Form.Item>

                <Form.Item name='bus_stop_id'
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

export default InterestPointForm;
