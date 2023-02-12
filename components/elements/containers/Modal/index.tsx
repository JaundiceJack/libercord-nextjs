import React, { FC } from "react";
import { Modal, ModalStylesNames, CSSObject } from "@mantine/core";
import BareButton from "../../input/button/BareButton";
import { modalStyles } from "./mantineStyles";
import { ModalProps } from "./types";

const ModalWindow: FC<ModalProps> = ({
  title,
  opened = false,
  toggle,
  showClose = true,
  children,
}) => (
  <Modal styles={modalStyles} opened={opened} onClose={toggle} title={title}>
    {children}
    {showClose === true && (
      <BareButton label="Close" onClick={toggle} color="red" className="mt-4" />
    )}
  </Modal>
);

export default ModalWindow;
