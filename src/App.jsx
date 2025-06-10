import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Add from "./pages/Add";
import LoginSignup from "./components/LoginSignup";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Admin />
            </Route>
            <Route exact path="/add">
              <Add />
            </Route>
            <Route exact path="/login">
              <LoginSignup />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
