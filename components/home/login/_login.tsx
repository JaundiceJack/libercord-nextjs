import { FC, useState } from "react";
import SignIn from "./signin";
import SignUp from "./signup";
import SignInToggle from "./signinToggle";
import SignUpToggle from "./signupToggle";
import useUser from "../../../hooks/useUser";

const Login: FC = () => {
  const { user, loading } = useUser({ redirectTo: "/" });
  const [loginToggle, setLoginToggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div className="flex flex-col w-80 sm:w-120 md:w-136">
      {!user && (
        <>
          <div className={`flex flex-row overflow-hidden rounded-t-xl`}>
            <SignInToggle
              active={loginToggle}
              toggle={() => setLoginToggle(true)}
            />
            <div className="w-px h-full bg-gray-600 border-l border-gray-600"></div>
            <SignUpToggle
              active={loginToggle}
              toggle={() => setLoginToggle(false)}
            />
          </div>
          <div className="h-px w-full bg-gray-600" />
          {loginToggle ? (
            <SignIn
              toggle={() => setLoginToggle(false)}
              email={email}
              setEmail={(e) => setEmail(e.target.value)}
              password={password}
              setPassword={(e) => setPassword(e.target.value)}
            />
          ) : (
            <SignUp
              toggle={() => setLoginToggle(true)}
              email={email}
              setEmail={(e) => setEmail(e.target.value)}
              password={password}
              setPassword={(e) => setPassword(e.target.value)}
              confirm={confirm}
              setConfirm={(e) => setConfirm(e.target.value)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Login;
