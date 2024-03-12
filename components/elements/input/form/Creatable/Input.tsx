import { FC, RefObject, useEffect, useMemo, useRef, useState } from "react";

interface InputProps {
  showInput: boolean;
  name: string;
  value: string;
  onFocus: () => void;
  onBlur: () => void;
  onTextEntry: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  element: RefObject<HTMLInputElement>;
}

const Input: FC<InputProps> = ({
  showInput,
  name,
  value,
  onFocus,
  onBlur,
  onTextEntry,
  placeholder,
  autoFocus,
  required,
  element,
}) => {
  return (
    <div
      className={`flex items-center justify-center h-10 relative transform duration-300 ease-in-out ${
        showInput ? "w-full opacity-100" : "w-0 opacity-0"
      } group-hover:w-full group-hover:opacity-100 group-hover:block border-b-2 border-blue-base`}
    >
      <input
        className={`w-full h-full p-2 removeInputOutline`}
        type="text"
        ref={element}
        name={name}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onTextEntry}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default Input;
