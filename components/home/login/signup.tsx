import Link from "next/link";
import { useState, FC } from "react";
import BasicButton from "../../elements/input/basicButton";
import TextEntry from "../../elements/input/textEntry";

const SignUp: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div
      className={`px-5 pt-4 pb-2 w-full bg-tab rounded-b-xl border-r border-orange-600`}
    >
      <TextEntry label="Email:" name="email" value={email} className="mb-2" />
      <TextEntry
        label="Password:"
        name="password"
        value={password}
        className="mb-2"
      />
      <TextEntry label="Confirm Password:" name="confirm" value={confirm} />
      <div className="grid grid-cols-6 mb-2">
        <BasicButton
          label="Create"
          type="submit"
          color="green"
          className="w-full col-start-3 col-span-4"
        />
      </div>
    </div>
  );
};

export default SignUp;
