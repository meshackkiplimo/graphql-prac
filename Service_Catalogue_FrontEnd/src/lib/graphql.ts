import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Create HTTP link for Vendure Shop API
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/shop-api',
  credentials: 'include', // Include cookies for authentication
});

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      // Add type policies if needed for caching optimization
    }
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

// GraphQL client for direct queries without Apollo
export const graphqlClient = {
  async query(query: string, variables?: any) {
    const response = await fetch('http://localhost:3000/shop-api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      throw new Error(result.errors[0]?.message || 'GraphQL query failed');
    }

    return result.data;
  }
};

export default apolloClient;