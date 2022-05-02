import {Props} from "react";
import {BoundaryBox} from "./Face";
import {Dimensions} from "react-native";
import {ImageInfo} from "expo-image-picker";

export type Navigation = Props<any>['navigation'];

export type ImageType = {
  height: number;
  width: number;
  type: "image" | undefined;
  cancelled: boolean;
  uri: string;
}

// need to give IP for Android testing: 176.88.100.24
export const backendURL = "http://192.168.1.20:5000";

export const dWidth = Dimensions.get('window').width;
export const dHeight = Dimensions.get('window').height;

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

export const toDetect: (image: ImageInfo) => Promise<void> = async (image) => {
  const data=new FormData();
  // @ts-ignore
  data.append("image", {uri: image.uri, name: 'image.jpg', type: 'image/jpeg'})

  const promise = new Promise(async (resolve, reject) => {
    await fetch(backendURL + '/detect', {
      method: 'POST',
      headers: { "Content-Type": "multipart/form-data" },
      body: data,
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);

        resolve({
          boxes: responseJson,
        });
      }).catch((error) => reject(error.message));
  })
}
