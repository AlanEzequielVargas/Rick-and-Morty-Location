import "./App.css";
import Location from "./components/Location";
import hero from "../src/assets/nav-image.jpg";
import logo from "../src/assets/Rick-And-Morty-Logo.png";
import spinner from "../src/assets/portal-spinner.gif";

function App() {
	return (
		<div className="App">
			<div className="hero">
				<img className="nav-image" src={hero} alt="Hero" />
				<img className="logo" src={logo} alt="RyM logo" />
			</div>

			<Location spinner={spinner} />
		</div>
	);
}

export default App;
