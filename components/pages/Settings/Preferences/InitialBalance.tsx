import { FC, FormEvent, useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import {
  editPreferences,
  selectPreferences,
} from "../../../../redux/preferences";
import BareButton from "../../../elements/input/button/BareButton";
import BorderButton from "../../../elements/input/button/BorderButton";
import TextEntry from "../../../elements/input/form/Text";
import BasicButton from "../../../elements/input/button/BasicButton";
import GroupBox from "../../../elements/containers/GroupBox";

const InitialBalance: FC = () => {
  const dispatch = useReduxDispatch();
  const { initialSavings, useNegativeExpenses } =
    useReduxSelector(selectPreferences);
  const [newSavings, setNewSavings] = useState<string | undefined>(
    initialSavings.toString()
  );

  return (
    <GroupBox title="Balance Options">
      <div className="flex flex-row items-center mb-4">
        <TextEntry
          label="Initial Balance:"
          shortLabel="Initial:"
          value={newSavings}
          name="newSavings"
          className="mr-2 mb-2"
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setNewSavings(e.currentTarget.value)
          }
        />
        <BasicButton
          className="w-28 ml-2"
          label="Submit"
          color="green"
          onClick={() =>
            dispatch(
              editPreferences({
                updates: { initialSavings: Number(newSavings) },
              })
            )
          }
        />
      </div>
      <div className="flex flex-row items-center">
        <p className="text-white">Subtract Expenses?</p>
        <BorderButton
          color="green"
          onClick={() =>
            dispatch(
              editPreferences({ updates: { useNegativeExpenses: true } })
            )
          }
          name="Yes"
          selected={useNegativeExpenses === true}
        />
        <BorderButton
          color="green"
          onClick={() =>
            dispatch(
              editPreferences({ updates: { useNegativeExpenses: false } })
            )
          }
          name="No"
          selected={useNegativeExpenses === false}
        />
      </div>
    </GroupBox>
  );
};

export default InitialBalance;
