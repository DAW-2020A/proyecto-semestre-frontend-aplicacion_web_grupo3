import useSWR from 'swr';
import API from './index';

export const useDriversList = () => {
    const { data, error, mutate } = useSWR( '/bus_stops', API.fetcher );

    return {
        busstops: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};
