import Header from "./component/header";
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import Home from "./component/pages/home";
import NotFound from "./component/pages/notFound";
import Kurs from "./component/pages/kurs";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
      <Router>
        <Header/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kurslar/:id" element={<Kurs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
