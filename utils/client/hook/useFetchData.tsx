import { AxiosResponse } from "axios";
import { useState, useEffect, useCallback } from "react";

type FetcherData = (q?: object) => Promise<AxiosResponse<any, any>>;

interface FetchDataHook<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  fetcher: () => Promise<void>;
}

export const useFetchData = <T,>(
  fetcherData: FetcherData
): FetchDataHook<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetcher = useCallback(
    async (q?: object) => {
      setLoading(true);
      try {
        const res = await fetcherData(q);
        if (res.data.status === "success") {
          setData(res.data.data);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [fetcherData]
  );

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { data, loading, error, fetcher };
};
