import "./App.css";
import Item from "./components/Item";
import Location from "./components/Location";
import ResidentInfo from "./components/ResidentInfo";

function App() {



	return (
		<div className="App">
         <img className='nav-image' src="../src/assets/nav-image.jpg" alt="" />
         <img className='logo' src="../src/assets/Rick-And-Morty-Logo.png" alt="" />
         <Location/>
		</div>
	);
}

export default App;
