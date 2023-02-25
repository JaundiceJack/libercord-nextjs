import Router from "next/router";
import React, { useState, FC } from "react";
import useErrMsgs from "../../../../hooks/useErrMsgs";
import { errString } from "../../../../helpers/errors";
import TextEntry from "../../../elements/input/form/Text";
import ErrorMessages from "../../../elements/misc/errorMessages";
import Spinner from "../../../elements/misc/spinner";
import BareButton from "../../../elements/input/button/BareButton";
import HomeCSS from "../../../../styles/Home.module.css";
import NumberEntry from "../../../elements/input/form/Number";

interface SignUpProps {
  toggle: () => void;
  email: string;
  setEmail: (e: React.FormEvent<HTMLInputElement>) => void;
  password: string;
  setPassword: (e: React.FormEvent<HTMLInputElement>) => void;
  confirm: string;
  setConfirm: (e: React.FormEvent<HTMLInputElement>) => void;
  initialSavings: string;
  setInitialSavings: (e: React.FormEvent<HTMLInputElement>) => void;
}

const SignUp: FC<SignUpProps> = ({
  toggle,
  email,
  setEmail,
  password,
  setPassword,
  confirm,
  setConfirm,
  initialSavings,
  setInitialSavings,
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
        body: JSON.stringify({
          email,
          password,
          initialSavings: Number(initialSavings),
        }),
      });
      if (res.status === 200) {
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
      className={`px-5 pt-4 pb-2 w-full ${HomeCSS.tab} rounded-b-xl`}
    >
      <TextEntry
        label="Email:"
        placeholder="example@gmail.com"
        name="email"
        value={email}
        type="email"
        onChange={setEmail}
        className="mb-2"
        labelWidth="6rem"
        inputWidth="1fr"
        autoFocus={true}
      />
      <TextEntry
        label="Password:"
        placeholder="enter a new password"
        name="password"
        value={password}
        type="password"
        onChange={setPassword}
        className="mb-2"
        labelWidth="6rem"
        inputWidth="1fr"
      />
      <TextEntry
        label="Retype:"
        placeholder="confirm your password"
        name="confirm"
        type="password"
        value={confirm}
        onChange={setConfirm}
        className="mb-2"
        labelWidth="6rem"
        inputWidth="1fr"
      />
      <NumberEntry
        label="Savings:"
        placeholder="current cash balance (optional)"
        name="initialSavings"
        value={initialSavings}
        onChange={setInitialSavings}
        className="mb-2"
        labelWidth="6rem"
        inputWidth="1fr"
      />
      <ErrorMessages errors={errMsgs} />
      <div className="grid grid-cols-6 mb-2 items-center justify-center">
        {loading ? (
          <Spinner className="my-2 col-span-6" />
        ) : (
          <BareButton
            label="Create"
            type="submit"
            color="green"
            className="col-span-4 col-start-2 mt-2"
          />
        )}
      </div>
    </form>
  );
};

export default SignUp;
