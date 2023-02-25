import { FC } from "react";
import BorderButton from "../../../../elements/input/button/BorderButton";
import type { OptionFieldProps } from "../types";

const OptionField: FC<OptionFieldProps> = ({ section, selected, setField }) => {
  return (
    <div
      style={{
        background: `linear-gradient(180deg, #252535, #353545)`,
      }}
      className="w-full flex justify-evenly"
    >
      {section === "income" ? (
        <BorderButton
          name="source"
          selected={selected === "source"}
          onClick={() => setField("source")}
          color="green"
        />
      ) : (
        section === "expense" && (
          <BorderButton
            name="location"
            selected={selected === "location"}
            onClick={() => setField("location")}
            color="green"
          />
        )
      )}
      <BorderButton
        name="category"
        selected={selected === "category"}
        onClick={() => setField("category")}
        color="green"
      />
    </div>
  );
};

export default OptionField;
