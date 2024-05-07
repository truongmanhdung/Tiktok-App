import {
	Image,
	Keyboard,
	KeyboardAvoidingView,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/Apps/Utils/Colors";
import { s3bucket } from "@/Apps/Utils/S3BucketConfig";
type Props = {};

const PreviewScreen = (props: Props) => {
	const { params }: any = useRoute();
	const [description, setDescription] = useState<string>();

	const navigation = useNavigation();

	const onPublishVideo = () => {
		Keyboard.dismiss();
		const video = params?.video;
		const thumbnail = params?.thumbnail;
		uploadFileToAws(video, "video");
		uploadFileToAws(thumbnail, "image");
	};

	const uploadFileToAws = async (file: any, type: string) => {
		const fileType = file?.split(".").pop();
		console.log("fileType: ", fileType);

		const params = {
			Bucket: "tiktok-dungtm",
			Key: `tiktok-${Date.now()}.${fileType}`,
			Body: await fetch(file).then((response: any) => response.blob()),
			ACL: "public-read",
			ContentType: type === "video" ? `video/${fileType}` : `image/${fileType}`,
		};
		console.log("params: ", params);
		try {
			const data = await s3bucket
				.upload(params)
				.promise()
				.then((res) => {
					console.log("res", res);
				});
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<SafeAreaView style={styles.safe}>
			<KeyboardAvoidingView>
				<ScrollView keyboardShouldPersistTaps="handled">
					<View style={styles.container}>
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={styles.btn_back}
						>
							<Ionicons name="chevron-back" size={24} color="black" />
							<Text style={styles.text_back}>Go back</Text>
						</TouchableOpacity>
						<View style={styles.wrapper_image}>
							<Text style={styles.text_detail}>Add Details Video</Text>
							<Image style={styles.image} source={{ uri: params?.thumbnail }} />
							<TextInput
								onChangeText={(textNew) => setDescription(textNew)}
								style={styles.input}
								placeholder="Description"
							/>
							<TouchableOpacity
								onPress={onPublishVideo}
								activeOpacity={0.6}
								style={styles.btn_save}
							>
								<Text style={styles.btn_text}>Publish Video</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default PreviewScreen;

const styles = StyleSheet.create({
	safe: {},
	container: {
		paddingHorizontal: 15,
		height: "100%",
		paddingBottom: 50,
	},
	btn_back: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
	},
	text_back: {
		fontFamily: "outfit",
		fontSize: 18,
	},
	wrapper_image: {
		alignItems: "center",
	},
	text_detail: {
		marginTop: 40,
		marginBottom: 20,
		fontFamily: "outfit-bold",
		fontSize: 18,
	},
	image: {
		borderRadius: 12,
		marginBottom: 20,
		width: 200,
		height: 300,
		objectFit: "cover",
	},
	input: {
		width: "100%",
		borderWidth: 1,
		paddingHorizontal: 10,
		paddingVertical: 20,
		borderColor: Colors.BACKRGOUND_TRANSNP,
		borderRadius: 10,
	},
	btn_save: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: Colors.PRIMARY,
		marginTop: 20,
		borderRadius: 99,
		marginBottom: 30,
	},
	btn_text: {
		fontFamily: "outfit",
		fontSize: 16,
		color: Colors.WHITE,
	},
});
