import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import HomeScreen from "../Screens/Home";
import ProfileScreen from "../Screens/Profile";
import SearchScreen from "../Screens/Search";
import VideoScreen from "../Screens/Video";
import Colors from "../Utils/Colors";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
const Tab = createBottomTabNavigator();
type Props = {};

const configRouter = [
	{
		route: "Home",
		icon: <AntDesign name="home" size={24} color="white" />,
		component: HomeScreen,
	},
	{
		route: "Search",
		icon: <Feather name="search" size={24} color="white" />,
		component: SearchScreen,
	},
	{
		route: "Video",
		icon: <Feather name="video" size={24} color="white" />,
		component: VideoScreen,
	},
	{
		route: "Profile",
		icon: <AntDesign name="profile" size={24} color="white" />,
		component: ProfileScreen,
	},
];

const renderColor = (route: string, color: string) => {
	switch (route) {
		case "Home":
			return <AntDesign name="home" size={24} color={color} />;
		case "Search":
			return <Feather name="search" size={24} color={color} />;
		case "Video":
			return <Feather name="video" size={24} color={color} />;
		case "Profile":
			return <AntDesign name="profile" size={24} color={color} />;
		default:
			break;
	}
};

const TabButton = (props: any) => {
	const { item, onPress, accessibilityState } = props;
	const focused = accessibilityState?.selected;

	const viewRef = useRef<any>();

	useEffect(() => {
		if (focused) {
			viewRef.current.animate({
				0: { scale: 0.5, rotate: "0deg" },
				1: { scale: 1.5, rotate: "360deg" },
			});
		} else {
			viewRef.current.animate({
				0: { scale: 1.5, rotate: "360deg" },
				1: { scale: 1, rotate: "0deg" },
			});
		}
	}, [focused]);

	return (
		<TouchableOpacity
			activeOpacity={1}
			style={styles.container}
			onPress={onPress}
		>
			<Animatable.View
				animation="zoomIn"
				style={styles.container}
				ref={viewRef}
				duration={800}
			>
				{renderColor(
					item.route,
					focused ? Colors.PRIMARY : Colors.PRIMARY_LITE,
				)}
			</Animatable.View>
		</TouchableOpacity>
	);
};

const TabNavigation2 = (props: Props) => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						position: "absolute",
						bottom: 16,
						height: 70,
						left: 16,
						right: 16,
						borderRadius: 16,
						backgroundColor: Colors.WHITE,
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
                        paddingBottom: 0
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
							tabBarLabelStyle: {
								display: "none",
							},
							tabBarButton: (props) => <TabButton {...props} item={item} />,
						}}
					/>
				))}
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default TabNavigation2;
