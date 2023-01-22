import { FC } from "react";

interface CatalogToggleProps {
  toggleView: () => void;
  currentView: string;
}

const CatalogToggle: FC<CatalogToggleProps> = ({ toggleView, currentView }) => {
  return (
    <button
      onClick={toggleView}
      className={`my-5 py-2 w-full md:w-56 cursor-pointer bg-gray-700 md:rounded-l-full 
      font-jose text-white font-semibold group`}
    >
      <p className="transform duration-150 group-hover:scale-103">{`View by ${
        currentView === "source" ? "category" : "source"
      }`}</p>
    </button>
  );
};

export default CatalogToggle;
