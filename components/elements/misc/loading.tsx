import { FC } from "react";
import LoadingCSS from "../../../styles/Loading.module.css";

interface LoadingProps {
  className?: string;
}

const Loading: FC<LoadingProps> = ({ className }) => {
  return (
    <div className={`mx-auto ${LoadingCSS.container} ${className}`}>
      <div className={`${LoadingCSS.loader}`}>
        <span
          className={`${LoadingCSS.fixedOrb1} ${LoadingCSS.fixedOrb} ${LoadingCSS.orb}`}
        ></span>
        <span
          className={`${LoadingCSS.fixedOrb2} ${LoadingCSS.fixedOrb} ${LoadingCSS.orb}`}
        ></span>
        <span className={`${LoadingCSS.movingOrb} ${LoadingCSS.orb}`}></span>
      </div>
      <svg className={`${LoadingCSS.svg}`}>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation={4} />
          <feColorMatrix
            values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 20 -10"
          />
        </filter>
      </svg>
    </div>
  );
};

export default Loading;
