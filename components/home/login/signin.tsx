import Link from "next/link";
import Router from "next/router";
import React, { useState, FC } from "react";
import BasicButton from "../../elements/input/button/basicButton";
import TextEntry from "../../elements/input/form/textEntry";
import { errString } from "../../../helpers/errors";
import ErrorMessages from "../../elements/misc/errorMessages";
import Spinner from "../../elements/misc/spinner";
import useErrMsgs from "../../../hooks/useErrMsgs";

interface SignInProps {
  toggle: () => void;
  email: string;
  setEmail: (e: React.FormEvent<HTMLInputElement>) => void;
  password: string;
  setPassword: (e: React.FormEvent<HTMLInputElement>) => void;
}

const SignIn: FC<SignInProps> = ({
  toggle,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const { errMsgs, setErrMsgs } = useErrMsgs();
  const [loading, setLoading] = useState<boolean>(false);

  // Try to log in
  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (res.status === 200) {
        Router.push("/records/summary");
      } else {
        throw new Error(await res.text());
      }
    } catch (e) {
      setLoading(false);
      setErrMsgs([errString(e)]);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`px-5 pt-4 pb-2 w-full bg-tab rounded-b-xl`}
    >
      <TextEntry
        label="Email:"
        name="email"
        type="email"
        value={email}
        onChange={setEmail}
        className="mb-2"
        autoFocus={true}
      />
      <TextEntry
        label="Password:"
        name="password"
        type="password"
        value={password}
        onChange={setPassword}
      />
      <ErrorMessages errors={errMsgs} />
      <div className="grid grid-cols-6">
        {loading ? (
          <Spinner className="my-2 col-span-6 sm:col-start-3 sm:col-span-4" />
        ) : (
          <BasicButton
            label="Login"
            type="submit"
            color="green"
            className="w-full col-start-3 col-span-4"
          />
        )}
      </div>
      {!loading && (
        <div className="flex flex-row mt-2 ">
          <button onClick={toggle}>
            <p
              className={`font-jose text-sm text-white cursor-pointer z-50 
          transform duration-300 hover:scale-105`}
            >
              Make a new account.
            </p>
          </button>
          <div className="grow" />
          <Link href="forgot">
            <p
              className={`font-jose text-sm text-white cursor-pointer z-50 
          transform duration-300 hover:scale-105`}
            >
              Forgot password?
            </p>
          </Link>
        </div>
      )}
    </form>
  );
};

export default SignIn;
