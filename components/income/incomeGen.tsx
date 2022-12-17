// Import basics
import { FC, useEffect, useRef, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { addIncome, editIncome, selectIncome } from "../../redux/incomeSlice";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import { addItemToCatalog, selectCatalog } from "../../redux/catalogSlice";
import { capitalize } from "../../helpers/strings";
import { Currencies, IncomeType } from "../../models/Income";
import ErrorMessages from "../elements/misc/errorMessages";
import useErrMsgs from "../../hooks/useErrMsgs";
import SelectEntry from "../elements/input/form/selectEntry";
import BasicButton from "../elements/input/button/basicButton";
import TextEntry from "../elements/input/form/textEntry";
import { errString } from "../../helpers/errors";
import {
  defaultName,
  defaultAmount,
  defaultDate,
  defaultCurrency,
  defaultIncomeOption,
} from "../../helpers/forms";
import Spinner from "../elements/misc/spinner";

/*
oh, i just realized why selecting the incomes wasn't changing them in the edit window
because i deleted those categories/sources,
which means i need a way to handle that

one way would be, whenever catalog entries are deleted, scan through their 
associated documents for ones with those sources and set them to a default
that way when one is deleted, clicking on the income that had it would 
still change it in the edit window since theres a coresponding option
same goes for editing, changing a source should update all relevant incomes with the new one

means a lot of backend work,
i guess another way to do it would be, if an income is ...
oh, no
that'd be dumb, if the user just deleted those, and clicking them just recreates them
that'd be frustrating
so solution 1 it is
before doing that though i'll make a page to view and delete/edit catalog options

*/

const IncomeGen: FC = () => {
  // Get component props and setup
  const dispatch = useReduxDispatch();
  const { incomeId, incomes, incomeMode, incomeLoading } =
    useReduxSelector(selectIncome);
  const { catalog, catalogLoading } = useReduxSelector(selectCatalog);
  const { errMsgs, setErrMsgs } = useErrMsgs();
  const [selectedIncome, setSelectedIncome] = useState<IncomeType | undefined>(
    incomes.find((inc) => inc._id === incomeId)
  );

  // Handle option creation
  const newCategoryOption = useRef<string>("");
  const newSourceOption = useRef<string>("");
  const defaultOption = (field: "source" | "category", income?: IncomeType) => {
    return defaultIncomeOption({
      income,
      catalog,
      field,
      mode: incomeMode,
    });
  };
  const setNewOption = (field: string, value: string) => {
    switch (field) {
      case "sources":
        newSourceOption.current = value;
        break;
      case "categories":
        newCategoryOption.current = value;
        break;
      default:
        break;
    }
  };
  const createOption = (field: string) => (query: string) => {
    setNewOption(field, query);
    try {
      dispatch(
        addItemToCatalog({
          section: "income",
          field,
          item: query,
        })
      );
    } catch (e) {
      setNewOption(field, "");
      setErrMsgs([...errMsgs, errString(e)]);
    }
    return { value: query, label: query };
  };

  // Set initial form values to their defaults
  const [name, setName] = useState<string>(
    defaultName(incomeMode, selectedIncome)
  );
  const [amount, setAmount] = useState<string>(
    defaultAmount(incomeMode, selectedIncome)
  );
  const [currency, setCurrency] = useState<Currencies>(
    defaultCurrency(incomeMode, selectedIncome)
  );
  const [date, setDate] = useState<string>(
    defaultDate(incomeMode, selectedIncome)
  );
  const [source, setSource] = useState<string>(
    defaultIncomeOption({
      income: selectedIncome,
      catalog,
      field: "source",
      mode: incomeMode,
    })
  );
  const [category, setCategory] = useState<string>(
    defaultIncomeOption({
      income: selectedIncome,
      catalog,
      field: "category",
      mode: incomeMode,
    })
  );

  // Change input values when a new income is selected
  useEffect(() => {
    if (incomeMode === "editing") {
      const newSelection = incomes.find(
        (inc: IncomeType) => inc._id === incomeId
      );
      console.log(newSelection);
      setSelectedIncome(newSelection);
      setName(defaultName(incomeMode, newSelection));
      setAmount(defaultAmount(incomeMode, newSelection));
      setCurrency(defaultCurrency(incomeMode, newSelection));
      setDate(defaultDate(incomeMode, newSelection));
      setSource(defaultOption("source", newSelection).toLowerCase());
      setCategory(defaultOption("category", newSelection).toLowerCase());
    }
  }, [incomes, incomeId, incomeMode]);

  // Set options on initial load and creation
  useEffect(() => {
    // Set default if the field is empty or to the new option if there was one
    newSourceOption.current === ""
      ? !source && setSource(defaultOption("source"))
      : setSource(newSourceOption.current);
    newCategoryOption.current === ""
      ? !category && setCategory(defaultOption("category"))
      : setCategory(newCategoryOption.current);
    // Reset all the creation options
    newSourceOption.current = "";
    newCategoryOption.current = "";
  }, [catalog]);

  // Clear options when add is selected
  useEffect(() => {
    if (incomeMode === "adding") {
      setName(defaultName(incomeMode));
      setAmount(defaultAmount(incomeMode));
      setCurrency(defaultCurrency(incomeMode));
      setDate(defaultDate(incomeMode));
      setSource(defaultOption("source"));
      setCategory(defaultOption("category"));
    }
  }, [incomeMode]);

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
    incomeMode === "editing"
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
          createOption={createOption("sources")}
          loading={catalogLoading}
          options={
            catalog?.income?.sources.map((src) => ({
              value: src,
              label: capitalize(src),
            })) ?? []
          }
          className="mb-2"
        />

        <SelectEntry
          label="Category:"
          name="category"
          value={category}
          onChange={setCategory}
          createOption={createOption("categories")}
          loading={catalogLoading}
          options={
            catalog?.income?.categories.map((cat) => ({
              value: cat,
              label: capitalize(cat),
            })) ?? []
          }
          className="mb-2"
        />
        <ErrorMessages errors={errMsgs} />
        {incomeLoading ? (
          <Spinner />
        ) : (
          <BasicButton
            type="submit"
            disabled={catalogLoading || !amount}
            label="Save"
            className={`w-28 self-center ${errMsgs && "mt-2"}`}
            icon={<AiOutlineSave />}
            color={"green"}
          />
        )}
      </div>
    </form>
  );
};

export default IncomeGen;
