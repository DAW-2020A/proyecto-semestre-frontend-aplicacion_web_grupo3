import React, { useState } from 'react';
import API from '../data';
import { translateMessage } from '../utils/translateMessage';
import ArticleList from '../components/DriversList';
import DriverForm from '../components/DriverForm';
import { Button, message, Skeleton, Row, Col } from 'antd';
import { useAuth } from '../providers/Auth';
import { useCooperativaList } from '../data/useCooperativaList';
import ShowError from '../components/ShowError';
import { mutate } from 'swr';
import BusstopList from "../components/BusstopList";

/**
 * Fetch Drivers from DB
 */
export const fetchArticles = async() => {
    // console.log( `Show data fetched. Articles: ${ JSON.stringify( articles ) }` );

    return await API.get( '/drivers' );
};

/**
 * Articles list page
 * @param props
 * @constructor
 */
const Unidades = (props ) => {

    const [ visible, setVisible ] = useState( false );
    const categories = useCooperativaList();

    const auth = useAuth();



    /**
     * Executed after the form is submitted
     * Fetches all the articles and refreshes the list
     * Closes the modal
     */
    /*const afterCreate = async() => {
        try {
            // show skeleton
            await mutate( '/articles', async articles => {
                return { data: [ {}, ...articles.data ] };
            }, false );

            await mutate( '/articles' );
            setVisible( false ); // close the modal
        } catch( error ) {
            console.error(
                'You have an error in your code or there are Network issues.',
                error
            );

            message.error( translateMessage( error.message ) );
        }
    };*/

    return (
        <div>

            <BusstopList></BusstopList>

        </div>
    );
};


export default Unidades;
