import Colors from "@/Apps/Utils/Colors";
import { supabase } from "@/Apps/Utils/SupabaseConfig";
import { ImageCustom } from "@/Apps/components/ImageCustom";
import VideoThumbnailItem from "@/Apps/components/VideoThumbnailItem";
import { useUser } from "@clerk/clerk-expo";
import { useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
	FlatList,
	Image,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

type Props = {};

const HomeScreen = (props: Props) => {
	const { user } = useUser();
	const [postList, setPostList] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [pageSize, setPageSize] = useState<number>(0);
	const updateProfile = async () => {
		const { data, error } = await supabase
			.from("Users")
			.update({ image: user?.imageUrl }) // update trường nào
			.eq("email", user?.primaryEmailAddress?.emailAddress) // kiểm tra điều kiện
			.is("image", null) // check nếu null thì mới update
			.select(); // thực hiện hành động
		console.log("data", data);
	};

	useEffect(() => {
		user && updateProfile();
	}, [user]);
	console.log("postList", postList.length);
	const getListPosts = async () => {
		setLoading(true);
		let { data: PostLists, error } = await supabase
			.from("PostLists")
			.select(`*,Users(username,email,name,image)`)
			.range(pageSize, pageSize + 6);

		if (PostLists) {
			if (pageSize === 0) {
				setPostList(PostLists);
			} else {
				setPostList((prev) => [...prev, ...PostLists]);
			}
		}
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};

	useEffect(() => {
		getListPosts();
	}, [pageSize]);

	const onSelectProfile = () => {};

	const onRefresh = async () => {
		setLoading(true);
		let { data: PostLists, error } = await supabase
			.from("PostLists")
			.select(`*,Users(username,email,name,image)`)
			.range(0, 6);

		if (PostLists) {
			setPostList(PostLists);
		}
		setTimeout(() => {
			setLoading(false);
		}, 1000);
		setPageSize(0);
	};

	return (
		<SafeAreaView>
			<View style={styles.header}>
				<Text style={styles.text_header}>TikTok</Text>
				<TouchableOpacity onPress={onSelectProfile}>
					<Image style={styles.image} source={{ uri: user?.imageUrl }} />
				</TouchableOpacity>
			</View>
			<View style={styles.wrapper_posts}>
				<FlatList
					refreshing={loading}
					onRefresh={onRefresh}
					onEndReached={() => setPageSize(pageSize + 6)}
					data={postList}
					numColumns={2}
					style={{ paddingBottom: 100 }}
					renderItem={({ item, index }) => (
						<VideoThumbnailItem key={index} item={item} />
					)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	safe: {},
	container: {
		paddingHorizontal: 15,
		height: "100%",
		paddingBottom: 50,
	},
	header: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},
	text_header: {
		fontFamily: "outfit-bold",
		fontSize: 24,
	},
	image: {
		width: 40,
		height: 40,
		borderRadius: 100,
	},
	wrapper_posts: {
		paddingHorizontal: 10,
	},
});
