/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from 'swr';
import API from './index';

export const useCooperativaList = () => {
  const { data, error, mutate } = useSWR( '/cooperativas', API.fetcher );

  return {
    cooperativas: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};
