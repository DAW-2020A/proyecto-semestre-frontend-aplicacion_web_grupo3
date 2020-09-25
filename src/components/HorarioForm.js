import React, { useState } from 'react';
import { Modal, Form, Input, message, Upload, Select, DatePicker, Space, Button } from 'antd';
import { translateMessage } from '../utils/translateMessage';
import API from '../data/index';
import ErrorList from './ErrorList';
import { PlusOutlined } from '@ant-design/icons';
import { mutate } from 'swr';
import {useCooperativaList} from "../data/useCooperativaList";
import {useHorariosList} from "../data/useHorariosList";
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

const HorarioForm = ({
                        visible,
                        update,
                        onSubmit,
                        onCancel

                    } ) => {
    const { busstops } = useBusstopList();
    const { cooperativas } = useCooperativaList();
    const { horarios } = useHorariosList();
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
                data.append( 'busstop_id', values.busstop_id );
                data.append( 'ruta_id', values.ruta_id );
                data.append( 'type', values.type );
                data.append( 'start', values.start );
                data.append( 'end', values.end );



                try {
                    await API.post( '/horarios', data ); // post data to server
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
                    await API.put( '/horarios', values ); // post data to server
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


    const handleChangeHorario = () => {};
    const handleChangeBusstop = () => {};

    return (

        <Modal key="Mod7"
               visible={ visible }
               title='Crear nuevo horario'
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
                    name='type'
                           label='Tipo'
                           rules={ [
                               {
                                   required: true,
                                   message: 'Ingresa el tipo de horario'
                               }
                           ] }
                >
                    <Select style={ { width: 120 } } onChange={ handleChangeHorario } loading={ !horarios }>
                        {
                            horarios && horarios.map( ( horario, index ) =>
                                <Option value={ horario.name } key={ index }>{ horario.name }</Option>

                            )
                        }
                    </Select>
                </Form.Item>



                <Form.Item
                    name='start'
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
                    name='end'
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

                <Form.Item name='busstop_id'
                           label='Parada'
                           rules={ [
                               {
                                   required: true,
                                   message: 'Selecciona una Parada'
                               }
                           ] }
                >
                    <Select style={ { width: 120 } } onChange={ handleChangeBusstop } loading={ !busstops }>
                        {
                            busstops && busstops.map( ( busstop, index ) =>
                                <Option value={ busstop.id } key={ index }>{ busstop.name }</Option>
                            )
                        }
                    </Select>
                </Form.Item>


            </Form>
        </Modal>
    );
};

export default HorarioForm;
