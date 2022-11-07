import "./App.css";
import Location from "./components/Location";
import hero from "../src/assets/nav-image.jpg";
import logo from "../src/assets/Rick-And-Morty-Logo.png";


function App() {

	return (
      
		<div className="App">
            <img className='nav-image' src={hero} alt="Hero" />
            <img className='logo' src={logo} alt="RyM logo" />
            <Location/>
      </div> 
		
	);
}

export default App;
