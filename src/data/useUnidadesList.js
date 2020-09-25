import useSWR from 'swr';
import API from './index';

export const useUnidadesList = () => {
    const { data, error, mutate } = useSWR( '/unidads', API.fetcher );

    return {
        unidades: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};
