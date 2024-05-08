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
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/Apps/Utils/Colors";
import { s3bucket } from "@/Apps/Utils/S3BucketConfig";
import { supabase } from "@/Apps/Utils/SupabaseConfig";
import { useAuth, useOAuth } from "@clerk/clerk-expo";
type Props = {};

const PreviewScreen = (props: Props) => {
	const { params }: any = useRoute();
	const [description, setDescription] = useState<string>();

	const { userId } = useAuth();
	const navigation: any = useNavigation();

	const getEmail = async () => {
		const { data, error } = await supabase
			.from("Users")
			.select("*")
			.eq("userId", userId);
		if (data) {
			return data[0]?.email;
		}
	};

	const onPublishVideo = async () => {
		Keyboard.dismiss();
		const video = params?.video;
		const thumbnail = params?.thumbnail;
		const dataVideo = await uploadFileToAws(video, "video");
		const dataThumbnail = await uploadFileToAws(thumbnail, "image");
		const emailRef = await getEmail();
		if (dataVideo && dataThumbnail) {
			const { data, error } = await supabase
				.from("PostLists")
				.insert([
					{
						videoUrl: dataVideo?.Location,
						thumbnail: dataThumbnail.Location,
						description: description,
						emailRef: emailRef,
					},
				])
				.select();
			if (data) {
				navigation.navigate("Home", { isRefresh: true });
			}
		}
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
			return await s3bucket
				.upload(params)
				.promise()
				.then(async (res) => res);
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<SafeAreaView style={styles.safe}>
			<KeyboardAvoidingView>
				{/* tắt sự kiện click button đóng keybourd trước nhưng ko thực hiện action button: keyboardShouldPersistTaps="handled" */}
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
