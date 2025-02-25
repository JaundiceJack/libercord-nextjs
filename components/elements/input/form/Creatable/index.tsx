import { FC, useEffect, useMemo, useRef, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { errString } from "../../../../../helpers/errors";
import useErrMsgs from "../../../../../hooks/useErrMsgs";
import { useReduxDispatch } from "../../../../../hooks/useRedux";
import { addItemToCatalog } from "../../../../../redux/catalog";
import DropDown from "./DropDown";
import Input from "./Input";
import Label from "./Label";
import Container from "./Container";
import { CreatableProps } from "./types";
import Spinner from "../../../misc/spinner";
import ErrorMessages from "../../../misc/errorMessages";
import { capitalize } from "../../../../../helpers/strings";
import { ca } from "date-fns/locale";

// 1. filter results as they're typed
// 2. include a last option that when clicked creates the option
// 3. only extend dropdown as far as there are options

const Creatable: FC<CreatableProps> = ({
  catalog,
  catalogSection,
  catalogField,
  catalogLoading,
  value,
  setValue,
  defaultValue, // the value on the currently selected item
  name,
  onTextEntry,
  isSearchableOnly = false,
  label,
  options,
  shortLabel,
  placeholder,
  autoFocus = false,
  className,
  required,
}) => {
  // useEffect(() => {
  //   console.log("catalog", catalog);
  //   console.log(`${name} value`, value);
  //   console.log("isDirty", isDirty);
  // }, [catalog, value]);

  // Hooks
  const dispatch = useReduxDispatch();
  const { errMsgs, setErrMsgs } = useErrMsgs();

  // States
  const [showInput, setShowInput] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mouseInDropDown, setMouseInDropDown] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const element = useRef<HTMLInputElement>(null);

  // Functions
  const onFocus = () => setShowInput(true);
  const onBlur = () => !value && setShowInput(false);
  const onHover = () => setHovered(true);
  const onExit = () => setTimeout(() => setHovered(false), 150);
  const createOption = (query: string) => {
    if (catalogSection && catalogField) {
      try {
        dispatch(
          addItemToCatalog({
            section: catalogSection,
            field: catalogField,
            item: query,
          })
        );
      } catch (e) {
        setValue("");
        setErrMsgs([...errMsgs, errString(e)]);
      }
    }
  };

  // Memoized values
  const sortedData = useMemo(
    () =>
      options
        ?.filter((opt) => {
          if (
            isDirty ||
            !options.find((o) => o.value === value.trim().toLowerCase())
          ) {
            const regex = new RegExp(value.replace("\\", ""), "i");
            return (
              regex.test(opt.value) || opt.aliases?.some((o) => regex.test(o))
            );
          } else {
            return true;
          }
        })
        .sort((a, b) => {
          const first = typeof a === "string" ? a : a.label || "";
          const second = typeof b === "string" ? b : b.label || "";
          return first > second ? 1 : -1;
        }),
    [options, value]
  );

  // UseEffects
  // Set the default value if it exists
  useEffect(() => {
    if (catalogSection && catalogField) {
      const catalogList = catalog?.[catalogSection]?.[catalogField];
      const defaultOption = defaultValue ?? catalogList?.[0];
      const selectedValue = catalogList?.find(
        (cat) => cat === value.toLowerCase()
      );
      value === "" || defaultValue
        ? setValue(capitalize(defaultOption ?? ""))
        : setValue(capitalize(selectedValue ?? defaultOption ?? ""));
    }
  }, [catalog, defaultValue]);
  // Ensure the input is shown if data is already present
  useEffect(() => {
    value !== "" && setShowInput(true);
  }, [value]);
  // Close the dropdown on esc press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) =>
      event.key === "Escape" ? setShowDropDown(false) : null;
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return catalogLoading ? (
    <Spinner />
  ) : (
    <>
      <Container
        mouseInDropDown={mouseInDropDown}
        showDropDown={showDropDown}
        setShowDropDown={setShowDropDown}
        setShowInput={setShowInput}
        onHover={onHover}
        onExit={onExit}
        element={element}
        className={className}
      >
        <Label
          showInput={showInput}
          hovered={hovered}
          shortLabel={shortLabel}
          label={label}
        />
        <Input
          showInput={showInput}
          name={name}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onTextEntry={(e: React.FormEvent<HTMLInputElement>) => {
            onTextEntry(e);
            !isDirty && setIsDirty(true);
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          required={required}
          element={element}
        />
        <MdKeyboardArrowRight
          className={`absolute right-3 transform duration-150 pointer-events-none ${
            showDropDown ? "rotate-90" : "rotate-0"
          }`}
        />
        <DropDown
          setMouseInDropDown={setMouseInDropDown}
          showDropDown={showDropDown}
          value={value}
          setValue={setValue}
          sortedData={sortedData ?? []}
          createOption={createOption}
          isSearchableOnly={isSearchableOnly}
        />
      </Container>

      {errMsgs.length > 0 && <ErrorMessages errors={errMsgs} />}
    </>
  );
};

export default Creatable;
