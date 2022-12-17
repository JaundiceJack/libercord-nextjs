import { FC } from "react";

interface EmptyListMessageProps {
  listName: string;
}

const EmptyListMessage: FC<EmptyListMessageProps> = ({ listName }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <p className="text-blue-100 text-center font-semibold font-jose my-auto">
        No {listName} yet.
        <br />
        Add a new one to begin.
      </p>
    </div>
  );
};
export default EmptyListMessage;
