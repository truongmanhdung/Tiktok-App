import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PreviewScreen from "@/Apps/Screens/Add/Preview";
import AddScreen from "@/Apps/Screens/Add";
const Stack = createStackNavigator();
const AddNavigationScreen = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="add-screen"
		>
			<Stack.Screen name="add-screen" component={AddScreen} />
			<Stack.Screen name="previewScreen" component={PreviewScreen} />
		</Stack.Navigator>
	);
};

export default AddNavigationScreen;

const styles = StyleSheet.create({});
