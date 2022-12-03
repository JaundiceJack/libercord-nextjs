// Import basics
import { useState } from "react";
// Import icons
import { IoWalletOutline } from "react-icons/io5";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import {
  selectDate,
  incrementYear,
  decrementYear,
} from "../../redux/dateSlice";
// Import components
//import SavingsChart from './savings/chart/savingsChart.js';
//import SavingsInfo  from './savings/info/savingsInfo.js';
//import GraphWindow from '../../../containers/graphWindow.js';
import DetailWindow from "../elements/containers/detailWindow";

const SummaryContent = () => {
  const dispatch = useReduxDispatch();
  const { date } = useReduxSelector(selectDate);

  return (
    <div className={`flex flex-col mx-0 mt-4 sm:m-4 h-full `}>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-4
        min-h-screen p-4 sm:p-0`}
      >
        <DetailWindow
          header="Your Finances"
          icon={<IoWalletOutline />}
          year={date.getFullYear()}
          next={() => dispatch(incrementYear())}
          prev={() => dispatch(decrementYear())}
          toggle={() => {
            return;
          }}
          current={false}
        >
          <div></div>
        </DetailWindow>

        <div className="lg:col-span-2"></div>
      </div>
    </div>
  );
};

export default SummaryContent;

/*
<div className="flex flex-col items-center justify-center w-full p-2">
  <SavingsInfo year={year} />
</div>
<GraphWindow year={year} next={nextYear} prev={backYear}
  content={
  <div className="flex flex-col items-center justify-center h-full w-full p-2">
    <SavingsChart year={year} />
  </div>
} />
*/
