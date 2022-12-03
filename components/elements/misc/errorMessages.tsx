import { FC } from "react";
import Message from "./message";

interface ErrorMessagesProps {
  errors: (string | undefined)[];
}

const ErrorMessages: FC<ErrorMessagesProps> = ({ errors }) => {
  return (
    <>
      {errors &&
        errors.map((err, i) => {
          return <Message error={err} key={i} className="mt-2" />;
        })}
    </>
  );
};

export default ErrorMessages;
