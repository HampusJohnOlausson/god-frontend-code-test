import React, { FC, useEffect, useState } from "react";

interface DotProps {
  defaultDot: number;
  numberOfDots: number;
  onClick: (dot: number) => void;
}
const Dotlist: FC<DotProps> = ({ onClick, defaultDot, numberOfDots }) => {
  const [activeDot, setActiveDot] = useState(defaultDot);

  let dotList: Number[] = [];
  for (let i = 0; numberOfDots > i; i++) {
    dotList.push(i);
  }

  useEffect(() => {
    setActiveDot(defaultDot);
  }, [defaultDot]);

  return (
    <ul className="dotList">
      {dotList.map((_, index) => (
        <li
          onClick={() => {
            onClick(index);
            setActiveDot(index);
          }}
          key={index}
          className={index === activeDot ? "dot active" : "dot"}
        ></li>
      ))}
    </ul>
  );
};

export default Dotlist;
