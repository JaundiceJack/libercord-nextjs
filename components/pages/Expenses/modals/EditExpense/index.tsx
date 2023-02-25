import { FC, useEffect, useState } from "react";
import { editExpense, selectExpense } from "../../../../../redux/expense";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { selectCatalog } from "../../../../../redux/catalog";
import type { ExpenseType } from "../../../../../models/Expense";
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
  defaultOption,
} from "../../../../../helpers/defaults/fields";
import { invalidEntries } from "../../../../../helpers/validation/expense";
import { useLocation } from "../../../../../hooks/selections/useLocation";
import { useExpenseCategory } from "../../../../../hooks/selections/useExpenseCategory";

const EditExpense: FC<ToggleProps> = ({ opened, toggle }) => {
  const dispatch = useReduxDispatch();

  const { expenseId, expenses, expenseLoading } =
    useReduxSelector(selectExpense);
  const { catalog, catalogLoading } = useReduxSelector(selectCatalog);

  const { errMsgs, setErrMsgs } = useErrMsgs();
  const { width: screenWidth, height } = useWindowSize();

  const [selected, setSelected] = useState<ExpenseType | undefined>();

  const [name, setName] = useState(defaultName(selected));
  const [amount, setAmount] = useState(defaultAmount(selected));
  const [date, setDate] = useState(defaultDate(selected));
  const [currency, setCurrency] = useState<Currencies>(
    defaultCurrency(selected)
  );
  const { location, setLocation, createLocation } = useLocation({
    catalog,
    selected,
  });
  const { category, setCategory, createCategory } = useExpenseCategory({
    catalog,
    selected,
  });

  // Update the selected expense if the data or selected id change
  useEffect(() => {
    setSelected(expenses.find((exp) => exp._id === expenseId));
  }, [expenses, expenseId]);

  // Change input values when a new expense is selected
  useEffect(() => {
    const newSelection = expenses.find(
      (exp: ExpenseType) => exp._id === expenseId
    );
    setSelected(newSelection);
    setName(defaultName(newSelection));
    setAmount(defaultAmount(newSelection));
    setCurrency(defaultCurrency(newSelection));
    setDate(defaultDate(newSelection));
    setLocation(defaultOption("location", catalog, newSelection).toLowerCase());
    setCategory(
      defaultOption("expenseCategory", catalog, newSelection).toLowerCase()
    );
  }, [expenses, expenseId]);

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
    dispatch(
      editExpense({ expenseId: selected?._id ?? null, updates: expense })
    );
    errMsgs.length === 0 && toggle();
  };

  // Validate and submit new or edited expense
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    !invalidEntries({ setErrMsgs, errMsgs, location, category, amount }) &&
      submitEntries();
  };

  return (
    <Modal title="Edit Selected Expense" opened={opened} toggle={toggle}>
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
            label="Save Updates"
            className={`w-full col-span-2`}
            color={"green"}
          />
        )}
      </form>
    </Modal>
  );
};

export default EditExpense;
