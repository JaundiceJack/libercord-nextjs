import React, { FC } from "react";
import { Modal } from "@mantine/core";

interface ModalProps {
  title?: string;
  opened: boolean;
  toggle: () => void;
  showClose?: boolean;
  children?: React.ReactNode;
}

const ModalWindow: FC<ModalProps> = ({
  title,
  opened = false,
  toggle,
  showClose = true,
  children,
}) => {
  return (
    <>
      <Modal opened={opened} onClose={toggle} title={title}>
        {children}
        {showClose === true && (
          <button
            className={`w-full mt-4 p-2 rounded-md bg-red-400 
        transform duration-150 hover:scale-101 font-semibold 
        font-jose`}
            onClick={toggle}
          >
            Close
          </button>
        )}
      </Modal>
    </>
  );
};

export default ModalWindow;
