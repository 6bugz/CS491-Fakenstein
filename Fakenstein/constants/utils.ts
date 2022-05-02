import {Props} from "react";
import {BoundaryBox} from "./Face";
import {Dimensions} from "react-native";

export type Navigation = Props<any>['navigation'];

export type ImageType = {
  height: number;
  width: number;
  type: string;
  cancelled: boolean;
  uri: string;
}

// need to give IP for Android testing: 176.88.100.24
export const backendURL = "http://192.168.1.20:5000";

export const dWidth = Dimensions.get('window').width;

export const resizeBoxes = (dHeight: number, image: ImageType, boxes : BoundaryBox[]) => {
  let faceBoxes: BoundaryBox[] = [];
  for (let box of boxes) {
    const boundary = {
      isBackground: box.isBackground,
      height: box.height * dHeight / image.height,
      width: box.width * dWidth / image.width,
      top: box.top * dHeight / image.height,
      left: box.left * dWidth / image.width,
      age: box.age,
      gender: box.gender,
      skinColor: box.skinColor,
    };
    console.log(boundary)
    faceBoxes.push(boundary);
  }
  return faceBoxes;
}
