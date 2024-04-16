import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	ListRenderItem,
	Button,
} from "react-native";
import categories from "@/assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useEffect, useState } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

interface Category {
	name: string;
	count: number;
	checked?: boolean;
}

const ItemBox = () => (
	<>
		<View style={styles.itemContainer}>
			<TouchableOpacity style={styles.item}>
				<Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />
				<Text style={{ flex: 1 }}>Sort</Text>
				<Ionicons name="chevron-forward" size={20} color={Colors.primary} />
			</TouchableOpacity>
			<TouchableOpacity style={styles.item}>
				<Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
				<Text style={{ flex: 1 }}>Hygien rating</Text>
				<Ionicons name="chevron-forward" size={20} color={Colors.primary} />
			</TouchableOpacity>
			<TouchableOpacity style={styles.item}>
				<Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
				<Text style={{ flex: 1 }}>Offer</Text>
				<Ionicons name="chevron-forward" size={20} color={Colors.primary} />
			</TouchableOpacity>
			<TouchableOpacity style={styles.item}>
				<Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
				<Text style={{ flex: 1 }}>Dietary</Text>
				<Ionicons name="chevron-forward" size={20} color={Colors.primary} />
			</TouchableOpacity>
		</View>
		<Text style={styles.header}>Categories</Text>
	</>
);

const Filter = () => {
	const navigation = useNavigation();
	const [items, setItems] = useState<Category[]>(categories);
	const [selected, setSelected] = useState<Category[]>([]);
	const flexWidth = useSharedValue(0);
	const scale = useSharedValue(0);

	useEffect(() => {
		const hasSelected = selected.length > 0;
		const selectedItems = items.filter((item) => item.checked);
		const newSelected = selectedItems.length > 0;

		if (hasSelected !== newSelected) {
			flexWidth.value = withTiming(newSelected ? 150 : 0);
			scale.value = withTiming(newSelected ? 1 : 0);
		}

		setSelected(selectedItems);
	}, [items]);

	const handleClearAll = () => {
		const updatedItems = items.map((item) => {
			item.checked = false;
			return item;
		});

		setItems(updatedItems);
	};

	const animatedStyles = useAnimatedStyle(() => {
		return {
			width: flexWidth.value,
			opacity: flexWidth.value > 0 ? 1 : 0,
		};
	});

	const animatedText = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		};
	});

	const renderItem: ListRenderItem<Category> = ({ item, index }) => (
		<View style={styles.row}>
			<Text style={styles.itemText}>
				{item.name} ({item.count})
			</Text>
			<BouncyCheckbox
				fillColor={Colors.primary}
				unFillColor="#fff"
				iconStyle={{
					borderColor: Colors.primary,
					borderRadius: 4,
					borderWidth: 2,
				}}
				innerIconStyle={{
					borderColor: Colors.primary,
					borderRadius: 4,
					borderWidth: 2,
				}}
				onPress={() => {
					const isChecked = items[index].checked;

					const updatedItems = items.map((item, i) => {
						if (item.name === items[index].name) {
							item.checked = !isChecked;
						}

						return item;
					});

					setItems(updatedItems);
				}}
				isChecked={items[index].checked}
			/>
		</View>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={items}
				renderItem={renderItem}
				ListHeaderComponent={<ItemBox />}
			/>
			<View style={{ height: 76 }} />

			<View style={styles.footer}>
				<View style={styles.btnContainer}>
					<Animated.View style={[styles.outlineButton, animatedStyles]}>
						<TouchableOpacity onPress={handleClearAll}>
							<Animated.Text style={[styles.outlinedButtonText, animatedText]}>
								Clear all
							</Animated.Text>
						</TouchableOpacity>
					</Animated.View>

					<TouchableOpacity
						style={styles.fullButton}
						onPress={() => navigation.goBack()}
					>
						<Text style={styles.footerText}>Done</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: Colors.lightGrey,
	},
	fullButton: {
		backgroundColor: Colors.primary,
		padding: 16,
		alignItems: "center",
		borderRadius: 8,
		flex: 1,
		height: 56,
	},
	footerText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
	footer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 100,
		backgroundColor: "#fff",
		padding: 10,
		elevation: 10,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 10,
		shadowOffset: {
			width: 0,
			height: -10,
		},
	},
	itemContainer: {
		backgroundColor: "white",
		padding: 8,
		borderRadius: 8,
		marginBottom: 8,
	},
	header: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 16,
	},
	item: {
		flexDirection: "row",
		gap: 20,
		alignItems: "center",
		backgroundColor: "white",
		paddingVertical: 10,
		borderColor: Colors.grey,
		borderBottomWidth: 1,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		backgroundColor: "white",
	},
	itemText: {
		flex: 1,
	},
	btnContainer: {
		flexDirection: "row",
		gap: 12,
		justifyContent: "center",
	},
	outlineButton: {
		borderColor: Colors.primary,
		borderWidth: 0.5,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		height: 56,
	},
	outlinedButtonText: {
		color: Colors.primary,
		fontWeight: "bold",
		fontSize: 16,
	},
});

export default Filter;
