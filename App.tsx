import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator/RootNavigator";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
const { REACT_APP_STEPZEN_API_KEY, REACT_APP_STEPZEN_ENDPOINT } = process.env;

const client = new ApolloClient({
	headers: {
		Authorization: `apikey ${REACT_APP_STEPZEN_API_KEY}`,
	},
	uri: REACT_APP_STEPZEN_ENDPOINT,
	cache: new InMemoryCache(),
});

export default function App() {
	return (
		//@ts-ignore
		<TailwindProvider utilities={utilities}>
			<ApolloProvider client={client}>
				<NavigationContainer>
					<RootNavigator />
				</NavigationContainer>
			</ApolloProvider>
		</TailwindProvider>
	);
}
