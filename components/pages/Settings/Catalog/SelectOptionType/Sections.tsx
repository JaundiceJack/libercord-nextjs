import { FC } from "react";
import BorderButton from "../../../../elements/input/button/BorderButton";
import type { OptionSectionProps } from "../types";

const OptionSection: FC<OptionSectionProps> = ({ selected, setSection }) => {
  return (
    <div
      style={{
        background: `linear-gradient(180deg, #202030, #303040)`,
      }}
      className="w-full flex justify-center"
    >
      <BorderButton
        name="income"
        selected={selected === "income"}
        onClick={() => setSection("income")}
        color="orange"
      />
      <BorderButton
        name="expense"
        selected={selected === "expense"}
        onClick={() => setSection("expense")}
        color="orange"
      />
      {/* VERSION_2: <BorderButton
        name="asset"
        selected={selected === "asset"}
        onClick={() => setSection("asset")}
        color="orange"
      />
      <BorderButton
        name="debt"
        selected={selected === "debt"}
        onClick={() => setSection("debt")}
        color="orange"
      /> */}
    </div>
  );
};

export default OptionSection;
