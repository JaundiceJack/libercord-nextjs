import { FC, useEffect, useState } from "react";
import { addExpense, selectExpense } from "../../../../../redux/expenseSlice";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { selectCatalog } from "../../../../../redux/catalogSlice";
import type { ExpenseType } from "../../../../../models/Expense";
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
} from "../../../../../helpers/defaults/fields";
import { useCreateOptions } from "../../../../../helpers/defaults/selects";
import { invalidEntries } from "../../../../../helpers/validation/expense";

const AddExpense: FC<ToggleProps> = ({ opened, toggle }) => {
  const dispatch = useReduxDispatch();

  const { expenseLoading } = useReduxSelector(selectExpense);
  const { catalog, catalogLoading } = useReduxSelector(selectCatalog);

  const { errMsgs, setErrMsgs } = useErrMsgs();
  const { width: screenWidth, height } = useWindowSize();
  const {
    newCategoryOption,
    newLocationOption,
    defaultOption,
    createExpenseOption,
  } = useCreateOptions();

  const [name, setName] = useState(defaultName());
  const [amount, setAmount] = useState(defaultAmount());
  const [date, setDate] = useState(defaultDate());
  const [currency, setCurrency] = useState<Currencies>(defaultCurrency());
  const [location, setLocation] = useState(defaultOption("location"));
  const [category, setCategory] = useState(defaultOption("expenseCategory"));

  // Set options on initial load and creation
  useEffect(() => {
    // Set default if the field is empty or to the new option if there was one
    newLocationOption.current === ""
      ? !location && setLocation(defaultOption("location"))
      : setLocation(newLocationOption.current);
    newCategoryOption.current === ""
      ? !category && setCategory(defaultOption("expenseCategory"))
      : setCategory(newCategoryOption.current);
    // Reset all the creation options
    newLocationOption.current = "";
    newCategoryOption.current = "";
  }, [catalog]);

  // Submit entries
  const submitEntries = () => {
    // SIDENOTE: an input date requires this to add hours from GMT for the
    // current timezone. Excluding it can cause the date to save a day off.
    const timezoneDate = date.replace(/-/g, "/").replace(/T.+/, "");
    const expense: ExpenseType = {
      name,
      category: category ? category : "",
      location: location ? location : "",
      amount: Number(amount),
      date: new Date(timezoneDate),
      currency,
    };
    dispatch(addExpense({ expense }));
    toggle();
  };

  // Validate and submit new or edited expense
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    !invalidEntries({ setErrMsgs, errMsgs, location, category, amount }) &&
      submitEntries();
  };

  return (
    <Modal title="Add a New Expense" opened={opened} toggle={toggle}>
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
          label="Location:"
          name="location"
          value={location}
          onChange={setLocation}
          createOption={createExpenseOption("locations")}
          loading={catalogLoading}
          className="col-span-2"
          labelWidth="6rem"
          inputWidth="1fr"
          options={
            catalog?.expense?.locations.map((src) => ({
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
          createOption={createExpenseOption("categories")}
          loading={catalogLoading}
          className="col-span-2 mb-4"
          labelWidth="6rem"
          inputWidth="1fr"
          options={
            catalog?.expense?.categories.map((cat) => ({
              value: cat,
              label: capitalize(cat),
            })) ?? []
          }
        />
        <ErrorMessages errors={errMsgs} />
        {expenseLoading ? (
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

export default AddExpense;
