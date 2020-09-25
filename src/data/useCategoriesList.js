import useSWR from 'swr';
import API from './index';

export const useCategoriesList = () => {
    const { data, error, mutate } = useSWR( '/categorie_places', API.fetcher );

    return {
        categories: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};
