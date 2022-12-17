import React, { FC } from "react";

interface ToggleButtonProps {
  title?: string;
  icon1?: React.ReactNode;
  icon2?: React.ReactNode;
  color1: string;
  color2?: string;
  toggleState: boolean;
  toggleFunc: () => void;
  className?: string;
  disabled?: boolean;
}

const ToggleButton: FC<ToggleButtonProps> = ({
  title,
  icon1,
  icon2,
  color1,
  color2 = "green",
  toggleState,
  toggleFunc,
  className,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={toggleFunc}
      className={`flex items-end ${className}`}
      disabled={disabled}
      title={title}
    >
      <div
        className={`relative flex flex-row justify-center cursor-pointer p-2 
        rounded-lg transform duration-150 hover:border-b-0 focus:outline-none 
        text-gray-900 hover:text-black w-full z-50 
        bg-button-${toggleState ? color1 : color2} ${
          disabled ? "" : "border-b-4"
        } `}
      >
        <div className="transform scale-110">
          {icon1 && toggleState && icon1}
          {icon2 && !toggleState && icon2}
        </div>

        <div className="absolute right-0 bottom-0 transform scale-50">
          {icon1 && !toggleState && icon1}
          {icon2 && toggleState && icon2}
        </div>
      </div>
    </button>
  );
};

export default ToggleButton;
