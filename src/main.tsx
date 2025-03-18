import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import App from "./outer/components/App";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import "./index.css";

const httpLink = createHttpLink({
  uri: "https://countries.trevorblades.com/",
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
// ReactDOM.render(
//   document.getElementById("root")
// );

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  // <StrictMode>
  //   <App />
  // </StrictMode>
);
