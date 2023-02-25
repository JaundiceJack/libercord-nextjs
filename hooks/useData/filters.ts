import { isSameMonth, isSameYear } from "date-fns";
import { TradeType } from "../../models/types";
import { Timeframe } from "../../redux/types";

// Limit trade data to the currently selected dataTimeframe
export const filterByTimeframe =
  ({ date, dataTimeframe }: { date: Date; dataTimeframe: Timeframe }) =>
  (trade: TradeType, index: number) => {
    const tradeDate = new Date(trade.date);
    return dataTimeframe === "year"
      ? isSameYear(tradeDate, date)
      : dataTimeframe === "month"
      ? isSameMonth(tradeDate, date)
      : true;
  };
