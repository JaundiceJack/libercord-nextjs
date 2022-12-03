// Import basics
import { FC, useEffect, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { addIncome, editIncome, selectIncome } from "../../redux/incomeSlice";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import { selectCatalog } from "../../redux/catalogSlice";
import { formatDateForInput } from "../../helpers/dates";
import { capitalize } from "../../helpers/strings";
import { Currencies, IncomeType } from "../../models/Income";
import ErrorMessages from "../elements/misc/errorMessages";
import useErrMsgs from "../../hooks/useErrMsgs";
import SelectEntry from "../elements/input/form/selectEntry";
import BasicButton from "../elements/input/button/basicButton";
import TextEntry from "../elements/input/form/textEntry";

interface IncomeGenProps {
  editing?: boolean;
}

const IncomeGen: FC<IncomeGenProps> = ({ editing }) => {
  // Get props from redux
  const dispatch = useReduxDispatch();
  const { incomeId, incomes, incomeMode, incomeLoading } =
    useReduxSelector(selectIncome);
  const { catalog, catalogLoading } = useReduxSelector(selectCatalog);

  // Set up error messages
  const { errMsgs, setErrMsgs } = useErrMsgs();

  // Set a state to hold the currently selected income for editing
  const [incomeUpdates, setIncomeUpdates] = useState(
    incomes.find((inc) => inc._id === incomeId)
  );

  // Provide defaults for each form value
  const defaultName = (inc: IncomeType | undefined) => {
    if (!inc) return "";
    else return editing ? (inc?.name ? inc.name : "") : "";
  };
  const defaultCategory = (inc: IncomeType | undefined) => {
    const fromCatalog = catalog?.income?.categories[0]
      ? catalog.income.categories[0]
      : "";
    if (!inc) return fromCatalog;
    else
      return editing
        ? inc?.category
          ? inc.category
          : fromCatalog
        : fromCatalog;
  };
  const defaultSource = (inc: IncomeType | undefined) => {
    const fromCatalog = catalog?.income?.sources[0]
      ? catalog.income.sources[0]
      : "";
    if (!inc) return fromCatalog;
    else
      return editing ? (inc?.source ? inc.source : fromCatalog) : fromCatalog;
  };
  const defaultAmount = (inc: IncomeType | undefined) => {
    if (!inc) return "";
    else return editing ? (inc?.amount ? inc.amount.toString() : "") : "";
  };
  const defaultDate = (inc: IncomeType | undefined) => {
    if (!inc) return formatDateForInput(new Date());
    else
      return editing
        ? inc?.date
          ? formatDateForInput(inc.date)
          : formatDateForInput(new Date())
        : formatDateForInput(new Date());
  };
  const defaultCurrency = (inc: IncomeType | undefined) => {
    if (!inc) return "$";
    else return editing ? (inc?.currency ? inc.currency : "$") : "$";
  };

  // Set form value states
  const [name, setName] = useState<string>(defaultName(incomeUpdates));
  const [category, setCategory] = useState<string | null>(
    defaultCategory(incomeUpdates)
  );
  const [source, setSource] = useState<string | null>(
    defaultSource(incomeUpdates)
  );
  const [amount, setAmount] = useState<string>(defaultAmount(incomeUpdates));
  const [date, setDate] = useState<string>(defaultDate(incomeUpdates));
  const [currency, setCurrency] = useState<Currencies>(
    defaultCurrency(incomeUpdates)
  );

  // Change input values when a new income is selected
  useEffect(() => {
    let selectedIncome = undefined;
    if (editing) {
      selectedIncome = incomes.find((inc: IncomeType) => inc._id === incomeId);
    }
    setIncomeUpdates(selectedIncome);
    setName(defaultName(selectedIncome));
    setCategory(defaultCategory(selectedIncome));
    setSource(defaultSource(selectedIncome));
    setAmount(defaultAmount(selectedIncome));
    setDate(defaultDate(selectedIncome));
    setCurrency(defaultCurrency(selectedIncome));
  }, [incomeId, incomeMode]);

  // Set options when they load
  useEffect(() => {
    if (!editing) {
      setSource(catalog ? catalog.income?.sources[0] : "");
      setCategory(catalog ? catalog.income?.categories[0] : "");
    }
  }, [catalog]);

  // Validate entries
  const invalidEntries = () => {
    let errFound = false;
    if (source === "") {
      errFound = true;
      setErrMsgs([...errMsgs, "Income source required."]);
    }
    if (category === "") {
      errFound = true;
      setErrMsgs([...errMsgs, "Income category required."]);
    }
    if (amount === "" || amount === null) {
      errFound = true;
      setErrMsgs([...errMsgs, "Income amount required."]);
    }
    if (isNaN(Number(amount))) {
      errFound = true;
      setErrMsgs([...errMsgs, "Income amount must be a number."]);
    }
    return errFound;
  };

  // Submit entries
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
    editing
      ? dispatch(editIncome({ incomeId, updates: income }))
      : dispatch(addIncome({ income }));
  };

  // Validate and submit new or edited income
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    !invalidEntries() && submitEntries();
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ minHeight: 230 + "px" }}
      className="p-4 bg-tab rounded-b-xl"
    >
      <div className="flex flex-col">
        <TextEntry
          label="Amount:"
          name="amount"
          value={amount || ""}
          onChange={(e) => setAmount(e.currentTarget.value)}
          className="mb-2"
        />

        <TextEntry
          type="date"
          label="Date:"
          name="date"
          value={date}
          onChange={(e) => setDate(e.currentTarget.value)}
          className="mb-2"
        />

        <SelectEntry
          label="Source:"
          name="source"
          value={source}
          onChange={setSource}
          loading={catalogLoading}
          options={
            catalog
              ? catalog?.income?.sources.map((src) => ({
                  label: capitalize(src),
                  value: src,
                }))
              : []
          }
          className="mb-2"
        />

        <SelectEntry
          label="Category:"
          name="category"
          value={category}
          onChange={setCategory}
          loading={catalogLoading}
          options={
            catalog
              ? catalog?.income?.categories.map((cat) => ({
                  label: capitalize(cat),
                  value: cat,
                }))
              : []
          }
          className="mb-2"
        />
        <ErrorMessages errors={errMsgs} />
        <BasicButton
          type="submit"
          disabled={catalogLoading || !amount}
          label="Save"
          className={`w-28 self-center ${errMsgs && "mt-2"}`}
          icon={<AiOutlineSave />}
          color={"green"}
        />
      </div>
    </form>
  );
};

export default IncomeGen;
