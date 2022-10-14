import { FC } from "react";

interface MessageProps {
  error?: string;
  warning?: string;
  info?: string;
  success?: string;
  className?: string;
}

const Message: FC<MessageProps> = ({
  error,
  warning,
  info,
  success,
  className,
}) => {
  return (
    <div
      className={`flex items-center justify-center px-2 py-2 rounded-lg
      border-l border-gray-500 font-semibold text-black fadeError ${className} ${
        error
          ? "bg-red-400"
          : warning
          ? "bg-yellow-400"
          : info
          ? "bg-blue-400"
          : success
          ? "bg-green-400"
          : "bg-gray-400"
      }`}
    >
      {error ? error : warning ? warning : info ? info : success ? success : ""}
    </div>
  );
};

export default Message;
