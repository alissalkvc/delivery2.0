import { ScrollView, ActivityIndicator } from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import {
	CompositeNavigationProp,
	useNavigation,
} from "@react-navigation/native";
import { TabStackParamList } from "../navigator/TabNavigator";
import { RootStackParamList } from "../navigator/RootNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Input } from "@rneui/themed";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/queries/queries";
import CustomerCard from "../components/CustomerCard";

export type CustomerScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<TabStackParamList, "Customers">,
	NativeStackNavigationProp<RootStackParamList>
>;

const CustomersScreen = () => {
	const tw = useTailwind();
	const navigation = useNavigation();
	const [input, setInput] = useState<string>("");
	const { loading, error, data } = useQuery(GET_CUSTOMERS);
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<ScrollView style={{ backgroundColor: "#59C1CC" }}>
			<Image
				source={{ uri: "https://links.papareact.com/3jc" }}
				containerStyle={tw("w-full h-64")}
				PlaceholderContent={<ActivityIndicator />}
			/>

			<Input
				placeholder="Search by customer"
				value={input}
				onChangeText={(text) => setInput(text)}
				containerStyle={tw("bg-white pt-5 pb-0 px-10")}
			/>
			{data?.getCustomers
				?.filter((customer: CustomerList) =>
					customer.value.name.includes(input)
				)
				.map(({ name: ID, value: { name, email } }: CustomerResponse) => {
					return (
						<CustomerCard key={ID} email={email} name={name} userId={ID} />
					);
				})}
		</ScrollView>
	);
};

export default CustomersScreen;
