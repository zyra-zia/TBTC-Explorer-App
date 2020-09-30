import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Explorer from "./Components/Explorer";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Details from "./Components/Details"

function App() {

  const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/zyra-zia/tbtc-explorer"
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App container">
          <img src="/images/tbtc.jpg" className="logo" alt="logo"/>
          <h4>TBTC <small className="text-muted">Deposit and Redemption Explorer</small></h4>
          <hr className="hide"/>
          <Switch>
            <Route path="/" exact >
                <Explorer />
            </Route>
            <Route path="/details/:depositId">
              <Details />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
