import React, { FC } from "react";

export interface TabProps {
  label?: string;
  icon?: React.ReactNode;
  active: boolean;
  side: "left" | "middle" | "right";
  toggle: () => void;
  className?: string;
  disabled?: boolean;
}

const Tab: FC<TabProps> = ({
  label,
  icon,
  active,
  side,
  toggle,
  className,
  disabled = false,
}) => {
  return (
    <button
      onClick={toggle}
      disabled={disabled}
      className={`flex items-center justify-center w-full h-12 px-6 py-2 ${
        side === "left" && active
          ? "bg-tab-left-active rounded-tl-xl"
          : side === "left"
          ? "bg-tab-left rounded-tl-xl "
          : side === "middle" && active
          ? "bg-tab-middle-active"
          : side === "middle"
          ? "bg-tab-middle"
          : side === "right" && active
          ? "bg-tab-right-active rounded-tr-xl"
          : "bg-tab-right rounded-tr-xl"
      } ${active && "border-t border-yellow-500"} ${disabled && "opacity-75"}
      ${className}`}
    >
      <p className={`font-semibold font-jose text-white whitespace-wrap`}>
        {label}
        {icon}
      </p>
    </button>
  );
};

export default Tab;
