// src/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
   uri: "http://192.168.1.253:4000/graphql", // Replace with your GraphQL API endpoint
});

const client = new ApolloClient({
   link: httpLink,
   cache: new InMemoryCache(),
});

export default client;
