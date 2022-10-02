import { FC, useState } from "react";
import SignIn from "./signin";
import SignUp from "./signup";

const Login: FC = () => {
  const [loginToggle, setLoginToggle] = useState(true);

  return (
    <div className="flex flex-col w-84 sm:w-120">
      <div className={`flex flex-row overflow-hidden rounded-t-xl`}>
        <button
          onClick={() => setLoginToggle(true)}
          className={`hover:bg-gray-600 bg-tab-right w-full h-full px-6 py-2 ${
            loginToggle && "border-l border-orange-500 rounded-tl-xl"
          }`}
        >
          <p className={`font-semibold font-jose text-white whitespace-nowrap`}>
            Log In
          </p>
        </button>
        <div className="w-px h-full bg-gray-600 border-l border-gray-600"></div>
        <button
          onClick={() => setLoginToggle(false)}
          className={`hover:bg-gray-600 bg-tab-left w-full h-full px-6 py-2 ${
            !loginToggle && "border-r border-orange-500 rounded-tr-xl"
          }`}
        >
          <p className={`font-semibold font-jose text-white whitespace-nowrap`}>
            Create Account
          </p>
        </button>
      </div>
      <div className="h-px w-full bg-gray-600" />
      {loginToggle ? <SignIn /> : <SignUp />}
    </div>
  );
};

export default Login;
