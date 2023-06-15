import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GET_PROJECTS } from './queries/queries';

const client = new ApolloClient({
  uri: 'https://x90k8rg1.api.sanity.io/v1/graphql/develop/default',
  cache: new InMemoryCache()
});

export default client;
