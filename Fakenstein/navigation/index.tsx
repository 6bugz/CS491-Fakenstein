/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import {Colors} from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {
    TutorialScreen,
    NotFoundScreen,
    WelcomeScreen,
    GalleryScreen,
    SelectFaceScreen
 } from '../screens/screens';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
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


  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Tutorial" component={TutorialScreen} />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={({ navigation }: RootTabScreenProps<'Gallery'>) => (
        {
          title: "Gallery",
          tabBarIcon: ({ color }) => <TabBarIcon name="photo" color={color} />,
          headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Tutorial')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome
                  name="info-circle"
                  size={25}
                  color={Colors[colorScheme].tabIconDefault}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
          ),
        })}
      />
      <Stack.Screen name="SelectFace" component={SelectFaceScreen}
        options={({ navigation }: RootTabScreenProps<'SelectFace'>) => (
        {
          headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Tutorial')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <Feather name="droplet" size={24} color="white" style={{ marginRight: 15 }}/>
              </Pressable>
          ),
        })}/>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = 'dark';

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={WelcomeScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Welcome',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={GalleryScreen}
        options={({ navigation }: RootTabScreenProps<'Gallery'>) => ({
          title: 'Gallery',
          tabBarIcon: ({ color }) => <TabBarIcon name="photo" color={color} />,
          headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Tutorial')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome
                  name="info-circle"
                  size={25}
                  color={Colors[colorScheme].tabIconDefault}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
