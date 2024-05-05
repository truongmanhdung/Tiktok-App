import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./Apps/Screens/Home";
import LoginScreen from "./Apps/Screens/Login";
import TabNavigation from "./Apps/Navigations/TabNavigation";
import TabNavigation2 from "./Apps/Navigations/TabNavigation2";
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
export default function App() {
	const [fontsLoaded, fontError] = useFonts({
		"outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
		"outfit-medium": require("./assets/fonts/Outfit-Medium.ttf"),
		outfit: require("./assets/fonts/Outfit-Regular.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}
	return (
		<ClerkProvider publishableKey={publishableKey}>
			<View style={styles.container}>
				<SignedIn>
					<TabNavigation />
				</SignedIn>
				<SignedOut>
					<LoginScreen />
				</SignedOut>
			</View>
		</ClerkProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
