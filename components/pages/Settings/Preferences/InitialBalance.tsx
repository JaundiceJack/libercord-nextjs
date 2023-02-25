import { FC, FormEvent, useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import {
  editPreferences,
  selectPreferences,
} from "../../../../redux/preferences";
import BareButton from "../../../elements/input/button/BareButton";
import BorderButton from "../../../elements/input/button/BorderButton";
import NumberEntry from "../../../elements/input/form/Number";

const InitialBalance: FC = () => {
  const dispatch = useReduxDispatch();
  const { initialSavings, useNegativeExpenses } =
    useReduxSelector(selectPreferences);
  const [newSavings, setNewSavings] = useState<string | undefined>(
    initialSavings.toString()
  );

  return (
    <div className="flex flex-col p-3 mb-4">
      <div className="bg-slate-800 mb-4 p-2 flex justify-center text-lg font-semibold text-white rounded-lg">
        {" "}
        Balance Options
      </div>
      <div className="flex flex-row items-center mb-4">
        <NumberEntry
          label="Initial Balance:"
          value={newSavings}
          name="newSavings"
          labelWidth="auto"
          inputWidth="1fr"
          className="mr-2"
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setNewSavings(e.currentTarget.value)
          }
        />
        <BareButton
          className="w-28 h-8"
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
    </div>
  );
};

export default InitialBalance;
