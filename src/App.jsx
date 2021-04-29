import Authentication from "./components/authentication"
import Map from "./components/map"
import {useSelector } from "react-redux";
import {selectUser} from "./userSlice";

function App() {
  const user = useSelector(selectUser);
  return <div className="App">
    <Map></Map> 
  {/* {user ? <Map></Map> : <Authentication></Authentication>} */}
  </div>;
}

export default App;
