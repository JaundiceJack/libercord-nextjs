import { useEffect } from "react";
import Router, { useRouter } from "next/router";
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
  const { data, error, isValidating } = useSWR("/api/user", fetcher);
  const user: UserType = data?.user;
  const hasUser = Boolean(user);
  const router = useRouter();

  useEffect(() => {
    if (!redirectTo || isValidating) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      if (router.pathname !== redirectTo) router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, hasUser]);

  useEffect(() => {
    if (error && router.pathname !== "/") router.push("/");
  }, [error]);

  return error
    ? { user: null, loading: false, error }
    : { user, loading: isValidating, error: null };
};

export default useUser;
