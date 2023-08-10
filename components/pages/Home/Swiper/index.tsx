import { FC } from "react";
import Carousel from "../../../elements/misc/carousel";
import CarouselItem from "../../../elements/misc/carouselItem";
import { GiScales, GiPiggyBank } from "react-icons/gi";
import { AiOutlineLineChart } from "react-icons/ai";

const Swiper: FC = () => {
  const slides = [
    <CarouselItem
      header="Balance Spending"
      text="Enter your daily expenses and income to see exactly where your money is going."
      icon={<GiScales size="40px" />}
      image="/images/coins.jpg"
      key={0}
    />,
    <CarouselItem
      header="Track Savings"
      text="See exactly how much you're saving (or losing) each month, and what you can cut back on to save more."
      icon={<GiPiggyBank size="40px" />}
      image="/images/bitcoin.jpg"
      key={1}
    />,
    <CarouselItem
      header="Chart Progress"
      text="Get a visualization of how you're doing each month and year with financial summary charts."
      icon={<AiOutlineLineChart size="40px" />}
      image="/images/chart.jpg"
      key={2}
    />,
    <CarouselItem
      header="Grow Your Savings"
      text="The best way to grow your money is to know your money."
      icon={<AiOutlineLineChart size="40px" />}
      image="/images/plant.jpg"
      key={2}
    />,
  ];

  return <Carousel slides={slides} />;
};

export default Swiper;
