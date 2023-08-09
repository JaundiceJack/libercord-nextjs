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
      centeredSlides={true}
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 6500,
        disableOnInteraction: false,
      }}
      className="w-full h-full "
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
