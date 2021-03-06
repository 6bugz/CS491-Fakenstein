/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import {Colors} from '../constants/Colors';
import {
    TutorialScreen,
    NotFoundScreen,
    WelcomeScreen,
    SelectFaceScreen,
    ModifyScreen,
    ExportScreen
 } from './screens';
import { RootStackParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const colorScheme = 'dark';


  // @ts-ignore
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{
        title: 'Oops!',
        headerStyle: {
          backgroundColor: Colors[colorScheme].tabBackground,
        },
        headerTintColor: Colors[colorScheme].pinkishWhite,
      }} />
      <Stack.Screen name="Tutorial" component={TutorialScreen} options={{
        headerStyle: {
          backgroundColor: Colors[colorScheme].tabBackground,
        },
        headerTintColor: Colors[colorScheme].pinkishWhite,
      }}/>
      <Stack.Screen name="SelectFace" component={SelectFaceScreen} options={({ navigation }) => (
        {
          title: "Select Background Images",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Tutorial')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].pinkishWhite}
                style={{ marginRight: 10 }}
              />
            </Pressable>
          ),
          headerStyle: {
            backgroundColor: Colors[colorScheme].tabBackground,
          },
          headerTintColor: Colors[colorScheme].pinkishWhite,
        })}/>
      <Stack.Screen name="Modify" component={ModifyScreen} options={({ navigation }) => (
        {
          title: "Modify Generated Faces",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Tutorial')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].pinkishWhite}
                style={{ marginRight: 10 }}
              />
            </Pressable>
          ),
          headerStyle: {
            backgroundColor: Colors[colorScheme].tabBackground,
          },
          headerTintColor: Colors[colorScheme].pinkishWhite,
        })}/>
      <Stack.Screen name="Export" component={ExportScreen} options={({ navigation }) => (
        {
          title: "Export Image",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.popToTop()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <AntDesign name="home" size={24} color={Colors[colorScheme].pinkishWhite} style={{ marginRight: 10 }}/>
            </Pressable>
          ),
          headerStyle: {
            backgroundColor: Colors[colorScheme].tabBackground,
          },
          headerTintColor: Colors[colorScheme].pinkishWhite,
        })}/>
    </Stack.Navigator>
  );
}

