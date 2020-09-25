import useSWR from 'swr';
import API from './index';

export const useHorariosList = () => {
    const { data, error, mutate } = useSWR( '/horarios', API.fetcher );

    return {
        horarios: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};
