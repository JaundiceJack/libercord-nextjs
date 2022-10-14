import { FC } from "react";
import Header, { HeaderProps } from "./header";

type DetailWindowProps = HeaderProps & {
  content: any;
  className?: string;
};

const DetailWindow: FC<DetailWindowProps> = ({
  header,
  icon,
  year,
  prev,
  next,
  content,
  className,
}) => {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <Header header={header} icon={icon} year={year} next={next} prev={prev} />

      <div
        style={{ minHeight: 500 + "px" }}
        className="grow h-full flex mb-8 p-2 rounded-b-lg bg-content "
      >
        {content}
      </div>
    </div>
  );
};

export default DetailWindow;
