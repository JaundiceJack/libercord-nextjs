import Router from "next/router";
import React, { useState, FC } from "react";
import useErrMsgs from "../../../../hooks/useErrMsgs";
import { errString } from "../../../../helpers/errors";
import TextEntry from "../../../elements/input/form/Text";
import ErrorMessages from "../../../elements/misc/errorMessages";
import Spinner from "../../../elements/misc/spinner";
import BareButton from "../../../elements/input/button/BareButton";
import BasicButton from "../../../elements/input/button/BasicButton";
import HomeCSS from "../../../../styles/Home.module.css";
import Loading from "../../../elements/misc/loading";

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
      className={`flex flex-col px-5 pb-2 w-full ${HomeCSS.tab} rounded-b-xl`}
    >
      <TextEntry
        label="Email:"
        placeholder="example@gmail.com"
        name="email"
        className="mb-4 mt-10"
        value={email}
        type="email"
        onChange={setEmail}
        autoFocus={true}
      />
      <TextEntry
        label="Password:"
        placeholder="enter a new password"
        name="password"
        className="mb-4"
        value={password}
        type="password"
        onChange={setPassword}
      />
      <TextEntry
        label="Confirm Password:"
        shortLabel="Confirm:"
        placeholder="re-enter your password"
        name="confirm"
        type="password"
        className="mb-4"
        value={confirm}
        onChange={setConfirm}
      />
      <TextEntry
        label="Initial Balance:"
        shortLabel="Balance:"
        placeholder="current cash balance (optional)"
        name="initialSavings"
        className="mb-4"
        value={initialSavings}
        onChange={setInitialSavings}
      />

      {errMsgs.length !== 0 ? (
        <ErrorMessages errors={errMsgs} />
      ) : loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-6 items-center justify-center w-full mb-2 mt-10">
          <BasicButton
            label="Create"
            type="submit"
            color="green"
            className="col-span-4 col-start-2"
          />
        </div>
      )}
    </form>
  );
};

export default SignUp;
