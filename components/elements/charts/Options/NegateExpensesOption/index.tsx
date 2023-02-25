import { FC } from "react";
import usePath from "../../../../../hooks/usePath";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import {
  selectSummary,
  setSummaryExpensesNegative,
} from "../../../../../redux/summary";
import GraphOptionToggle from "../../../input/button/GraphOptionToggle";
// import OptionHR from "../OptionHR";

const NegateExpensesOption: FC = () => {
  const dispatch = useReduxDispatch();
  const { summaryExpensesNegative } = useReduxSelector(selectSummary);

  const { recordPath: dataType } = usePath();

  return (
    <>
      {dataType === "summary" && (
        <>
          <GraphOptionToggle
            className="my-2"
            label="Expenses Negative"
            selected={summaryExpensesNegative ? "Yes" : "No"}
            options={["Yes", "No"]}
            toggleOption={(mode: string) => {
              dispatch(setSummaryExpensesNegative(mode === "Yes"));
            }}
          />
        </>
      )}
    </>
  );
};

export default NegateExpensesOption;
