import { View } from "react-native";
import React, { useLayoutEffect } from "react";
import { RootStackParamList } from "../navigator/RootNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import {
	CompositeNavigationProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTailwind } from "tailwind-rn";
import { RouteProp } from "@react-navigation/native";
import DeliveryCard from "../components/DeliveryCard";

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;
export type OrdersScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<TabStackParamList, "Orders">,
	NativeStackNavigationProp<RootStackParamList>
>;

const OrderScreen = () => {
	const tw = useTailwind();
	const navigation = useNavigation<OrdersScreenNavigationProp>();
	const {
		params: { order },
	} = useRoute<OrderScreenRouteProp>();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: order.trackingItems.customer.name,
			headerTitleStyle: { color: "black" },
			headerTintColor: "#EB6A7C",
			headerBackTitle: "Deliveries",
		});
	}, []);
	return (
		<View style={tw("-mt-2")}>
			<DeliveryCard fullWidth order={order} />
		</View>
	);
};

export default OrderScreen;
