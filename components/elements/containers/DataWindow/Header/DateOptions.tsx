import { getMonth } from "date-fns";
import { FC } from "react";
import { capitalize, months } from "../../../../../helpers/strings";
import usePath from "../../../../../hooks/usePath";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import {
  decrementMonth,
  decrementYear,
  incrementMonth,
  incrementYear,
  selectDate,
} from "../../../../../redux/date";
import BrowseButton from "../../../input/button/BrowseButton";

const DateOptions: FC = () => {
  const dispatch = useReduxDispatch();
  const { date, dataTimeframe } = useReduxSelector(selectDate);

  const { recordPath: dataType } = usePath();

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
