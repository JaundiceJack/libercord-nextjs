import { FC } from "react";
import Message from "./message";

interface ErrorMessagesProps {
  errors: (string | undefined)[];
  className?: string;
}

const ErrorMessages: FC<ErrorMessagesProps> = ({ errors, className }) => {
  return (
    <>
      {errors &&
        errors.map((err, i) => {
          return (
            <Message error={err} key={i} className={`mt-2 ${className}`} />
          );
        })}
    </>
  );
};

export default ErrorMessages;
