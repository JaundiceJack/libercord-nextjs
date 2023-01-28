import { FC, useState } from "react";
import { useReduxSelector } from "../../hooks/useRedux";
import { selectIncome } from "../../redux/incomeSlice";
import EmptyListMessage from "../elements/misc/emptyListMessage";
import PieChart from "../elements/charts/Pie";
import BarChart from "../elements/charts/Bar";
import PieLegend from "../elements/charts/PieLegend";
import ChartToggles from "../elements/charts/ChartToggles";
import { selectDate } from "../../redux/dateSlice";
import { IncomeType } from "../../models/Income";
import { getMonth, getYear, isSameMonth, isSameYear } from "date-fns";
import { capitalize, months } from "../../helpers/strings";
import COLORS from "../elements/charts/colors";
import { Datum, sortByPercent } from "../elements/charts/types";

const IncomeGraph: FC = () => {
  const { incomes } = useReduxSelector(selectIncome);
  const { date, dataTimeframe } = useReduxSelector(selectDate);
  const [viewBy, setViewBy] = useState<"source" | "category">("category");
  const [chart, setChart] = useState<"pie" | "bar">("pie");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const onHover = (data: Datum | null, index: number) => {
    setActiveIndex(index);
  };

  // Filter incomes by year, month, or all
  const filteredIncomes = incomes.filter((inc, index) => {
    const incDate = new Date(inc.date);
    if (dataTimeframe === "year") {
      return isSameYear(incDate, date);
    } else if (dataTimeframe === "month") {
      return isSameMonth(incDate, date);
    } else return true;
  });

  // Get each unique category, source, and year that has data
  const categories = filteredIncomes
    .map((income) => income.category.toLowerCase())
    .filter((value, index, self) => self.indexOf(value) === index);
  const sources = filteredIncomes
    .map((income) => income.source.toLowerCase())
    .filter((value, index, self) => self.indexOf(value) === index);
  const dataYears = incomes
    .map((income) => getYear(new Date(income.date)))
    .filter((value, index, self) => self.indexOf(value) === index);

  // Compose functions to total the values for entries/months/years
  const totalValue = filteredIncomes.reduce(
    (total, income) => total + income.amount,
    0
  );
  const valueByEntry = (entry: string, entryType: "source" | "category") => {
    return filteredIncomes.reduce(
      (total, income) =>
        income[entryType].toLowerCase() === entry
          ? total + income.amount
          : total,
      0
    );
  };
  const valueByMonth = (monthIndex: number) => {
    return filteredIncomes.reduce(
      (total, income) =>
        getMonth(new Date(income.date)) === monthIndex
          ? total + income.amount
          : total,
      0
    );
  };
  const valueByYear = (dataYearIndex: number) => {
    return filteredIncomes.reduce(
      (total, income) =>
        getYear(new Date(income.date)) === dataYears[dataYearIndex]
          ? total + income.amount
          : total,
      0
    );
  };

  // Get the totals for each source or category, month, or year
  const totalsByEntry = (type: "source" | "category"): Datum[] => {
    const entries = type === "category" ? categories : sources;
    return entries.map((entry) => {
      const entryTotal = valueByEntry(entry, type);
      return {
        name: capitalize(entry),
        value: entryTotal,
        percent: entryTotal / totalValue,
      };
    });
  };
  const totalsByMonth = (): Datum[] =>
    months.map((month, index) => ({
      name: capitalize(month),
      value: valueByMonth(index),
    }));
  const totalsByYear = (): Datum[] =>
    dataYears.map((year, index) => ({
      name: year.toString(),
      value: valueByYear(index),
    }));

  const catTotals = totalsByEntry("category").sort(sortByPercent);
  const srcTotals = totalsByEntry("source").sort(sortByPercent);

  const catTotalsByMonth = totalsByMonth();
  const srcTotalsByMonth = totalsByMonth();

  const catTotalsByYear = totalsByYear().sort((a, b) =>
    Number(a.name) > Number(b.name) ? 1 : -1
  );
  const srcTotalsByYear = totalsByYear().sort((a, b) =>
    Number(a.name) > Number(b.name) ? 1 : -1
  );

  // I may need to compromise, something like only showing first 9, then 10 as 'rest'
  // so making slots item1_value, item1_name and filling those with the totals
  // if i do that tho, it would try to make the label item1_value
  // unless i use a customized label to overwrite it
  // but i think given the way that it works it might be a viable compromise
  //

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {incomes.length === 0 ? (
        <EmptyListMessage listName="income" />
      ) : (
        <div className={`w-full h-full grid grid-cols-3`}>
          <div className="col-span-3 md:col-span-2">
            {chart === "pie" ? (
              <PieChart
                data={viewBy === "category" ? catTotals : srcTotals}
                activeIndex={activeIndex}
                onPieHover={onHover}
              />
            ) : (
              <BarChart
                data={
                  viewBy === "category"
                    ? dataTimeframe === "all"
                      ? catTotalsByYear
                      : dataTimeframe === "year"
                      ? catTotalsByMonth
                      : catTotals
                    : dataTimeframe === "all"
                    ? srcTotalsByYear
                    : dataTimeframe === "year"
                    ? srcTotalsByMonth
                    : srcTotals
                }
              />
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
              data={viewBy === "category" ? catTotals : srcTotals}
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
