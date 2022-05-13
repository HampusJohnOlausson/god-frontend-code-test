import React, { FC } from "react";
import { IconButton } from "vcc-ui";
import { CarModel } from "../Types/Car";

interface NextOrPrevProps {
  currentPage: number;
  firstPage: number;
  lastPage: number;
  itemsPerPage: number;
  cars: CarModel[];
  setCars: (cars: CarModel[]) => void;
  setCurrentPage: (currentPage: number) => void;
}
const NextOrPrev: FC<NextOrPrevProps> = ({
  firstPage,
  currentPage,
  itemsPerPage,
  cars,
  lastPage,
  setCars,
  setCurrentPage,
}) => {
  const handleNextPageCall = () => {
    const nextEndIndex = (currentPage + 1) * itemsPerPage;
    setCurrentPage(currentPage + 1);
    if (cars.length < nextEndIndex) {
      setCars(cars);
    }
  };
  const handlePrevPageCall = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="arrowContainer">
      <div className="arrow">
        <IconButton
          iconName={"navigation-chevronback"}
          onClick={handlePrevPageCall}
          variant="outline"
          disabled={currentPage === firstPage}
        ></IconButton>
      </div>
      <IconButton
        iconName={"navigation-chevronforward"}
        onClick={handleNextPageCall}
        variant="outline"
        disabled={currentPage === lastPage}
      ></IconButton>
    </div>
  );
};

export default NextOrPrev;
