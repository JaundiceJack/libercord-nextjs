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
        <div
          style={{
            position: "fixed",
            height: "100vh",
            width: "100vh",
            overflow: "hidden",
            zIndex: "-1",
            filter: "blur(3px)",
          }}
        >
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={100}
          />
        </div>
      )}
      <div className="p-12 h-full flex flex-col items-center justify-center">
        <div className="relative">
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              background: "#444",
              opacity: "85%",
              zIndex: "-1",
              borderRadius: "20px",
              borderWidth: "6px",
              borderColor: "transparent",
              boxShadow: "0 0 10px 10px #444",
            }}
          />
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
