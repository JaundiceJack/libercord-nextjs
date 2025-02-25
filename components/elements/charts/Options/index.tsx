import { FC } from "react";
import { capitalize } from "../../../../helpers/strings";
import usePath from "../../../../hooks/usePath";
import CatalogOption from "./CatalogOption";
import ChartOption from "./ChartOption";
import NegateExpensesOption from "./NegateExpensesOption";
import Title from "./Title";
import GroupBox from "../../containers/GroupBox";
import { useReduxSelector } from "../../../../hooks/useRedux";
import { selectExpense } from "../../../../redux/expense";
import { selectIncome } from "../../../../redux/income";
import { selectSummary } from "../../../../redux/summary";
import ToggleData from "./ToggleData";
import NewExpense from "./NewExpense";
import NewIncome from "./NewIncome";
import { AiOutlineLineChart, AiOutlineMinusCircle } from "react-icons/ai";
import { CgOptions } from "react-icons/cg";
import { GrAddCircle } from "react-icons/gr";
import { BiHide } from "react-icons/bi";
import { selectAsset } from "../../../../redux/asset";
import NewAsset from "./NewAsset";

const Options: FC = () => {
  const { recordPath: dataType } = usePath();

  const { incomeChartType } = useReduxSelector(selectIncome);
  const { expenseChartType } = useReduxSelector(selectExpense);
  const { assetChartType } = useReduxSelector(selectAsset);
  const { summaryChartType } = useReduxSelector(selectSummary);

  const condi1 =
    dataType === "income" &&
    (incomeChartType === "pie" || incomeChartType === "radar");
  const condi2 =
    dataType === "expenses" &&
    (expenseChartType === "pie" || expenseChartType === "radar");
  const condi3 =
    dataType === "summary" &&
    (summaryChartType === "line" || summaryChartType === "bar");

  return (
    <div className={`flex flex-col w-full pt-6 pb-6 relative`}>
      {(dataType === "summary" || dataType === "expenses") && (
        <GroupBox
          title="Create Expense"
          expanded={dataType !== "summary"}
          icon={<GrAddCircle size="20" />}
          zIndex={5}
        >
          <NewExpense />
        </GroupBox>
      )}

      {(dataType === "summary" || dataType === "income") && (
        <GroupBox
          title="Create Income"
          expanded={dataType !== "summary"}
          icon={<GrAddCircle size="20" />}
          zIndex={4}
        >
          <NewIncome />
        </GroupBox>
      )}

      {dataType === "assets" && (
        <GroupBox
          title="Record Asset"
          expanded={true}
          icon={<GrAddCircle size="20" />}
          zIndex={4}
        >
          <NewAsset />
        </GroupBox>
      )}

      <GroupBox
        title={`Chart Type`}
        expanded={false}
        icon={<AiOutlineLineChart size="20" />}
        zIndex={3}
      >
        <ChartOption />
      </GroupBox>

      {(condi1 || condi2) && (
        <GroupBox title={`Data Type`} icon={<CgOptions size="20" />} zIndex={2}>
          <CatalogOption />
        </GroupBox>
      )}

      {/* {dataType === "summary" && expenses.length && (
        <GroupBox
          title={`Negative Expenses?`}
          expanded={false}
          icon={<AiOutlineMinusCircle size="20" />}
          zIndex={1}
        >
          <NegateExpensesOption />
        </GroupBox>
      )} */}

      {dataType === "summary" && (
        <GroupBox
          title={`Toggle Data`}
          expanded={false}
          icon={<CgOptions size="20" />}
          zIndex={0}
        >
          <ToggleData />
        </GroupBox>
      )}

      <div className="w-full h-6"></div>
    </div>
  );
};

export default Options;
