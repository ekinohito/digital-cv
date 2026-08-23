import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { getAdminToken } from "../lib/admin-token.ts";

const httpLink = new HttpLink({ uri: "/graphql" });

const authLink = new SetContextLink((previousContext) => {
  const token = getAdminToken();

  return {
    headers: {
      ...previousContext.headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
