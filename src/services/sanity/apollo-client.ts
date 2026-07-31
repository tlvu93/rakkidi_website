import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// Apollo Client 4 dropped the `uri` shorthand on the constructor; the
// terminating link has to be built explicitly.
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://x90k8rg1.api.sanity.io/v1/graphql/develop/default'
  }),
  cache: new InMemoryCache()
});

export default client;
