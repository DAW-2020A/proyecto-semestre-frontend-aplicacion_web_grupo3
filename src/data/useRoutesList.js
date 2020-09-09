/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from 'swr';
import API from './index';

export const useRoutesList = () => {
  const { data, error, mutate } = useSWR( '/rutas', API.fetcher );

  return {
    routes: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};
