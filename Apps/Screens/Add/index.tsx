import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import Colors from "@/Apps/Utils/Colors";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const AddScreen = (props: Props) => {
	const navigation: any = useNavigation();

	// select video
	const onSelectVideo = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Videos,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			generateThumbnail(result.assets[0].uri);
		}
	};

	// user to generate the thumbnail

	const generateThumbnail = async (videoUrl: string) => {
		try {
			const { uri } = await VideoThumbnails.getThumbnailAsync(videoUrl, {
				time: 15000,
			});
			navigation.navigate("previewScreen", {
				video: videoUrl,
				thumbnail: uri,
			});
			console.log(uri);
		} catch (e) {
			console.warn(e);
		}
	};

	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require("@/assets/images/upload-video.png")}
			/>
			<Text style={styles.text_header}>Start Uploading Short Video</Text>
			<Text style={styles.text_content}>
				Lets upload short video and start sharing your creativity with community
			</Text>
			<TouchableOpacity
				style={styles.btn_file}
				activeOpacity={0.8}
				onPress={onSelectVideo}
			>
				<Text style={styles.text_upload}>Select Video File</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AddScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: 150,
		height: 150,
	},
	text_header: {
		fontSize: 24,
		fontWeight: "700",
		color: Colors.BLACK,
	},
	text_content: {
		fontSize: 14,
		fontWeight: "500",
		color: Colors.BLACK,
		marginTop: 20,
		marginBottom: 20,
		paddingHorizontal: 20,
		textAlign: "center",
		fontFamily: "outfit",
	},
	btn_file: {
		backgroundColor: Colors.BLACK,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 25,
		paddingVertical: 15,
		borderRadius: 99,
	},
	text_upload: {
		color: Colors.WHITE,
		fontSize: 16,
		fontFamily: "outfit",
	},
});
