import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	Image,
	TouchableOpacity,
	TextInput,
} from "react-native";
import BottomSheet from "./BottomSheet";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const SearchBar = () => (
	<View style={styles.searchContainer}>
		<View style={styles.searchSection}>
			<View style={styles.searchField}>
				<Ionicons
					name="ios-search"
					size={20}
					color={Colors.medium}
					style={styles.searchIcon}
				/>
				<TextInput
					style={styles.input}
					placeholder="Restaurants, groceries, dishes"
				/>
			</View>
			<Link href={"/(modal)/filter"} asChild>
				<TouchableOpacity style={styles.optionButton}>
					<Ionicons name="options-outline" size={20} color={Colors.primary} />
				</TouchableOpacity>
			</Link>
		</View>
	</View>
);
const CustomHeader = () => {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const openModal = () => {
		bottomSheetRef.current?.present();
	};
	return (
		<SafeAreaView style={styles.safeArea}>
			<BottomSheet ref={bottomSheetRef} />
			<View style={styles.container}>
				<TouchableOpacity onPress={openModal}>
					<Image
						style={styles.bike}
						source={require("@/assets/images/bike.png")}
					/>
				</TouchableOpacity>

				<TouchableOpacity style={styles.titleContainer} onPress={openModal}>
					<Text style={styles.title}>Delivery · Now</Text>
					<View style={styles.locationName}>
						<Text style={styles.subtitle}>London</Text>
						<Ionicons name="chevron-down" size={20} color={Colors.primary} />
					</View>
				</TouchableOpacity>

				<TouchableOpacity style={styles.profileButton}>
					<Ionicons name="person-outline" size={20} color={Colors.primary} />
				</TouchableOpacity>
			</View>

			<SearchBar />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "white",
	},
	container: {
		height: 60,
		backgroundColor: "white",
		flexDirection: "row",
		gap: 20,
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
	},
	bike: {
		width: 30,
		height: 30,
	},
	titleContainer: {
		flex: 1,
	},
	title: {
		fontSize: 14,
		color: Colors.medium,
	},
	subtitle: {
		fontSize: 18,
		fontWeight: "bold",
	},
	locationName: {
		flexDirection: "row",
		alignItems: "center",
	},
	profileButton: {
		backgroundColor: Colors.lightGrey,
		padding: 10,
		borderRadius: 50,
	},
	searchContainer: {
		height: 60,
		backgroundColor: "white",
	},
	searchSection: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		paddingHorizontal: 20,
		flex: 1,
	},
	searchField: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.lightGrey,
		borderRadius: 8,
	},
	input: {
		padding: 10,
		color: Colors.mediumDark,
	},
	searchIcon: {
		paddingLeft: 5,
	},
	optionButton: {
		padding: 10,
		borderRadius: 50,
	},
});

export default CustomHeader;
