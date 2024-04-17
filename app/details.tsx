import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	SectionList,
	ListRenderItem,
	ScrollView,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollview";
import Colors from "@/constants/Colors";
import { restaurant } from "@/assets/data/restaurant";
import { useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
const Details = () => {
	const navigation = useNavigation();
	const [activeIndex, setActiveIndex] = useState(0);

	const opacity = useSharedValue(0);
	const animatedStyles = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	const scrollRef = useRef<ScrollView>(null);
	const itemsRef = useRef<TouchableOpacity[]>([]);

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

	const selectCategory = (index: number) => {
		const selected = itemsRef.current[index];
		setActiveIndex(index);

		selected.measure((x) => {
			scrollRef.current?.scrollTo({
				x: x - 16,
				y: 0,
				animated: true,
			});
		});
	};

	const onScroll = (event: any) => {
		const y = event.nativeEvent.contentOffset.y;
		if (y > 350) {
			opacity.value = withTiming(1);
		} else {
			opacity.value = withTiming(0);
		}
	};

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
				scrollEvent={onScroll}
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

			<Animated.View style={[styles.stickySegments, animatedStyles]}>
				<View style={styles.segmentsShadow}>
					<ScrollView
						ref={scrollRef}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.segmentScrollview}
					>
						{restaurant.food.map((item, index) => (
							<TouchableOpacity
								key={index}
								ref={(ref) => (itemsRef.current[index] = ref!)}
								style={
									activeIndex === index
										? styles.segmentButtonActive
										: styles.segmentButton
								}
								onPress={() => selectCategory(index)}
							>
								<Text
									style={
										activeIndex === index
											? styles.segmentTextActive
											: styles.segmentText
									}
								>
									{item.category}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			</Animated.View>
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
	stickySegments: {
		position: "absolute",
		height: 50,
		left: 0,
		right: 0,
		top: 100,
		backgroundColor: "#fff",
		overflow: "hidden",
		paddingBottom: 10,
	},
	segmentsShadow: {
		backgroundColor: "#fff",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 5,
		width: "100%",
		height: "100%",
	},
	segmentButton: {
		paddingHorizontal: 16,
		paddingVertical: 4,
		borderRadius: 20,
	},
	segmentText: {
		color: Colors.primary,
		fontSize: 16,
	},
	segmentButtonActive: {
		backgroundColor: Colors.primary,
		paddingHorizontal: 16,
		paddingVertical: 4,
		borderRadius: 20,
		marginHorizontal: 8,
	},
	segmentTextActive: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
	segmentScrollview: {
		paddingHorizontal: 16,
		alignItems: "center",
		gap: 20,
		paddingBottom: 4,
	},
});
export default Details;
