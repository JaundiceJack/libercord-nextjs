import { FC } from "react";
import Link from "next/link";

interface LinkButtonProps {
  href: string;
  label: string;
  color: string;
  className?: string;
}

const LinkButton: FC<LinkButtonProps> = ({ href, label, color, className }) => {
  return (
    <div className={`h-12 flex items-end ${className}`}>
      <Link href={href}>
        <div
          className={`cursor-pointer py-2 px-6 rounded-lg border-b-4 transform 
        duration-150 hover:border-b-0 focus:outline-none hover:text-white bg-button-${color}`}
        >
          <p className="whitespace-nowrap font-jose font-semibold">{label}</p>
        </div>
      </Link>
    </div>
  );
};

export default LinkButton;
