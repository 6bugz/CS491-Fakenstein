import {Props} from "react";

export type Navigation = Props<any>['navigation'];

export type ImageType = {
  height: number;
  width: number;
  type: string;
  cancelled: boolean;
  uri: string;
}

// need to give IP for Android testing: 176.88.100.24
export const backendURL = "http://192.168.1.20:5000"
