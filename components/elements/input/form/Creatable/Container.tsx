import { FC, RefObject, useEffect, useMemo, useRef, useState } from "react";

interface ContainerProps {
  mouseInDropDown: boolean;
  showDropDown: boolean;
  setShowDropDown: (val: boolean) => void;
  setShowInput: (val: boolean) => void;
  onHover: () => void;
  onExit: () => void;
  element: RefObject<HTMLInputElement>;
  children?: any;
  className?: string;
}

const Container: FC<ContainerProps> = ({
  mouseInDropDown,
  showDropDown,
  setShowDropDown,
  onHover,
  onExit,
  setShowInput,
  element,
  children,
  className,
}) => {
  return (
    <div
      onBlur={() => {
        !mouseInDropDown && setShowDropDown(false);
      }}
      onMouseEnter={onHover}
      onMouseLeave={onExit}
      onClick={() => {
        setShowInput(true);
        setShowDropDown(!showDropDown);
        element?.current?.focus();
        element?.current?.select();
      }}
      className={`flex items-center justify-center w-full h-10 relative group rounded-md text-white ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
