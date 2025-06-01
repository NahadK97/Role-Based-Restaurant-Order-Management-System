import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./Admin";
import Navbar from "./Navbar";
import Add from "./Add";
// import LoginSignup from "./components/LoginSignup/LoginSignup";
// function App() {
//   return (
//     <div className="App">
//       <LoginSignup />
//     </div>
//   );
// }

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
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
