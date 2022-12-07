import React, { FC } from "react";
import { Modal } from "@mantine/core";

interface ModalProps {
  title: string;
  opened: boolean;
  toggle: () => void;
  children?: React.ReactNode;
}

const ModalWindow: FC<ModalProps> = ({
  title,
  opened = false,
  toggle,
  children,
}) => {
  return (
    <>
      <Modal opened={opened} onClose={toggle} title={title}>
        {children}
        <button
          className={`w-full mt-4 p-2 rounded-md bg-green-400 
          transform duration-150 hover:scale-101 font-semibold 
          font-jose`}
          onClick={toggle}
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default ModalWindow;
