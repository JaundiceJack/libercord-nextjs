import { CSSObject, TextInputStylesNames } from "@mantine/core";

type MantineOptions = {
  elementType?: "select" | "date" | "number" | "text";
  labelColor: string;
  hasLabel: boolean;
  inputWidth?: string;
  labelWidth?: string;
};

export const mantineStyles = ({
  elementType,
  labelColor,
  hasLabel,
  inputWidth = "10rem",
  labelWidth = "max-content",
}: MantineOptions) => {
  const styles: Partial<Record<TextInputStylesNames, CSSObject>> = {
    label: {
      color: labelColor,
      fontSize: "18px",
      fontFamily: "Josefin Sans",
      fontWeight: 600,
      textAlign: "right",
      height: "100%",
      padding: "2px 8px 0 8px",
      background: "#334456",
      borderRadius: "8px 0 0 8px",
      boxShadow: "inset 0px 0px 3px 3px #223345",
    },
    input: { fontSize: "14px", borderRadius: hasLabel ? "0 8px 8px 0" : "8px" },
    required: { display: "none" },
    root: {
      display: "grid",
      gridTemplateColumns: hasLabel
        ? `${labelWidth} ${inputWidth}`
        : inputWidth,
      alignItems: "end",
    },
  };
  return styles;
};
