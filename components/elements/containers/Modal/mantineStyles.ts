import { ModalStylesNames, CSSObject } from "@mantine/core";

export const modalStyles: Partial<Record<ModalStylesNames, CSSObject>> = {
  modal: {
    background: `radial-gradient(at top, #303039, #101019)`,
  },
  title: {
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Josefin Sans",
    fontWeight: 600,
    fontSize: 20,
    color: "white",
  },
};
