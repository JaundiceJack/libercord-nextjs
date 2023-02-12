import Link from "next/link";
import Router from "next/router";
import React, { useState, FC } from "react";
import TextEntry from "../../../elements/input/form/Text";
import { errString } from "../../../../helpers/errors";
import ErrorMessages from "../../../elements/misc/errorMessages";
import Spinner from "../../../elements/misc/spinner";
import useErrMsgs from "../../../../hooks/useErrMsgs";
import BareButton from "../../../elements/input/button/BareButton";
import HomeCSS from "../../../../styles/Home.module.css";

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
      className={`px-5 pt-4 pb-2 w-full ${HomeCSS.tab} rounded-b-xl`}
    >
      <TextEntry
        label="Email:"
        name="email"
        type="email"
        value={email}
        onChange={setEmail}
        className="mb-2"
        autoFocus={true}
        labelWidth="6rem"
        inputWidth="1fr"
      />
      <TextEntry
        label="Password:"
        name="password"
        type="password"
        value={password}
        onChange={setPassword}
        className="mb-2"
        labelWidth="6rem"
        inputWidth="1fr"
      />
      <ErrorMessages errors={errMsgs} />
      <div className="grid grid-cols-6 items-center justify-center">
        {loading ? (
          <Spinner className="my-2 col-span-6" />
        ) : (
          <BareButton
            label="Login"
            type="submit"
            color="green"
            className={`col-span-4 col-start-2 mt-2`}
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
