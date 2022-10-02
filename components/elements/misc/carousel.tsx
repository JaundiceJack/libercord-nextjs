import { FC, ReactNode } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface CarouselProps {
  slides: ReactNode[];
}
const Carousel: FC<CarouselProps> = ({ slides }) => {
  const carouselColor = { "--swiper-theme-color": "rgb(253 224 71)" };

  return (
    <Swiper
      modules={[Pagination, Autoplay, EffectFade]}
      effect="fade"
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 6500,
        disableOnInteraction: false,
      }}
      className="w-full h-full"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      style={carouselColor}
    >
      {slides.map((slide, index) => {
        return <SwiperSlide key={index}>{slide}</SwiperSlide>;
      })}
    </Swiper>
  );
};

export default Carousel;

/*
import { FC } from "react";
// Swiper version: 6.8.4
import SwiperCore, { A11y, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([A11y, Pagination, Autoplay]);

interface CarouselFace {
  featureCards: Array<JSX.Element>;
  className?: string;
  style?: object;
}

const Carousel: FC<CarouselFace> = ({ featureCards, className, style }) => {
  return (
    <div
      className={`rounded-lg container-bg-dark px-2 py-4 flex ${className}`}
      style={style}
    >
      <Swiper
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        slidesPerView={1}
        style={{}}
      >
        {featureCards.map((feature, index) => (
          <SwiperSlide virtualIndex={index} key={index}>
            {feature}
          </SwiperSlide>
        ))}
        <div className="swiper-pagination" />
      </Swiper>
    </div>
  );
};

export default Carousel;
*/
