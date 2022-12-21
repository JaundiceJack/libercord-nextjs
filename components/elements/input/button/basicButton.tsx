import React, { FC } from "react";
// import { ImBlocked } from 'react-icons/im' // Idea is to replace the disabled visual with this icon

interface BasicButtonProps {
  label?: string;
  title?: string;
  icon?: React.ReactNode;
  color: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const BasicButton: FC<BasicButtonProps> = ({
  label,
  title,
  icon,
  color,
  type = "button",
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-end h-10 ${className}`}
      disabled={disabled}
      title={title}
    >
      <div
        className={`flex flex-row justify-center cursor-pointer p-2 
        rounded-lg transform duration-150 hover:border-b-0 focus:outline-none 
        text-gray-900 hover:text-black w-full z-50 
        bg-button-${color} ${disabled ? "" : "border-b-4"} `}
      >
        {icon && icon}
        <p
          className={`whitespace-nowrap font-jose font-semibold ${
            icon && label && "ml-3"
          }`}
        >
          {label}
        </p>
      </div>
    </button>
  );
};

export default BasicButton;
