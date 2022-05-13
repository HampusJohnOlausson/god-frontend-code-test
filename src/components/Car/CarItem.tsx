import React, { FC } from "react";
import { CarModel } from "../../Types/Car";
import Image from "next/image";
import { Flex, Link, Row, View } from "vcc-ui";

const CarItem: FC<CarModel> = ({
  modelName,
  imageUrl,
  bodyType,
  modelType,
  id,
}) => {
  return (
    <div className="carItem">
      <p className="bodyTypeText">
        {bodyType.toUpperCase()}
      </p>
      <div className="textContainer">
        <p className="modelNameText">{modelName}</p>
        <p className="modelTypeText">{modelType}</p>
      </div>
      <Image
        className="carImage"
        width="200px"
        height="150px"
        src={imageUrl}
        alt="car-image"
        layout="responsive"
      />

      <View direction={"row"} justifyContent={"center"} spacing={4} marginTop={2}>
      <Row>
        <Link onClick={() => window.location.assign(`/learn/${id}`)} arrow={"right"}>
          LEARN
        </Link>
      </Row>
      <Row>
        <Link onClick={() => window.location.assign(`/shop/${id}`)} arrow={"right"}>
          SHOP
        </Link>
      </Row>
    </View>
    </div>
  );
};

export default CarItem;
