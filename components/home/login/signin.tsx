import Link from "next/link";
import { useState, FC } from "react";
import BasicButton from "../../elements/input/basicButton";
import TextEntry from "../../elements/input/textEntry";

const SignIn: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      className={`px-5 pt-4 pb-2 w-full bg-tab rounded-b-xl border-l border-orange-600`}
    >
      <TextEntry label="Email:" name="email" value={email} className="mb-2" />
      <TextEntry label="Password:" name="password" value={password} />
      <div className="grid grid-cols-6">
        <BasicButton
          label="Login"
          type="submit"
          color="green"
          className="w-full col-start-3 col-span-4"
        />
      </div>

      <div className="flex flex-row justify-end mt-2 ">
        <Link href="forgot">
          <p className={`font-mont text-sm text-white cursor-pointer z-50`}>
            Forgot password?
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
