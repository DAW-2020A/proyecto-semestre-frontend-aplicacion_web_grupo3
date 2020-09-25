import useSWR from 'swr';
import API from './index';

export const useRoutesList = () => {
    const { data, error, mutate } = useSWR( '/interest_points', API.fetcher );

    return {
        interestpoints: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};
