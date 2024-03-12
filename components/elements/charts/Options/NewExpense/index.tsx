import { FC, useEffect, useState } from "react";
import {
  defaultAmount,
  defaultCurrency,
  defaultDate,
  defaultName,
  defaultOption,
} from "../../../../../helpers/defaults/fields";
import { capitalize } from "../../../../../helpers/strings";
import { invalidEntries } from "../../../../../helpers/validation/expense";
import { useExpenseCategory } from "../../../../../hooks/selections/useExpenseCategory";
import { useLocation } from "../../../../../hooks/selections/useLocation";
import useErrMsgs from "../../../../../hooks/useErrMsgs";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import type { ExpenseType } from "../../../../../models/Expense";
import type { Currencies } from "../../../../../models/types";
import { getInitialCatalog, selectCatalog } from "../../../../../redux/catalog";
import { addExpense, selectExpense } from "../../../../../redux/expense";
import ErrorMessages from "../../../../elements/misc/errorMessages";
import BasicButton from "../../../input/button/BasicButton";
import Creatable from "../../../input/form/Creatable";
import TextEntry from "../../../input/form/Text";
import Loading from "../../../misc/loading";

const NewExpense: FC = () => {
  const dispatch = useReduxDispatch();

  const { expenses, expenseLoading } = useReduxSelector(selectExpense);
  const { catalog, catalogLoading } = useReduxSelector(selectCatalog);

  const { errMsgs, setErrMsgs } = useErrMsgs();

  const [name, setName] = useState(defaultName());
  const [amount, setAmount] = useState(defaultAmount());
  const [date, setDate] = useState(defaultDate());
  const [currency, setCurrency] = useState<Currencies>(defaultCurrency());
  const { location, setLocation } = useLocation({ catalog });
  const { category, setCategory } = useExpenseCategory({
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

    dispatch(getInitialCatalog());
  }, [expenses]);

  // Submit entries
  const submitEntries = () => {
    // SIDENOTE: an input date requires this to add hours from GMT for the
    // current timezone. Excluding it can cause the date to save a day off.
    const timezoneDate = date.replace(/-/g, "/").replace(/T.+/, "");
    const expense = {
      name,
      category: category ? category : "",
      location: location ? location : "",
      amount: Number(amount),
      date: new Date(timezoneDate),
      currency,
    } as ExpenseType;
    dispatch(addExpense({ expense }));
  };

  // Validate and submit new or edited expense
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Remove this and just create them in the backend
    // if (!catalog?.expense?.locations?.includes(location.trim().toLowerCase()))
    //   createLocation(location);
    // if (!catalog?.expense?.categories?.includes(category.trim().toLowerCase()))
    //   createCategory(category);

    !invalidEntries({ setErrMsgs, errMsgs, location, category, amount }) &&
      submitEntries();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <TextEntry
        label="Amount:"
        name="amount"
        value={amount || ""}
        onChange={(e) => setAmount(e.currentTarget.value)}
        className="mb-4"
        autoFocus={true}
      />

      <TextEntry
        label="Date:"
        type="date"
        name="date"
        value={date}
        onChange={(e) => setDate(e.currentTarget.value)}
        className="mb-4"
      />

      <Creatable
        label="Location:"
        name="location"
        value={location}
        onTextEntry={(e) => setLocation(e.currentTarget.value)}
        catalog={catalog}
        catalogField="locations"
        catalogSection="expense"
        catalogLoading={catalogLoading}
        setValue={setLocation}
        loading={catalogLoading}
        className="mb-4"
        options={
          catalog?.expense?.locations.map((src) => ({
            value: src,
            label: capitalize(src),
          })) ?? []
        }
      />

      <Creatable
        label="Category:"
        name="category"
        value={category}
        onTextEntry={(e) => setCategory(e.currentTarget.value)}
        catalog={catalog}
        catalogField="categories"
        catalogSection="expense"
        catalogLoading={catalogLoading}
        setValue={setCategory}
        loading={catalogLoading}
        className="mb-6"
        options={
          catalog?.expense?.categories.map((cat) => ({
            value: cat,
            label: capitalize(cat),
          })) ?? []
        }
      />

      {errMsgs.length ? (
        <ErrorMessages errors={errMsgs} />
      ) : expenseLoading ? (
        <Loading />
      ) : (
        <BasicButton
          type="submit"
          disabled={catalogLoading}
          label="Save"
          className={`w-full col-span-2`}
          color={"green"}
        />
      )}
    </form>
  );
};

export default NewExpense;
