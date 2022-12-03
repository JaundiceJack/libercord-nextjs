import { FC, useState } from "react";
import { GiReceiveMoney } from "react-icons/gi";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import {
  selectDate,
  incrementYear,
  decrementYear,
} from "../../redux/dateSlice";
import WindowContainer from "../elements/containers/windowContainer";
import DetailWindow from "../elements/containers/detailWindow";
import IncomeInput from "./incomeInput";
import IncomeGraph from "./incomeGraph";
import IncomeTable from "./incomeTable";

const IncomeContent: FC = () => {
  const [currentDisplay, setCurrentDisplay] = useState<boolean>(true);
  const toggleDisplay = () => setCurrentDisplay(!currentDisplay);
  const dispatch = useReduxDispatch();
  const { date } = useReduxSelector(selectDate);

  return (
    <WindowContainer>
      <IncomeInput />
      <DetailWindow
        header="Income"
        icon={<GiReceiveMoney />}
        year={date.getFullYear()}
        next={() => dispatch(incrementYear())}
        prev={() => dispatch(decrementYear())}
        toggle={toggleDisplay}
        current={currentDisplay}
      >
        {currentDisplay ? <IncomeTable /> : <IncomeGraph />}
      </DetailWindow>
    </WindowContainer>
  );
};

export default IncomeContent;
