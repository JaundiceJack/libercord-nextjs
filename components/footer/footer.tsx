import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className={`flex items-center justify-center h-10 z-50`}>
      <a
        href="https://www.legidev.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p
          className={`text-gray-200 font-semibold font-mont cursor-pointer 
          transform duration-150 hover:scale-105`}
        >
          Developed by LegiDev
        </p>
      </a>
    </footer>
  );
};

export default Footer;
