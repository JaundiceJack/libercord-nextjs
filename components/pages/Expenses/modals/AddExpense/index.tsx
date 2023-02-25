import { FC, useEffect, useState } from "react";
import { addExpense, selectExpense } from "../../../../../redux/expense";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { selectCatalog } from "../../../../../redux/catalog";
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
  defaultOption,
} from "../../../../../helpers/defaults/fields";
import { invalidEntries } from "../../../../../helpers/validation/expense";
import { useLocation } from "../../../../../hooks/selections/useLocation";
import { useExpenseCategory } from "../../../../../hooks/selections/useExpenseCategory";

const AddExpense: FC<ToggleProps> = ({ opened, toggle }) => {
  const dispatch = useReduxDispatch();

  const { expenses, expenseLoading } = useReduxSelector(selectExpense);
  const { catalog, catalogLoading } = useReduxSelector(selectCatalog);

  const { errMsgs, setErrMsgs } = useErrMsgs();
  const { width: screenWidth, height } = useWindowSize();

  const [name, setName] = useState(defaultName());
  const [amount, setAmount] = useState(defaultAmount());
  const [date, setDate] = useState(defaultDate());
  const [currency, setCurrency] = useState<Currencies>(defaultCurrency());
  const { location, setLocation, createLocation } = useLocation({ catalog });
  const { category, setCategory, createCategory } = useExpenseCategory({
    catalog,
  });

  // Clear entries afer submission
  useEffect(() => {
    setName(defaultName());
    setAmount(defaultAmount());
    setCurrency(defaultCurrency());
    //setDate(defaultDate()); don't reset date, annoying to set it each time
    setLocation(defaultOption("location", catalog).toLowerCase());
    setCategory(defaultOption("expenseCategory", catalog).toLowerCase());
  }, [expenses]);

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
    errMsgs.length === 0 && toggle();
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
          autoFocus={true}
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
          createOption={createLocation}
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
          createOption={createCategory}
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
