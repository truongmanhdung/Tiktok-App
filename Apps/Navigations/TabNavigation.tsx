import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../Screens/Home";
import ProfileScreen from "../Screens/Profile";
import SearchScreen from "../Screens/Search";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createMaterialBottomTabNavigator();
type Props = {};

const TabNavigation = (props: Props) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="black"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "white" }}
	  screenOptions={{
		tabBarStyle: { position: 'absolute' },
	  }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              name="home"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
