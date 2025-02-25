import { FC, useEffect, useState } from "react";
import {
  defaultAmount,
  defaultCurrency,
  defaultDate,
  defaultName,
  defaultOption,
} from "../../../../../helpers/defaults/fields";
import { capitalize } from "../../../../../helpers/strings";
// import { invalidEntries } from "../../../../../helpers/validation/asset";
import { useAssetAccount } from "../../../../../hooks/selections/useAssetAccount";
import { useSource } from "../../../../../hooks/selections/useSource";
import useErrMsgs from "../../../../../hooks/useErrMsgs";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import type { AssetType } from "../../../../../models/Asset";
import { TaxStatus, type Currencies } from "../../../../../models/types";
import { selectCatalog } from "../../../../../redux/catalog";
import { addAsset, selectAsset } from "../../../../../redux/asset";
import ErrorMessages from "../../../../elements/misc/errorMessages";
import BasicButton from "../../../input/button/BasicButton";
import Creatable from "../../../input/form/Creatable";
import TextEntry from "../../../input/form/Text";
import Loading from "../../../misc/loading";
import { invalidEntries } from "../../../../../helpers/validation/asset";
import SelectEntry from "../../../input/form/Select";
import NumberEntry from "../../../input/form/Number";
import { selectTickers } from "../../../../../redux/tickers";
import tickerData from "../../../../../public/tickerData.json";

const NewAsset: FC = () => {
  const dispatch = useReduxDispatch();

  const { assets, assetLoading } = useReduxSelector(selectAsset);
  const { catalog, catalogLoading } = useReduxSelector(selectCatalog);
  const [ticker, setTicker] = useState("");

  const [tickerList, setTickerList] = useState<
    { symbol: string; name: string }[]
  >([]);

  useEffect(() => {
    setTickerList(
      tickerData.map((data) => ({ symbol: data.symbol, name: data.name }))
    );
  }, []);

  const { errMsgs, setErrMsgs } = useErrMsgs();

  const categories = [
    { name: "401k", yield: false },
    { name: "annuity", yield: false },
    { name: "artwork", yield: false },
    { name: "bond (corporate)", yield: true },
    { name: "bond (government)", yield: true },
    { name: "bond (municipal)", yield: true },
    { name: "certificate of deposit (cd)", yield: true },
    { name: "collectible", yield: false },
    { name: "commodity", yield: false },
    { name: "cryptocurrency", yield: false },
    { name: "debenture", yield: true },
    { name: "endowment", yield: false },
    { name: "equipment", yield: false },
    { name: "exchange traded fund (etf)", yield: false },
    { name: "future", yield: false },
    { name: "index fund", yield: false },
    { name: "livestock", yield: false },
    { name: "mortgage backed security (mbs)", yield: true },
    { name: "mutual fund", yield: false },
    { name: "non-fungible token (nft)", yield: false },
    { name: "option (call)", yield: false },
    { name: "option (put)", yield: false },
    { name: "precious metal", yield: false },
    { name: "real-estate (commercial)", yield: false },
    { name: "real-estate (land)", yield: false },
    { name: "real-estate (residential)", yield: false },
    { name: "real-estate inventory trust (reit)", yield: false },
    { name: "real-estate mutual fund", yield: false },
    { name: "stock (with dividend)", yield: true },
    { name: "stock", yield: false },
    { name: "trust", yield: false },
  ];

  const { account, setAccount } = useAssetAccount({ catalog });
  const [category, setCategory] = useState(categories[0].name);
  const [unitsPurchased, setUnitsPurchased] = useState(""); // number
  const [taxStatus, setTaxStatus] = useState<TaxStatus>("exempt");
  const [riskLevel, setRiskLevel] = useState("0");
  const [notes, setNotes] = useState("");

  // Time-of-Purchase values
  const [costBasis, setCostBasis] = useState("");
  const [averagePurchasePrice, setAveragePurchasePrice] = useState("");
  const [totalAmountPaid, setTotalAmountPaid] = useState("");
  const [totalFees, setTotalFees] = useState("");
  const [currency, setCurrency] = useState("");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  // only show the fields for these if the asset category allows for it (which means i need predefined ones instead of maybe creatable ones)
  const [maturityDate, setMaturityDate] = useState("");
  const [yieldRate, setYieldRate] = useState("");

  // Clear entries after submission
  useEffect(() => {
    // setName(defaultName());
    // setAmount(defaultAmount());
    // setCurrency(defaultCurrency());
    // setDate(defaultDate()); don't reset date, annoying to set it each time
    // setSource(defaultOption("source", catalog).toLowerCase());
    setAccount(defaultOption("assetAccount", catalog).toLocaleLowerCase());
    setCategory(categories[0].name.toLowerCase());
  }, [assets]);

  // Submit entries
  const submitEntries = () => {
    // SIDENOTE: an input date requires this to add hours from GMT for the
    // current timezone. Excluding it can cause the date to save a day off.
    //const timezoneDate = date.replace(/-/g, "/").replace(/T.+/, "");

    const asset = {
      account,
      category,
      ticker,
      unitsPurchased: Number(unitsPurchased),
      taxStatus,
      riskLevel: Number(riskLevel),
      notes,
      costBasis,
      averagePurchasePrice,
      totalAmountPaid,
      totalFees,
      currency,
      date: new Date(),
      country,
      region,
      maturityDate: new Date(),
      yieldRate: Number(yieldRate),
    };
    dispatch(addAsset({ asset }));
  };

  // Validate and submit new or edited asset
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Remove this and just create the account in the backend
    // if (!catalog?.asset?.accounts?.includes(account.trim().toLowerCase()))
    //   createAccount(account);

    !invalidEntries({ setErrMsgs, errMsgs, category, unitsPurchased }) &&
      submitEntries();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <Creatable
        label="Account"
        name="account"
        catalog={catalog}
        catalogSection="asset"
        catalogField="accounts"
        catalogLoading={catalogLoading}
        value={account}
        setValue={setAccount}
        onTextEntry={(e) => setAccount(e.currentTarget.value)}
        loading={catalogLoading}
        className="mb-6"
        options={
          catalog?.asset?.accounts?.map((acct) => ({
            value: acct,
            label: capitalize(acct),
          })) ?? []
        }
      />

      <Creatable
        label="Ticker"
        name="ticker"
        value={ticker}
        isSearchableOnly={true}
        setValue={setTicker}
        onTextEntry={(e) => setTicker(e.currentTarget.value)}
        loading={false}
        className="mb-6"
        options={
          tickerList?.map((tick) => ({
            value: tick.symbol,
            label: tick.symbol,
            aliases: [tick.name],
          })) ?? []
        }
      />

      <SelectEntry
        label="Category:"
        name="category"
        value={category}
        onChange={(e) => setCategory(e.currentTarget.value)}
        loading={false}
        className="mb-6"
        options={categories.map((cat) => ({
          value: cat.name,
          label: capitalize(cat.name),
        }))}
      />

      {categories
        .filter((cat) => cat.yield)
        .map((cat) => cat.name)
        .includes(category) && (
        <TextEntry
          label="Yield"
          name="yieldRate"
          value={yieldRate}
          onChange={(e) => setYieldRate(e.currentTarget.value)}
          className="mb-4"
        />
      )}

      <TextEntry
        label="Units Purchased:"
        shortLabel="Units:"
        name="unitsPurchased"
        value={unitsPurchased || ""}
        onChange={(e) => setUnitsPurchased(e.currentTarget.value)}
        className="mb-4"
      />

      <TextEntry
        label="Date:"
        type="date"
        name="date"
        value={date}
        onChange={(e) => setDate(e.currentTarget.value)}
        className="mb-4"
      />

      {errMsgs.length ? (
        <ErrorMessages errors={errMsgs} />
      ) : assetLoading ? (
        <Loading />
      ) : (
        <BasicButton
          type="submit"
          disabled={false}
          label="Save"
          className={`w-full col-span-2`}
          color={"green"}
        />
      )}
    </form>
  );
};

export default NewAsset;
