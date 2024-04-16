import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollview";
import Colors from "@/constants/Colors";
import { restaurants } from "@/assets/data/home";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
const Details = () => {
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTransparent: true,
			headerTitle: "",
			headerTintColor: Colors.primary,
			headerLeft: () => (
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.roundBtn}
				>
					<Ionicons name="arrow-back" size={24} color={Colors.primary} />
				</TouchableOpacity>
			),
			headerRight: () => (
				<View style={styles.bar}>
					<TouchableOpacity style={styles.roundBtn}>
						<Ionicons name="share-outline" size={24} color={Colors.primary} />
					</TouchableOpacity>

					<TouchableOpacity style={styles.roundBtn}>
						<Ionicons name="search-outline" size={24} color={Colors.primary} />
					</TouchableOpacity>
				</View>
			),
		});
	}, []);

	return (
		<>
			<ParallaxScrollView
				backgroundColor={"#fff"}
				style={{ flex: 1 }}
				parallaxHeaderHeight={250}
				stickyHeaderHeight={100}
				contentBackgroundColor={Colors.lightGrey}
				renderBackground={() => (
					<Image
						source={restaurants[0].img}
						style={{ width: "100%", height: 300 }}
					/>
				)}
				renderStickyHeader={() => (
					<View key="sticky-header" style={styles.stickySection}>
						<Text style={styles.stickySectionText}>{restaurants[0].name}</Text>
					</View>
				)}
			>
				<View style={styles.detailsContainer}>
					<Text>Details</Text>
				</View>
			</ParallaxScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	detailsContainer: {
		backgroundColor: Colors.lightGrey,
	},
	stickySection: {
		backgroundColor: "#fff",
		marginLeft: 70,
		height: 100,
		justifyContent: "flex-end",
	},
	stickySectionText: {
		fontSize: 20,
		margin: 10,
	},
	roundBtn: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 10,
	},
	bar: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});
export default Details;
