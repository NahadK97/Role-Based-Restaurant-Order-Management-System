import Admin from "./Admin";
import Navbar from "./Navbar";
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
    <div className="App">
      <Navbar />
      <div className="content">
        <Admin />
      </div>
    </div>
  );
}

export default App;
