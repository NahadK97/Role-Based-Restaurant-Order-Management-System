import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Add from "./pages/Add";
import LoginSignup from "./components/LoginSignup";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
