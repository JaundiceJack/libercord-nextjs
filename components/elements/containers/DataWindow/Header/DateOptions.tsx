import { FC } from "react";
import BrowseButton from "../../../input/button/BrowseButton";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { getMonth } from "date-fns";
import { capitalize, months } from "../../../../../helpers/strings";
import {
  selectDate,
  incrementMonth,
  incrementYear,
  decrementMonth,
  decrementYear,
} from "../../../../../redux/dateSlice";
import { DateOptionsProps } from "../types";

const DateOptions: FC<DateOptionsProps> = ({ dataType }) => {
  const dispatch = useReduxDispatch();
  const { date, dataTimeframe } = useReduxSelector(selectDate);

  return (
    <>
      {dataTimeframe === "all" ? (
        <p
          className={`md:absolute left-0 right-0 flex justify-center md:mb-0 mb-4 mx-auto
          font-semibold font-jose text-white`}
        >
          All {dataType === "summary" ? "Data" : `${capitalize(dataType)}s`}
        </p>
      ) : (
        <div
          className={`md:absolute left-0 right-0 ${
            dataTimeframe === "year" ? "w-28" : "w-52"
          } mx-auto flex justify-center md:mb-0 mb-4`}
        >
          <BrowseButton
            direction="prev"
            onClick={() =>
              dispatch(
                dataTimeframe === "year" ? decrementYear() : decrementMonth()
              )
            }
            title={""}
          />
          <h4 className="w-full text-center text-blue-200 text-md font-semibold font-jose mt-1">
            {dataTimeframe === "year"
              ? date.getFullYear()
              : `${date.getFullYear()} - ${capitalize(months[getMonth(date)])}`}
          </h4>
          <BrowseButton
            direction="next"
            onClick={() =>
              dispatch(
                dataTimeframe === "year" ? incrementYear() : incrementMonth()
              )
            }
            title={""}
          />
        </div>
      )}
    </>
  );
};

export default DateOptions;
