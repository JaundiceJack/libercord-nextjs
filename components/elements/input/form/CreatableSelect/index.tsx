import Select from "../Select";
import TextEntry from "../Text";
import { FC, useEffect, useMemo, useState } from "react";
import { CreatableSelect, SelectOption } from "../types";
import BasicButton from "../../button/BasicButton";
import { IoMdClose } from "react-icons/io";
import { capitalize } from "../../../../../helpers/strings";

// NOTE: I had the idea to set toggled to false if the user entered a value already in the list
// but that would cause similar starting values with spaces being unable to be entered.
// So, duplicates have to be handled higher up.
// goddammit
// i did that because it was a clever way to reset the form on submit since the value is reset higher up
// oh, since i'm adding an option, just hinge it on that

const CreatableSelect: FC<CreatableSelect> = ({
  label,
  shortLabel,
  value,
  name,
  loading = false,
  required = true,
  options = [],
  className,
  onChange,
  onTextEntry,
  setValue,
}) => {
  const [creatableData, setCreatableData] = useState<SelectOption[]>([]);
  const [toggled, setToggled] = useState(false);
  const [optionsLength, setOptionsLength] = useState(options.length);

  useEffect(() => {
    if (value === "new option") {
      setValue("");
      setToggled(true);
    }
  }, [value]);

  // Include the option allowing the user to enter a new value and untoggle when a new value is created
  useEffect(() => {
    if (options.findIndex((opt) => opt.value === "new option") === -1)
      setCreatableData([
        ...options,
        { value: "new option", label: `[+ Create a New ${capitalize(name)}]` },
      ]);
    if (optionsLength !== options.length) {
      setToggled(false);
      setOptionsLength(options.length);
    }
  }, [options]);

  useEffect(() => {
    if (!toggled) setValue(options?.at(0)?.value || "");
  }, [toggled]);

  return (
    <div className="flex flex-row">
      {toggled ? (
        <TextEntry
          label={label}
          shortLabel={shortLabel}
          value={value}
          name={name}
          required={required}
          className={className}
          onChange={onTextEntry}
          autoFocus={true}
        />
      ) : (
        <Select
          label={label}
          shortLabel={shortLabel}
          value={value}
          name={name}
          loading={loading}
          required={required}
          options={creatableData}
          className={className}
          onChange={onChange}
        />
      )}

      {toggled && (
        <BasicButton
          color="red"
          icon={<IoMdClose />}
          className="w-10 ml-2"
          onClick={() => {
            setValue(options?.at(0)?.value || "");
            setToggled(false);
          }}
        />
      )}
    </div>
  );
};

export default CreatableSelect;
