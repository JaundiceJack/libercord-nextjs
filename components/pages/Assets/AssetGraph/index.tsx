import { FC, useEffect, useState } from "react";
import { capitalize, months } from "../../../../helpers/strings";
import useChartData from "../../../../hooks/useData/useChartData";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import { selectDate } from "../../../../redux/date";
import { selectAsset, setAssetChartType } from "../../../../redux/asset";
import { selectPreferences } from "../../../../redux/preferences";
import BarChart from "../../../elements/charts/Bar";
import Legend from "../../../elements/charts/Legend";
import LineChart from "../../../elements/charts/Line";
import Options from "../../../elements/charts/Options";
import PieChart from "../../../elements/charts/Pie";
import RadarChart from "../../../elements/charts/Radar";
import type { Datum } from "../../../elements/charts/types";
import ContentWindow from "../../../elements/containers/ContentWindow";
import GraphBox from "../../../elements/containers/GraphBox";
import GraphContainer from "../../../elements/containers/GraphContainer";
import GraphLegendBox from "../../../elements/containers/GraphLegendBox";
import GraphOptionsBox from "../../../elements/containers/GraphOptionsBox";
import EmptyListMessage from "../../../elements/misc/emptyListMessage";

const AssetGraph: FC = () => {
  const { assets, assetViewBy, assetChartType } = useReduxSelector(selectAsset);
  const { date, dataTimeframe } = useReduxSelector(selectDate);
  const { defaultAssetChartType } = useReduxSelector(selectPreferences);
  const [activeIndex, setActiveIndex] = useState(0);
  const onHover = (data: Datum | null, index: number) => {
    setActiveIndex(index);
  };

  //   const {
  //     assetYearlyData: yearData,
  //     assetMonthlyData: monthData,
  //     assetLocationData: locationData,
  //     assetCategoryData: categoryData,
  //   } = useChartData();

  //   const barData =
  //     dataTimeframe === "all"
  //       ? yearData
  //       : dataTimeframe === "year"
  //       ? monthData
  //       : assetViewBy === "category"
  //       ? categoryData
  //       : locationData;

  //   const pieData = assetViewBy === "category" ? categoryData : locationData;

  //   const legendData =
  //     assetChartType === "pie" || assetChartType === "radar"
  //       ? assetViewBy === "category"
  //         ? categoryData
  //         : locationData
  //       : dataTimeframe === "all"
  //       ? yearData
  //       : dataTimeframe === "year"
  //       ? monthData
  //       : assetViewBy === "category"
  //       ? categoryData
  //       : locationData;

  const legendTitle =
    assetChartType === "pie" || assetChartType === "radar"
      ? assetViewBy === "category"
        ? "Assets Owned"
        : "Sources"
      : dataTimeframe === "all"
      ? "Years"
      : dataTimeframe === "year"
      ? date.getFullYear().toString()
      : capitalize(months[date.getMonth()]);

  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(setAssetChartType(defaultAssetChartType));
  }, []);

  return (
    <ContentWindow>
      <GraphContainer>
        <GraphOptionsBox>
          <Options />
        </GraphOptionsBox>
        <GraphBox>
          {assets.length === 0 && <EmptyListMessage listName="asset" />}
          {/* {assetChartType === "pie" ? (
              <PieChart
                data={pieData}
                activeIndex={activeIndex}
                onHover={onHover}
              />
            ) : assetChartType === "radar" ? (
              <RadarChart
                data={pieData}
                activeIndex={activeIndex}
                onHover={onHover}
              />
            ) : assetChartType === "line" ? (
              <LineChart
                data={barData}
                activeIndex={activeIndex}
                onHover={onHover}
              />
            ) : (
              <BarChart
                data={barData}
                activeIndex={activeIndex}
                onHover={onHover}
              />
            )} */}
        </GraphBox>
        <GraphLegendBox>
          <Legend
            title={legendTitle}
            data={[]}
            onHover={onHover}
            activeIndex={activeIndex}
          />
        </GraphLegendBox>
      </GraphContainer>
    </ContentWindow>
  );
};

export default AssetGraph;
