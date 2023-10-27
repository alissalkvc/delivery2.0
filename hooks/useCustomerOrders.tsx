import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../graphql/queries/queries";

function useCustomerOrders(userId: string) {
	const { loading, error, data } = useQuery(GET_ORDERS);
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		if (!data) return;
		const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => ({
			...value,
		}));

		const customerOrders = orders.filter(
			(order) => order.trackingItems.customer_id === userId
		);
		setOrders(customerOrders);
	}, [data, userId]);

	return { loading, error, orders };
}

export default useCustomerOrders;
