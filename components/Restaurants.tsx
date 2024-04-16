import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Image,
	TouchableOpacity,
} from "react-native";
import { restaurants } from "@/assets/data/home";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
const Restaurants = () => {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{
				padding: 15,
			}}
		>
			{restaurants.map((restaurant, index) => (
				<Link key={index} href={"/"} asChild>
					<TouchableOpacity>
						<View style={styles.restaurantCard}>
							<Image source={restaurant.img} style={styles.image} />

							<View style={styles.categoryBox}>
								<Text style={styles.categoryText}>{restaurant.name}</Text>
								<Text style={{ color: Colors.green }}>
									{restaurant.rating} {restaurant.ratings}
								</Text>
								<Text style={{ color: Colors.medium }}>
									{restaurant.distance}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				</Link>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	restaurantCard: {
		width: 300,
		height: 250,
		backgroundColor: "white",
		marginEnd: 10,
		elevation: 2,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.06,
		borderRadius: 4,
	},
	categoryText: {
		paddingVertical: 4,
		fontSize: 14,
		fontWeight: "bold",
	},
	image: {
		flex: 5,
		width: undefined,
	},
	categoryBox: {
		flex: 2,
		padding: 10,
	},
});

export default Restaurants;
