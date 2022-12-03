import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { UserType } from "../models/User";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return { user: data?.user || null };
};

interface UseUserProps {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

const useUser = ({ redirectTo, redirectIfFound = false }: UseUserProps) => {
  const { data, error } = useSWR("/api/user", fetcher);
  const user: UserType = data?.user;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  useEffect(() => {
    if (error) Router.push("/");
  }, [error]);

  return error
    ? { user: null, loading: !finished }
    : { user, loading: !finished };
};

export default useUser;
