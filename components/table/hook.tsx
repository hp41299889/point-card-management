import { useCallback, useState, useEffect } from "react";

import { TableHook } from "./interface";
import { User } from "@/pages/api/user/interface";
import { getUsers } from "@/utils/client/api";

export const useUsers: TableHook<User> = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetcher = useCallback(async () => {
    setLoading(true);
    const res = await getUsers();
    if (res.data.status === "success") {
      setData(res.data.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { data, fetcher, loading };
};
