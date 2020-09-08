/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from 'swr';
import API from './index';

export const useDriversList = () => {
  const { data, error, mutate } = useSWR( '/drivers', API.fetcher );

  return {
    drivers: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};
