import { FC } from "react";
import usePath from "../../../../../hooks/usePath";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { selectDate, setTimeframe } from "../../../../../redux/date";
import HeaderButton from "../../../input/button/HeaderButton";

const TimeframeOptions: FC = () => {
  const dispatch = useReduxDispatch();
  const { dataTimeframe } = useReduxSelector(selectDate);

  const { recordPath: dataType } = usePath();

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
      {dataType !== "summary" && (
        <HeaderButton
          label="month"
          onClick={() => dispatch(setTimeframe("month"))}
          current={dataTimeframe}
          className="ml-1"
        />
      )}
    </div>
  );
};

export default TimeframeOptions;
