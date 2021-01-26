import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { Events } from "./pages/events";
import { EventDetails } from "./pages/eventDetails";

const client = new ApolloClient({
  uri: "https://api.smash.gg/gql/alpha",
  headers: {
    Authorization: "Bearer e413d0b99fbbcfb0b5b159a1e8d5f5a5",
  },
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={Events} />
          <Route exact path="/eventDetails/:slug" component={EventDetails} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
