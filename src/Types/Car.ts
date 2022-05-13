export interface CarModel {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
}

export enum BodyType {
  ALL = "all",
  SUV = "suv",
  ESTATE = "estate",
  SEDAN = "sedan",
}
