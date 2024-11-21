import { useQuery } from '@tanstack/react-query';

export function useFetchData(queryKey, queryFn, params = {}) {
  return useQuery({
    queryKey: [queryKey, params],  
    queryFn: () => queryFn(params),  
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    cacheTime: 3600000,
    staleTime: 3600000,
    refetchInterval: 3600000,
  });
}


