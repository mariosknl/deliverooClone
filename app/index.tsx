import Categories from "@/components/Categories";
import Restaurants from "@/components/Restaurants";
import Colors from "@/constants/Colors";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Page = () => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
				<Categories />
				<Text style={styles.header}>Top picks in your neighborhood</Text>
				<Restaurants />
				<Text style={styles.header}>Offer near you</Text>
				<Restaurants />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		backgroundColor: Colors.lightGrey,
	},
	header: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 16,
		marginBottom: 8,
		paddingHorizontal: 16,
	},
});
export default Page;
