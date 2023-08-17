import { useCallback, useState, useEffect } from "react";

import { TableHook } from "./interface";
import { User } from "@/pages/api/user/interface";
import { Customer } from "@/pages/api/customer/interface";
import { Machine } from "@/pages/api/machine/interface";
import { Game } from "@/pages/api/game/interface";
import { Payment } from "@/pages/api/payment/interface";
import {
  getUsers,
  getCustomers,
  getMachines,
  getGames,
  getPayments,
  getProducts,
} from "@/utils/client/api";
import { Product } from "@/pages/api/product/interface";

export const useUsers: TableHook<User> = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetcher = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      if (res.data.status === "success") {
        setData(res.data.data);
      }
    } catch (err) {
      setData([]);
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
    try {
      const res = await getCustomers();
      if (res.data.status === "success") {
        setData(res.data.data);
      }
    } catch (err) {
      setData([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { data, fetcher, loading };
};

export const useMachines: TableHook<Machine> = () => {
  const [data, setData] = useState<Machine[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetcher = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMachines();
      if (res.data.status === "success") {
        setData(res.data.data);
      }
    } catch (err) {
      setData([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { data, fetcher, loading };
};

export const useGames: TableHook<Game> = () => {
  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetcher = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getGames();
      if (res.data.status === "success") {
        setData(res.data.data);
      }
    } catch (err) {
      setData([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { data, fetcher, loading };
};

export const usePayments: TableHook<Payment> = () => {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetcher = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPayments();
      if (res.data.status === "success") {
        setData(res.data.data);
      }
    } catch (err) {
      setData([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { data, fetcher, loading };
};

export const useProducts: TableHook<Product> = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetcher = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      if (res.data.status === "success") {
        setData(res.data.data);
      }
    } catch (err) {
      setData([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { data, fetcher, loading };
};
