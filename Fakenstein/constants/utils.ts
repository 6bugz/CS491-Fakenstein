import {Props} from "react";
import {BoundaryBox} from "./Face";
import {Dimensions, Platform} from "react-native";

export type Navigation = Props<any>['navigation'];

export type ImageType = {
  height: number;
  width: number;
  type: "image" | undefined;
  cancelled: boolean;
  uri: string;
}

// need to give IP for Android testing:
// bilkent wifi "http://139.179.103.16:5000"
export const backendURL = "http://172.20.10.2:5000";

export const dWidth = Dimensions.get('window').width;
export const dHeight = Dimensions.get('window').height;

export const isWeb = Platform.OS === 'web';

export const resizeBoxes = (imHeight: number, image: ImageType, boxes : BoundaryBox[]) => {
  let faceBoxes: BoundaryBox[] = [];
  for (let box of boxes) {
    const boundary = resizeBox( imHeight, image, box);
    faceBoxes.push(boundary);
  }
  console.log(faceBoxes);
  return faceBoxes;
}

export const resizeBox = (imHeight: number, image: ImageType, box : BoundaryBox) => {
  return {
    isBackground: box.isBackground,
    height: box.height * imHeight / image.height,
    width: box.width * dWidth / image.width,
    top: box.top * imHeight / image.height,
    left: box.left * dWidth / image.width,
    age: box.age,
    gender: box.gender,
    skinColor: box.skinColor,
  };
}

export const maximizeBox = (imHeight: number, image: ImageType, box : BoundaryBox) => {
  return {
    height: box.height / imHeight * image.height,
    width: box.width / dWidth * image.width,
    top: box.top / imHeight * image.height,
    left: box.left / dWidth * image.width,
    age: box.age,
    gender: box.gender,
    skinColor: box.skinColor,
  };
}
