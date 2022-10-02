import { FC } from "react";

interface BasicButtonProps {
  label: string;
  color: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

const BasicButton: FC<BasicButtonProps> = ({
  label,
  color,
  type = "button",
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-12 flex items-end ${className}`}
    >
      <div
        className={`cursor-pointer py-2 px-6 rounded-lg border-b-4 transform 
        duration-150 hover:border-b-0 focus:outline-none hover:text-white 
        w-full z-50 bg-button-${color}`}
      >
        <p className="whitespace-nowrap font-jose font-semibold">{label}</p>
      </div>
    </button>
  );
};

export default BasicButton;
