import { FC } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import {
  editPreferences,
  selectPreferences,
} from "../../../../redux/preferences";
import BorderButton from "../../../elements/input/button/BorderButton";

const ChartDefaults: FC = () => {
  const dispatch = useReduxDispatch();
  const {
    defaultExpenseChartType,
    defaultIncomeChartType,
    defaultSummaryChartType,
  } = useReduxSelector(selectPreferences);

  return (
    <div className="flex flex-col p-3 mb-4">
      <div className="bg-slate-800 p-2 flex justify-center text-lg font-semibold text-white rounded-lg">
        {" "}
        Default Charts
      </div>

      <div className="flex flex-row items-center my-4">
        <p className="w-14 text-white mb-2 text-lg">Summary</p>
        <div className="grid grid-cols-2 w-full">
          <BorderButton
            color="green"
            onClick={() =>
              dispatch(
                editPreferences({
                  updates: { defaultSummaryChartType: "line" },
                })
              )
            }
            name="Line"
            selected={defaultSummaryChartType === "line"}
          />
          <BorderButton
            color="green"
            onClick={() =>
              dispatch(
                editPreferences({ updates: { defaultSummaryChartType: "bar" } })
              )
            }
            name="Bar"
            selected={defaultSummaryChartType === "bar"}
          />
        </div>
      </div>
      <hr className="opacity-10" />
      <div className="flex flex-row items-center">
        <p className="w-14 text-white mb-2 text-lg">Income</p>
        <div className="grid grid-cols-2 w-full">
          <BorderButton
            color="green"
            onClick={() =>
              dispatch(
                editPreferences({ updates: { defaultIncomeChartType: "line" } })
              )
            }
            name="Line"
            selected={defaultIncomeChartType === "line"}
          />
          <BorderButton
            color="green"
            onClick={() =>
              dispatch(
                editPreferences({ updates: { defaultIncomeChartType: "bar" } })
              )
            }
            name="Bar"
            selected={defaultIncomeChartType === "bar"}
          />
          <BorderButton
            color="green"
            onClick={() =>
              dispatch(
                editPreferences({ updates: { defaultIncomeChartType: "pie" } })
              )
            }
            name="Pie"
            selected={defaultIncomeChartType === "pie"}
          />
          <BorderButton
            color="green"
            onClick={() =>
              dispatch(
                editPreferences({
                  updates: { defaultIncomeChartType: "radar" },
                })
              )
            }
            name="Radar"
            selected={defaultIncomeChartType === "radar"}
          />
        </div>
      </div>
      <hr className="opacity-10" />
      <div className="flex flex-row items-center">
        <p className="w-14 text-white text-lg mb-2">Expense</p>
        <div className="grid grid-cols-2 w-full">
          <BorderButton
            color="green"
            onClick={() =>
              dispatch(
                editPreferences({
                  updates: { defaultExpenseChartType: "line" },
                })
              )
            }
            name="Line"
            selected={defaultExpenseChartType === "line"}
          />
          <BorderButton
            color="green"
            onClick={() =>
              dispatch(
                editPreferences({ updates: { defaultExpenseChartType: "bar" } })
              )
            }
            name="Bar"
            selected={defaultExpenseChartType === "bar"}
          />
          <BorderButton
            color="green"
            onClick={() =>
              dispatch(
                editPreferences({ updates: { defaultExpenseChartType: "pie" } })
              )
            }
            name="Pie"
            selected={defaultExpenseChartType === "pie"}
          />
          <BorderButton
            color="green"
            onClick={() =>
              dispatch(
                editPreferences({
                  updates: { defaultExpenseChartType: "radar" },
                })
              )
            }
            name="Radar"
            selected={defaultExpenseChartType === "radar"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartDefaults;
