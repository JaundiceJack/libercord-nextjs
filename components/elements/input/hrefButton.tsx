import { FC } from "react";

interface HrefButtonProps {
  label: string;
  icon?: any;
  color: string;
  href: string;
  className?: string;
}

const HrefButton: FC<HrefButtonProps> = ({
  label,
  icon,
  color,
  href,
  className,
}) => {
  return (
    <a href={href} className={`h-12 flex items-end ${className}`}>
      <div
        className={`flex flex-row justify-center cursor-pointer py-2 px-6 rounded-lg border-b-4 transform 
        duration-150 hover:border-b-0 focus:outline-none text-gray-900 hover:text-black 
        w-full z-50 bg-button-${color}`}
      >
        {icon && icon}
        <p
          className={`whitespace-nowrap font-jose font-semibold ${
            icon && "ml-3"
          }`}
        >
          {label}
        </p>
      </div>
    </a>
  );
};

export default HrefButton;
