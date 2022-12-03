import { FC } from "react";
import EmptyListMessage from "../elements/misc/emptyListMessage";
//import IncomePie    from './chart/incomePie.js';

const IncomeGraph: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-2">
      <EmptyListMessage listName="income" />
    </div>
  );
};

export default IncomeGraph;
