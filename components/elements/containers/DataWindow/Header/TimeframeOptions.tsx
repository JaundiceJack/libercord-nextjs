import { FC } from "react";
import { selectDate, setTimeframe } from "../../../../../redux/dateSlice";
import HeaderButton from "../../../input/button/HeaderButton";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";

const TimeframeOptions: FC = () => {
  const dispatch = useReduxDispatch();
  const { dataTimeframe } = useReduxSelector(selectDate);

  return (
    <div
      className={`flex items-center md:order-3 order-1 md:mb-0 ${
        dataTimeframe === "all" ? "mb-2 sm:ml-auto" : "mb-1"
      }`}
    >
      <HeaderButton
        label="all"
        onClick={() => dispatch(setTimeframe("all"))}
        current={dataTimeframe}
      />
      <HeaderButton
        label="year"
        onClick={() => dispatch(setTimeframe("year"))}
        current={dataTimeframe}
        className="ml-1"
      />
      <HeaderButton
        label="month"
        onClick={() => dispatch(setTimeframe("month"))}
        current={dataTimeframe}
        className="ml-1"
      />
    </div>
  );
};

export default TimeframeOptions;
