import Router from "next/router";
import React, { useState, FC } from "react";
import useErrMsgs from "../../../hooks/useErrMsgs";
import { errString } from "../../../helpers/errors";
import BasicButton from "../../elements/input/button/basicButton";
import TextEntry from "../../elements/input/form/textEntry";
import ErrorMessages from "../../elements/misc/errorMessages";
import Spinner from "../../elements/misc/spinner";

interface SignUpProps {
  toggle: () => void;
  email: string;
  setEmail: (e: React.FormEvent<HTMLInputElement>) => void;
  password: string;
  setPassword: (e: React.FormEvent<HTMLInputElement>) => void;
  confirm: string;
  setConfirm: (e: React.FormEvent<HTMLInputElement>) => void;
}

const SignUp: FC<SignUpProps> = ({
  toggle,
  email,
  setEmail,
  password,
  setPassword,
  confirm,
  setConfirm,
}) => {
  const { errMsgs, setErrMsgs, clearErrors } = useErrMsgs();
  const [loading, setLoading] = useState<boolean>(false);

  // Try to create a new user
  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();
    if (password !== confirm) {
      setErrMsgs([`The passwords don't match`]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 200) {
        console.log(res);
        Router.push("/records/summary");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
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
        value={email}
        type="email"
        onChange={setEmail}
        className="mb-2"
      />
      <TextEntry
        label="Password:"
        name="password"
        value={password}
        type="password"
        onChange={setPassword}
        className="mb-2"
      />
      <TextEntry
        label="Confirm Password:"
        name="confirm"
        type="password"
        value={confirm}
        onChange={setConfirm}
      />
      <ErrorMessages errors={errMsgs} />
      <div className="grid grid-cols-6 mb-2">
        {loading ? (
          <Spinner className="my-2 col-span-6 sm:col-start-3 sm:col-span-4" />
        ) : (
          <BasicButton
            label="Create"
            type="submit"
            color="green"
            className="w-full col-start-3 col-span-4"
          />
        )}
      </div>
    </form>
  );
};

export default SignUp;
