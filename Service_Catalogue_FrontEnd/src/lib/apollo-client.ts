import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://68dd-54-37-203-255.ngrok-free.app/shop-api",
  headers: {
    //Host: "vendure.dqprojects.com",
    "Content-Type": "application/json",
    // Add token if required
  },
  credentials: "include", // This ensures that cookies or authorization headers are included in the request
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});
