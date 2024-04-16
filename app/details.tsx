import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	SectionList,
	ListRenderItem,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollview";
import Colors from "@/constants/Colors";
import { restaurant } from "@/assets/data/restaurant";
import { useLayoutEffect } from "react";
import { Link, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
const Details = () => {
	const navigation = useNavigation();

	const DATA = restaurant.food.map((item, index) => ({
		title: item.category,
		data: item.meals,
		index,
	}));

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

	const renderItem: ListRenderItem<any> = ({ item, index }) => (
		<Link href={"/"} asChild>
			<TouchableOpacity key={index} style={styles.item}>
				<View style={{ flex: 1 }}>
					<Text style={styles.dish}>{item.name}</Text>
					<Text style={styles.dishText}>{item.info}</Text>
					<Text style={styles.dishText}>€{item.price}</Text>
				</View>
				<Image source={item.img} style={styles.dishImage} />
			</TouchableOpacity>
		</Link>
	);

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
						source={restaurant.img}
						style={{ width: "100%", height: 300 }}
					/>
				)}
				renderStickyHeader={() => (
					<View key="sticky-header" style={styles.stickySection}>
						<Text style={styles.stickySectionText}>{restaurant.name}</Text>
					</View>
				)}
			>
				<View style={styles.detailsContainer}>
					<Text style={styles.restaurantName}>{restaurant.name}</Text>
					<Text style={styles.restaurantDescription}>{restaurant.about}</Text>
					<Text style={styles.restaurantDescription}>
						{restaurant.delivery} ·{" "}
						{restaurant.tags.map(
							(tag, index) =>
								`${tag}${index < restaurant.tags.length - 1 ? " · " : ""}`
						)}
					</Text>
					<Text>{restaurant.about}</Text>
					<SectionList
						contentContainerStyle={{ paddingBottom: 50 }}
						keyExtractor={(item, index) => `${item.id}-${index}`}
						scrollEnabled={false}
						sections={DATA}
						renderItem={renderItem}
						renderSectionHeader={({ section: { title, index } }) => (
							<Text style={styles.sectionHeader}>{title}</Text>
						)}
						ItemSeparatorComponent={() => (
							<View
								style={{
									height: 1,
									backgroundColor: Colors.grey,
									marginHorizontal: 16,
								}}
							/>
						)}
						SectionSeparatorComponent={() => (
							<View style={{ height: 1, backgroundColor: Colors.grey }} />
						)}
					/>
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
	restaurantName: {
		fontSize: 30,
		margin: 16,
	},
	restaurantDescription: {
		fontSize: 16,
		margin: 16,
		lineHeight: 22,
		color: Colors.medium,
	},
	sectionHeader: {
		fontSize: 22,
		fontWeight: "bold",
		margin: 16,
		marginTop: 40,
	},
	item: {
		backgroundColor: "white",
		padding: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 16,
		marginVertical: 8,
	},
	dishImage: {
		width: 80,
		height: 80,
		borderRadius: 4,
	},
	dish: {
		fontSize: 16,
		fontWeight: "bold",
	},
	dishText: {
		fontSize: 14,
		color: Colors.mediumDark,
		paddingVertical: 4,
	},
});
export default Details;
