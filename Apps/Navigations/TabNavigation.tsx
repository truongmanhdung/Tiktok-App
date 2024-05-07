import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import HomeScreen from "../Screens/Home";
import ProfileScreen from "../Screens/Profile";
import SearchScreen from "../Screens/Search";
import Colors from "../Utils/Colors";
import {
	animateCircleOne,
	animateCircleTwo,
	animateViewOne,
	animateViewTwo,
} from "../Utils/them";
import AddNavigationScreen from "./AddNavigation";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	btn: {
		width: 50,
		height: 50,
		borderWidth: 4,
		justifyContent: "center",
		backgroundColor: "transparent",
		alignItems: "center",
		borderRadius: 25,
	},
	circle: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.PRIMARY,
		borderRadius: 25,
	},
	text: {
		fontSize: 10,
		alignItems: "center",
		color: Colors.WHITE,
	},
});
const Tab = createBottomTabNavigator();
type Props = {};

const configRouter = [
	{
		route: "Home",
		icon: <AntDesign name="home" size={26} color="white" />,
		component: HomeScreen,
	},
	{
		route: "Search",
		icon: <Feather name="search" size={26} color="white" />,
		component: SearchScreen,
	},
	{
		route: "Add",
		icon: <Ionicons name="add-circle-sharp" size={26} color="white" />,
		component: AddNavigationScreen,
	},
	{
		route: "Profile",
		icon: <FontAwesome name="user" size={24} color="white" />,
		component: ProfileScreen,
	},
];

const TabButton = (props: any) => {
	const { item, onPress, accessibilityState } = props;
	const focused = accessibilityState?.selected;

	const viewRef = useRef<any>();
	const circleRef = useRef<any>();
	const textRef = useRef<any>();

	useEffect(() => {
		if (focused) {
			viewRef.current.animate(animateViewOne);
			circleRef.current.animate(animateCircleOne);
			textRef.current.transitionTo({ scale: 1 });
		} else {
			viewRef.current.animate(animateViewTwo);
			circleRef.current.animate(animateCircleTwo);
			textRef.current.transitionTo({ scale: 0 });
		}
	}, [focused]);

	return (
		<TouchableOpacity
			activeOpacity={1}
			style={styles.container}
			onPress={onPress}
		>
			<Animatable.View style={styles.container} ref={viewRef} duration={800}>
				<View
					style={[
						styles.btn,
						{ borderColor: focused ? Colors.WHITE : Colors.PRIMARY },
					]}
				>
					<Animatable.View style={styles.circle} ref={circleRef} />
					{item.icon}
				</View>
				<Animatable.Text ref={textRef} style={styles.text}>
					{item.route}
				</Animatable.Text>
			</Animatable.View>
		</TouchableOpacity>
	);
};

const TabNavigation = (props: Props) => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						position: "absolute",
						bottom: 24,
						height: 70,
						left: 16,
						right: 16,
						borderRadius: 16,
						backgroundColor: Colors.PRIMARY,
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 2,
						},
						shadowOpacity: 0.23,
						shadowRadius: 2.62,
						elevation: 4,
						justifyContent: "center",
						alignItems: "center",
						paddingBottom: 0,
					},
				}}
			>
				{configRouter?.map((item, index) => (
					<Tab.Screen
						name={item.route}
						key={index}
						component={item.component}
						options={{
							tabBarShowLabel: false,
							tabBarButton: (props) => <TabButton {...props} item={item} />,
						}}
					/>
				))}
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default TabNavigation;
