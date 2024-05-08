import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImageCustom } from "../ImageCustom";
import Colors from "@/Apps/Utils/Colors";

type Props = {
	item: any;
};
import Feather from "@expo/vector-icons/Feather";
const VideoThumbnailItem = (props: Props) => {
	const { item } = props;
	return (
		<View style={styles.post_item}>
			<View style={styles.wrapper_user}>
				<View style={styles.user_flex}>
					<Image
						resizeMode="cover"
						style={styles.image_user}
						source={{ uri: item?.Users?.image }}
					/>
					<Text style={styles.text_user}>{item?.Users?.username}</Text>
				</View>
				<View style={styles.user_flex}>
					<Text style={styles.text_user}>30</Text>
					<Feather name="heart" size={20} color={Colors.WHITE} />
				</View>
			</View>
			<ImageCustom
				style={styles.image_post}
				source={{ uri: item?.thumbnail }}
				thumbnailSource={{ uri: item?.thumbnail }}
				resizeMode="cover"
			/>
		</View>
	);
};

export default VideoThumbnailItem;

const styles = StyleSheet.create({
	post_item: {
		backgroundColor: Colors.WHITE,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		flex: 1,
		margin: 5,
	},
	wrapper_user: {
		position: "absolute",
		bottom: 0,
		padding: 5,
		zIndex: 10,
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
	user_flex: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		gap: 5,
	},
	image_user: {
		width: 20,
		height: 20,
		borderRadius: 99,
	},
	text_user: {
		color: Colors.WHITE,
		fontFamily: "outfit",
		fontSize: 12,
	},
	image_post: {
		width: "100%",
		height: 300,
		borderRadius: 8,
	},
});
