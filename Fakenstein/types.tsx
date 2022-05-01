/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {ImageInfo} from "expo-image-picker";
import {BoundaryBox} from "./constants/Face";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Tutorial: undefined;
  NotFound: undefined;
  Gallery: undefined;
  SelectFace: {image: ImageInfo, boxes: BoundaryBox[]};
  Modify: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Fakenstein: undefined;
  Gallery: undefined;
  SelectFace: undefined;
  Tutorial: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  NativeStackScreenProps<RootStackParamList>;
