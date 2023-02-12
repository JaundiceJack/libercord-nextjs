import { FC, useEffect, useState } from "react";
import { editIncome, selectIncome } from "../../../../../redux/incomeSlice";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { selectCatalog } from "../../../../../redux/catalogSlice";
import type { IncomeType } from "../../../../../models/Income";
import type { Currencies } from "../../../../../models/types";
import type { ToggleProps } from "../../../../elements/containers/Modal/types";
import Modal from "../../../../elements/containers/Modal";
import useErrMsgs from "../../../../../hooks/useErrMsgs";
import ErrorMessages from "../../../../elements/misc/errorMessages";
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
} from "../../../../../helpers/defaults/fields";
import { useCreateOptions } from "../../../../../helpers/defaults/selects";
import { invalidEntries } from "../../../../../helpers/validation/income";

const EditIncome: FC<ToggleProps> = ({ opened, toggle }) => {
  const dispatch = useReduxDispatch();
  const { incomeId, incomes, incomeLoading } = useReduxSelector(selectIncome);
  const { catalog, catalogLoading } = useReduxSelector(selectCatalog);

  const { errMsgs, setErrMsgs } = useErrMsgs();
  const { width: screenWidth } = useWindowSize();
  const {
    newCategoryOption,
    newSourceOption,
    defaultOption,
    createIncomeOption,
  } = useCreateOptions();

  const [selected, setSelected] = useState<IncomeType | undefined>();

  const [name, setName] = useState(defaultName(selected));
  const [amount, setAmount] = useState(defaultAmount(selected));
  const [date, setDate] = useState(defaultDate(selected));
  const [source, setSource] = useState(defaultOption("source", selected));
  const [category, setCategory] = useState(
    defaultOption("incomeCategory", selected)
  );
  const [currency, setCurrency] = useState<Currencies>(
    defaultCurrency(selected)
  );

  // Update the selected income if the data or selected id change
  useEffect(() => {
    setSelected(incomes.find((inc) => inc._id === incomeId));
  }, [incomes, incomeId]);

  // Change input values when a new income is selected
  useEffect(() => {
    const newSelection = incomes.find(
      (inc: IncomeType) => inc._id === incomeId
    );
    setSelected(newSelection);
    setName(defaultName(newSelection));
    setAmount(defaultAmount(newSelection));
    setCurrency(defaultCurrency(newSelection));
    setDate(defaultDate(newSelection));
    setSource(defaultOption("source", newSelection).toLowerCase());
    setCategory(defaultOption("incomeCategory", newSelection).toLowerCase());
  }, [incomes, incomeId]);

  // Set options when the catalog is updated
  useEffect(() => {
    // Set default if the field is empty or to the new option if there was one
    newSourceOption.current === ""
      ? !source && setSource(defaultOption("source"))
      : setSource(newSourceOption.current);
    newCategoryOption.current === ""
      ? !category && setCategory(defaultOption("incomeCategory"))
      : setCategory(newCategoryOption.current);
    // Reset all the creation options
    newSourceOption.current = "";
    newCategoryOption.current = "";
  }, [catalog]);

  const submitEntries = () => {
    // SIDENOTE: an input date requires this to add hours from GMT for the
    // current timezone. Excluding it can cause the date to save a day off.
    const timezoneDate = date.replace(/-/g, "/").replace(/T.+/, "");
    const income: IncomeType = {
      name,
      category: category ? category : "",
      source: source ? source : "",
      amount: Number(amount),
      date: new Date(timezoneDate),
      currency,
    };
    dispatch(editIncome({ incomeId: selected?._id ?? null, updates: income }));
    toggle();
  };

  // Validate and submit new or edited income
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    !invalidEntries({ setErrMsgs, errMsgs, source, category, amount }) &&
      submitEntries();
  };

  return (
    <Modal title="Edit Selected Income" opened={opened} toggle={toggle}>
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
          createOption={createIncomeOption("sources")}
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
          createOption={createIncomeOption("categories")}
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
            label="Save Updates"
            className={`w-full col-span-2`}
            color={"green"}
          />
        )}
      </form>
    </Modal>
  );
};

export default EditIncome;
