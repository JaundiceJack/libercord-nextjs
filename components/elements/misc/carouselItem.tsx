import { FC } from "react";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";

interface CarouselItemProps {
  header: string;
  text: string;
  icon: JSX.Element;
  image?: string;
  className?: string;
}

const CarouselItem: FC<CarouselItemProps> = ({
  header,
  text,
  icon,
  image,
  className,
}) => {
  return (
    <div
      className={`flex flex-col w-full h-full mx-auto 
      ${className}`}
    >
      {image && (
        <div className="bg-image-wrap">
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            objectPosition="-50px 0px"
            quality={100}
          />
        </div>
      )}
      <div className="p-12 h-full flex flex-col items-center justify-center">
        <div className="relative">
          <div className="bg-swiper-item w-full h-full" />
          <div className="px-8 py-14 rounded-xl">
            <div className={`flex flex-row justify-center mb-2`}>
              <p className={`text-yellow-400 mr-2 shadow-lg`}>{icon}</p>
              <h2
                className={`self-end font-bold font-jose text-transparent bg-clip-text 
              bg-gradient-to-b from-yellow-200 to-yellow-500 text-xl`}
              >
                {header}
              </h2>
            </div>
            <p className="font-semibold font-jose text-gray-200 text-md">
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
