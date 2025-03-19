import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import App from "./outer/components/App";
import { createRoot } from "react-dom/client";

import "./index.css";

const httpLink = createHttpLink({
  uri: "https://countries.trevorblades.com/",
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
