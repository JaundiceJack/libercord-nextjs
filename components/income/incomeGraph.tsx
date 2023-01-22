import { FC, useState } from "react";
import { useReduxSelector } from "../../hooks/useRedux";
import { selectIncome } from "../../redux/incomeSlice";
import EmptyListMessage from "../elements/misc/emptyListMessage";
import PieChart, { Datum } from "../elements/charts/Pie";
import PieLegend from "../elements/charts/PieLegend";
import ChartToggles from "../elements/charts/ChartToggles";
import { selectDate } from "../../redux/dateSlice";
import { IncomeType } from "../../models/Income";
import { isSameMonth, isSameYear } from "date-fns";
import { capitalize } from "../../helpers/strings";
import COLORS from "../elements/charts/colors";

const IncomeGraph: FC = () => {
  const { incomes } = useReduxSelector(selectIncome);
  const { date, dataTimeframe } = useReduxSelector(selectDate);
  const [viewBy, setViewBy] = useState<"source" | "category">("category");
  const [chart, setChart] = useState<"pie" | "bar">("pie");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const onHover = (data: Datum | null, index: number) => {
    setActiveIndex(index);
    // scrollToIndex(index);
  };

  const timeFilter = (inc: IncomeType, index: number) => {
    const incDate = new Date(inc.date);
    if (dataTimeframe === "year") {
      return isSameYear(incDate, date);
    } else if (dataTimeframe === "month") {
      return isSameMonth(incDate, date);
    } else return true;
  };
  const filteredIncomes = incomes.filter(timeFilter);
  const sumTotal = (total: number, income: IncomeType) => total + income.amount;
  const totalValue = filteredIncomes.reduce(sumTotal, 0);
  const totalsByEntry = (entries: string[], type: "source" | "category") => {
    return entries.map((entry) => {
      const entryTotal = filteredIncomes.reduce(
        (total, income) =>
          income[type].toLowerCase() === entry ? total + income.amount : total,
        0
      );
      return {
        name: capitalize(entry),
        value: entryTotal,
        percent: entryTotal / totalValue,
      };
    });
  };
  const sortByPercent = (a: Datum, b: Datum) =>
    a.percent! > b.percent! ? -1 : 1;

  const categories = filteredIncomes
    .map((income) => income.category.toLowerCase())
    .filter((value, index, self) => self.indexOf(value) === index);
  const sources = filteredIncomes
    .map((income) => income.source.toLowerCase())
    .filter((value, index, self) => self.indexOf(value) === index);
  const categoryTotals = totalsByEntry(categories, "category").sort(
    sortByPercent
  );
  const sourceTotals = totalsByEntry(sources, "source").sort(sortByPercent);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {incomes.length === 0 ? (
        <EmptyListMessage listName="income" />
      ) : (
        <div className={`w-full h-full grid grid-cols-3`}>
          <div className="col-span-3 md:col-span-2">
            {chart === "pie" ? (
              <PieChart
                data={viewBy === "category" ? categoryTotals : sourceTotals}
                activeIndex={activeIndex}
                onPieHover={onHover}
              />
            ) : (
              <div style={{ height: 450 }} />
            )}

            <ChartToggles
              toggleFilter={() =>
                setViewBy(viewBy === "source" ? "category" : "source")
              }
              toggleChart={() => {
                setChart(chart === "pie" ? "bar" : "pie");
              }}
              filters={["source", "category"]}
              currentFilter={viewBy}
              currentChart={chart}
            />
          </div>
          <div className="col-span-3 md:col-span-1 flex flex-col items-end overflow-y-auto">
            <PieLegend
              title={viewBy === "category" ? "Categories" : "Sources"}
              data={viewBy === "category" ? categoryTotals : sourceTotals}
              colors={COLORS}
              onPieHover={onHover}
              activeIndex={activeIndex}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeGraph;
