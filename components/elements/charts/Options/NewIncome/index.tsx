import { FC, useEffect, useState } from "react";
import {
  defaultAmount,
  defaultCurrency,
  defaultDate,
  defaultName,
  defaultOption,
} from "../../../../../helpers/defaults/fields";
import { capitalize } from "../../../../../helpers/strings";
import { invalidEntries } from "../../../../../helpers/validation/income";
import { useIncomeCategory } from "../../../../../hooks/selections/useIncomeCategory";
import { useSource } from "../../../../../hooks/selections/useSource";
import useErrMsgs from "../../../../../hooks/useErrMsgs";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import type { IncomeType } from "../../../../../models/Income";
import type { Currencies } from "../../../../../models/types";
import { selectCatalog } from "../../../../../redux/catalog";
import { addIncome, selectIncome } from "../../../../../redux/income";
import ErrorMessages from "../../../../elements/misc/errorMessages";
import BasicButton from "../../../input/button/BasicButton";
import Creatable from "../../../input/form/Creatable";
import TextEntry from "../../../input/form/Text";
import Loading from "../../../misc/loading";

const NewIncome: FC = () => {
  const dispatch = useReduxDispatch();

  const { incomes, incomeLoading } = useReduxSelector(selectIncome);
  const { catalog, catalogLoading } = useReduxSelector(selectCatalog);

  const { errMsgs, setErrMsgs } = useErrMsgs();

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
    setCategory(defaultOption("incomeCategory", catalog).toLowerCase());
  }, [incomes]);

  // Submit entries
  const submitEntries = () => {
    // SIDENOTE: an input date requires this to add hours from GMT for the
    // current timezone. Excluding it can cause the date to save a day off.
    const timezoneDate = date.replace(/-/g, "/").replace(/T.+/, "");
    const income = {
      name,
      category: category ? category : "",
      source: source ? source : "",
      amount: Number(amount),
      date: new Date(timezoneDate),
      currency,
    } as IncomeType;
    dispatch(addIncome({ income }));
  };

  // Validate and submit new or edited income
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!catalog?.income?.sources?.includes(source.trim().toLowerCase()))
      createSource(source);
    if (!catalog?.income?.categories?.includes(category.trim().toLowerCase()))
      createCategory(category);

    !invalidEntries({ setErrMsgs, errMsgs, source, category, amount }) &&
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
        label="Source:"
        name="source"
        catalog={catalog}
        catalogField="source"
        catalogSection="income"
        catalogLoading={catalogLoading}
        value={source}
        setValue={setSource}
        onTextEntry={(e) => setSource(e.currentTarget.value)}
        loading={catalogLoading}
        className="mb-4"
        options={
          catalog?.income?.sources.map((src) => ({
            value: src,
            label: capitalize(src),
          })) ?? []
        }
      />

      <Creatable
        label="Category:"
        name="category"
        value={category}
        setValue={setCategory}
        catalog={catalog}
        catalogField="incomeCategory"
        catalogSection="income"
        catalogLoading={catalogLoading}
        onTextEntry={(e) => setCategory(e.currentTarget.value)}
        loading={catalogLoading}
        className="mb-6"
        options={
          catalog?.income?.categories.map((cat) => ({
            value: cat,
            label: capitalize(cat),
          })) ?? []
        }
      />

      {errMsgs.length ? (
        <ErrorMessages errors={errMsgs} />
      ) : incomeLoading ? (
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

export default NewIncome;
