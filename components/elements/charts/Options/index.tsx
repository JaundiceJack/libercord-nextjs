import { FC } from "react";
import { capitalize } from "../../../../helpers/strings";
import usePath from "../../../../hooks/usePath";
import BgCSS from "../../../../styles/Background.module.css";
import CatalogOption from "./CatalogOption";
import ChartOption from "./ChartOption";
import NegateExpensesOption from "./NegateExpensesOption";
import Title from "./Title";

const Options: FC = () => {
  const { recordPath: dataType } = usePath();
  return (
    <div className={`flex flex-col w-full h-full ${BgCSS.sidebar}`}>
      <Title title={capitalize(dataType)} />
      <ChartOption />
      <CatalogOption />
      <NegateExpensesOption />
    </div>
  );
};

export default Options;
