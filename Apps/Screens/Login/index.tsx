import React from "react";
import {
	View,
	StyleSheet,
	Button,
	Text,
	Image,
	TouchableOpacity,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { supabase } from "@/Apps/Utils/SupabaseConfig";
import { useWarmUpBrowser } from "@/Apps/hooks/useWarmUpBrowser";
import Colors from "@/Apps/Utils/Colors";
type Props = {};
WebBrowser.maybeCompleteAuthSession();
const LoginScreen = (props: Props) => {
	const video = React.useRef<any>(null);
	const [status, setStatus] = React.useState<any>({});

	useWarmUpBrowser();

	const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

	const onLoginGoogle = React.useCallback(async () => {
		try {
			const { createdSessionId, signIn, signUp, setActive } =
				await startOAuthFlow();

			if (createdSessionId) {
				setActive && setActive({ session: createdSessionId });
				if (signUp?.emailAddress) {
					const { data, error } = await supabase
						.from("Users")
						.insert([
							{
								name: signUp.firstName + " " + signUp.lastName,
								email: signUp.emailAddress,
								username: signUp.emailAddress?.split("@")[0],
								userId: signUp.createdUserId,
							},
						])
						.select();
					if (data) {
						console.log("====================================");
						console.log(data);
						console.log("====================================");
					}
				}
			} else {
				// Use signIn or signUp for next steps such as MFA
			}
		} catch (err) {
			console.error("OAuth error", err);
		}
	}, []);
	return (
		<View style={styles.container}>
			<Video
				ref={video}
				style={styles.video}
				source={{
					uri: "https://cdn.pixabay.com/video/2023/11/10/188595-883402169_large.mp4",
				}}
				shouldPlay
				useNativeControls
				resizeMode={ResizeMode.COVER}
				isLooping
				onPlaybackStatusUpdate={(status) => setStatus(() => status)}
			/>
			<View
				style={{
					display: "flex",
					alignItems: "center",
					backgroundColor: Colors.BACKRGOUND_TRANSNP,
					flex: 1,
					paddingTop: 100,
					paddingHorizontal: 20,
				}}
			>
				<Text
					style={{
						fontFamily: "outfit-bold",
						color: Colors.WHITE,
						fontSize: 35,
					}}
				>
					Tiktok
				</Text>
				<Text
					style={{
						fontFamily: "outfit",
						color: Colors.WHITE,
						fontSize: 17,
						alignItems: "center",
						textAlign: "center",
						marginTop: 15,
					}}
				>
					Utlimate Place to Share your Short videos with friends
				</Text>
				<TouchableOpacity
					onPress={onLoginGoogle}
					style={{
						display: "flex",
						alignItems: "center",
						flexDirection: "row",
						gap: 10,
						backgroundColor: Colors.WHITE,
						padding: 10,
						borderRadius: 99,
						paddingHorizontal: 55,
						position: "absolute",
						bottom: 150,
					}}
				>
					<Image
						style={{ width: 30, height: 30 }}
						source={require("../../../assets/images/google.png")}
					/>
					<Text
						style={{
							fontFamily: "outfit",
							color: Colors.BLACK,
							fontSize: 14,
							alignItems: "center",
							textAlign: "center",
						}}
					>
						Sign In with Google
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
	},
	video: {
		alignSelf: "center",
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default LoginScreen;
