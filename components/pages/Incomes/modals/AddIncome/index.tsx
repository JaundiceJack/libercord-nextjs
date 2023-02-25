import { FC, useEffect, useState } from "react";
import { addIncome, selectIncome } from "../../../../../redux/income";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { selectCatalog } from "../../../../../redux/catalog";
import type { IncomeType } from "../../../../../models/Income";
import type { Currencies } from "../../../../../models/types";
import type { ToggleProps } from "../../../../elements/containers/Modal/types";
import Modal from "../../../../elements/containers/Modal";
import ErrorMessages from "../../../../elements/misc/errorMessages";
import useErrMsgs from "../../../../../hooks/useErrMsgs";
import SelectEntry from "../../../../elements/input/form/Select";
import BareButton from "../../../../elements/input/button/BareButton";
import Spinner from "../../../../elements/misc/spinner";
import NumberEntry from "../../../../elements/input/form/Number";
import DateEntry from "../../../../elements/input/form/Date";
import { useWindowSize } from "../../../../../hooks/useWindowSize";
import { capitalize } from "../../../../../helpers/strings";
import {
  defaultName,
  defaultAmount,
  defaultDate,
  defaultCurrency,
  defaultOption,
} from "../../../../../helpers/defaults/fields";
import { invalidEntries } from "../../../../../helpers/validation/income";
import { useSource } from "../../../../../hooks/selections/useSource";
import { useIncomeCategory } from "../../../../../hooks/selections/useIncomeCategory";

const AddIncome: FC<ToggleProps> = ({ opened, toggle }) => {
  const dispatch = useReduxDispatch();

  const { incomes, incomeLoading } = useReduxSelector(selectIncome);
  const { catalog, catalogLoading } = useReduxSelector(selectCatalog);

  const { errMsgs, setErrMsgs } = useErrMsgs();
  const { width: screenWidth, height } = useWindowSize();

  const [name, setName] = useState(defaultName());
  const [amount, setAmount] = useState(defaultAmount());
  const [date, setDate] = useState(defaultDate());
  const [currency, setCurrency] = useState<Currencies>(defaultCurrency());
  const { source, setSource, createSource } = useSource({ catalog });
  const { category, setCategory, createCategory } = useIncomeCategory({
    catalog,
  });

  // Clear entries afer submission
  useEffect(() => {
    setName(defaultName());
    setAmount(defaultAmount());
    setCurrency(defaultCurrency());
    //setDate(defaultDate()); don't reset date, annoying to set it each time
    setSource(defaultOption("source", catalog).toLowerCase());
    setCategory(defaultOption("expenseCategory", catalog).toLowerCase());
  }, [incomes]);

  // Submit entries
  const submitEntries = () => {
    // SIDENOTE: an input date requires this to add hours from GMT for the
    // current timezone. Excluding it can cause the date to save a day off.
    const timezoneDate = date.replace(/-/g, "/").replace(/T.+/, "");
    const income: IncomeType = {
      name,
      category: category || "",
      source: source || "",
      amount: Number(amount),
      date: new Date(timezoneDate),
      currency,
    };
    dispatch(addIncome({ income }));
    errMsgs.length === 0 && toggle();
  };

  // Validate and submit new or edited income
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    !invalidEntries({ setErrMsgs, errMsgs, source, category, amount }) &&
      submitEntries();
  };

  return (
    <Modal title="Add a New Income" opened={opened} toggle={toggle}>
      <form onSubmit={onSubmit} className="grid grid-cols-2 gap-2">
        <NumberEntry
          label="Amount:"
          name="amount"
          value={amount || ""}
          onChange={(e) => setAmount(e.currentTarget.value)}
          className="col-span-2 lg:col-span-1"
          labelWidth="6rem"
          inputWidth="auto"
        />

        <DateEntry
          label="Date:"
          name="date"
          value={date}
          onChange={(e) => setDate(e.currentTarget.value)}
          className="col-span-2 lg:col-span-1"
          labelWidth={screenWidth && screenWidth < 1024 ? "6rem" : "auto"}
          inputWidth="auto"
        />

        <SelectEntry
          label="Source:"
          name="source"
          value={source}
          onChange={setSource}
          createOption={createSource}
          loading={catalogLoading}
          className="col-span-2"
          labelWidth="6rem"
          inputWidth="1fr"
          options={
            catalog?.income?.sources.map((src) => ({
              value: src,
              label: capitalize(src),
            })) ?? []
          }
        />

        <SelectEntry
          label="Category:"
          name="category"
          value={category}
          onChange={setCategory}
          createOption={createCategory}
          loading={catalogLoading}
          className="col-span-2 mb-4"
          labelWidth="6rem"
          inputWidth="1fr"
          options={
            catalog?.income?.categories.map((cat) => ({
              value: cat,
              label: capitalize(cat),
            })) ?? []
          }
        />
        <ErrorMessages errors={errMsgs} />
        {incomeLoading ? (
          <Spinner />
        ) : (
          <BareButton
            type="submit"
            disabled={catalogLoading || !amount}
            label="Save"
            className={`w-full col-span-2`}
            color={"green"}
          />
        )}
      </form>
    </Modal>
  );
};

export default AddIncome;
