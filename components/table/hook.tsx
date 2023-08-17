import { useCallback, useState, useEffect } from "react";

import { TableHook } from "./interface";
import { User } from "@/pages/api/user/interface";
import { getUsers } from "@/utils/client/api";
import { Customer } from "@/pages/api/customer/interface";
import { getCustomers } from "@/utils/client/api/customer";

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

export const useCustomers: TableHook<Customer> = () => {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetcher = useCallback(async () => {
    setLoading(true);
    const res = await getCustomers();
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
