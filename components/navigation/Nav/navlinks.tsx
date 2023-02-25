import { BsGearFill } from "react-icons/bs";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { IoWalletOutline } from "react-icons/io5";
import NavLink from "./navlink";

const NavLinks = () => {
  interface LinkFace {
    path: string;
    label: string;
    icon: any;
    color: string;
  }

  const links: Array<LinkFace> = [
    {
      path: "records/summary",
      label: "summary",
      icon: <IoWalletOutline size="30" />,
      color: "blue",
    },
    {
      path: "records/income",
      label: "income",
      icon: <GiReceiveMoney size="30" />,
      color: "green",
    },
    {
      path: "records/expenses",
      label: "expenses",
      icon: <GiPayMoney size="30" />,
      color: "indigo",
    },
    {
      path: "settings",
      label: "settings",
      icon: <BsGearFill size="30" />,
      color: "yellow",
    },
    //{
    //path: '/records/assets',
    //label: 'assets',
    //icon: <AiOutlineLineChart size="30" color="rgb(39, 39, 42)" />,
    //color: 'yellow' },
    //{
    //path: '/records/debts',
    //label: 'debts',
    //icon: <GiImprisoned size="30" color="rgb(39, 39, 42)" />,
    //color: 'red' },
  ];

  return (
    <div className="flex flex-row sm:flex-col ">
      {links.map((link, index) => (
        <NavLink
          key={index}
          path={`/${link.path}`}
          label={link.label}
          color={link.color}
          icon={link.icon}
        />
      ))}
    </div>
  );
};

export default NavLinks;
