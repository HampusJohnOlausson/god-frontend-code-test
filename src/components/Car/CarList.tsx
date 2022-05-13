import React, { FC, useEffect, useRef, useState } from "react";
import { View, TabNav, TabNavItem } from "vcc-ui";
import { BodyType, CarModel } from "../../Types/Car";
import CarItem from "./CarItem";
import Dotlist from "../Dotlist";
import ErrorView from "../ErrorView";
import NextOrPrev from "../NextOrPrev";
import FilterTab from "../FilterTab";

const CarList: FC = () => {
  const [cars, setCars] = useState<CarModel[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(0);
  const [currentDot, setCurrentDot] = useState<number>(0);
  const [onMobile, setOnMobile] = useState<boolean>();
  const [bodyType, setBodyType] = useState<BodyType>(
    BodyType.ALL
  );

  const firstPage = 1;
  const itemsPerPage = 4;
  const numberOfPages = cars.length / itemsPerPage;
  const startIndex = currentPage * 4 - itemsPerPage;
  const endIndex = startIndex + 4;
  const carObjects = cars?.slice(startIndex, endIndex);
  const listRef = useRef<HTMLDivElement>(null);

  const handleOnScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scroll = event.currentTarget.scrollLeft;
    const currentDot = Math.round(scroll / (0.85 * window.innerWidth));
    setCurrentDot(currentDot);
  };

  const handleDotClick = (index: number) => {
    listRef.current?.scrollTo(index * window.innerWidth * 0.85, 0);
  };

  const fetchData = async () => {
      try {
        const response = await fetch("/api/cars.json");
        const data = await response.json();
        const filterBodyType = data.filter((car: CarModel) => car.bodyType === bodyType);
        setLastPage(numberOfPages);

        if (bodyType === BodyType.ALL) {
          setCars(data);
        } else {
          setCars(filterBodyType);
          setCurrentPage(1);
        }
      } catch {
        setError(true);
      }
    };

  useEffect(() => {
    fetchData();

    const handleMobileView = () => {
      const mobile = window && window.innerWidth < 850;
      if (mobile) {
        setOnMobile(true);
      } else {
        setOnMobile(false);
      }
    };
    handleMobileView();

    window.addEventListener("resize", handleMobileView);
    return () => window.removeEventListener("resize", handleMobileView);
  }, [bodyType, currentPage]);

  return (
    <>
      {error ? (
        <ErrorView />
      ) : (
        <View direction="column" padding={2}>
          <FilterTab bodyType={BodyType.ALL} setBodyType={setBodyType}/>
          <div className="carList" onScroll={handleOnScroll} ref={listRef}>
            {onMobile &&
              cars.map((car) => (
                <CarItem
                  key={car.id}
                  id={car.id}
                  modelName={car.modelName}
                  bodyType={car.bodyType}
                  modelType={car.modelType}
                  imageUrl={car.imageUrl}
                />
              ))}

            {!onMobile &&
              carObjects.map((car) => (
                <CarItem
                  key={car.id}
                  id={car.id}
                  modelName={car.modelName}
                  bodyType={car.bodyType}
                  modelType={car.modelType}
                  imageUrl={car.imageUrl}
                />
              ))}
          </div>
          {!onMobile && (
            <NextOrPrev
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              cars={cars}
              setCars={setCars}
              setCurrentPage={setCurrentPage}
              lastPage={lastPage}
              firstPage={firstPage}
            />
          )}
          <Dotlist
            onClick={handleDotClick}
            defaultDot={currentDot}
            numberOfDots={cars.length}
          />
        </View>
      )}
    </>
  );
};

export default CarList;
