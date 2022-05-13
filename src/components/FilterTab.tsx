import React, { FC } from "react";
import { TabNav, TabNavItem } from "vcc-ui";
import { BodyType } from "../Types/Car";

interface FilterTab {
    bodyType: BodyType;
    setBodyType: (cars: BodyType) => void;
}
const FilterTab: FC<FilterTab> = ({ bodyType, setBodyType}) => {
  return (
    <TabNav>
      <TabNavItem onClick={() => setBodyType(BodyType.ALL)}>All</TabNavItem>
      <TabNavItem onClick={() => setBodyType(BodyType.SUV)}>SUV</TabNavItem>
      <TabNavItem onClick={() => setBodyType(BodyType.ESTATE)}>
        ESTATE
      </TabNavItem>
      <TabNavItem onClick={() => setBodyType(BodyType.SEDAN)}>SEDAN</TabNavItem>
    </TabNav>
  );
};

export default FilterTab;
