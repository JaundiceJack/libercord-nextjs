import Link from "next/link";
import Router from "next/router";
import React, { useState, FC } from "react";
// import TextEntry from "../../../elements/input/form/Text";
import { errString } from "../../../../helpers/errors";
import ErrorMessages from "../../../elements/misc/errorMessages";
import Spinner from "../../../elements/misc/spinner";
import useErrMsgs from "../../../../hooks/useErrMsgs";
import BareButton from "../../../elements/input/button/BareButton";
import BasicButton from "../../../elements/input/button/BasicButton";
import HomeCSS from "../../../../styles/Home.module.css";
import Loading from "../../../elements/misc/loading";
import TextEntry from "../../../elements/input/form/Text";

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
      className={`flex flex-col px-5 pb-2 w-full ${HomeCSS.tab} rounded-b-xl`}
    >
      <TextEntry
        label="Email:"
        name="email"
        type="email"
        className="mb-4 mt-10"
        value={email}
        onChange={setEmail}
        autoFocus={true}
      />
      <TextEntry
        label="Password:"
        name="password"
        type="password"
        className="mb-4"
        value={password}
        onChange={setPassword}
      />

      {errMsgs.length !== 0 ? (
        <ErrorMessages errors={errMsgs} />
      ) : loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-6 content-between justify-center w-full mt-10 mb-2">
          <BasicButton
            label="Login"
            type="submit"
            color="green"
            className={`col-span-4 col-start-2`}
          />
          <div className="col-span-6 flex flex-row mt-8 ">
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
        </div>
      )}
    </form>
  );
};

export default SignIn;
