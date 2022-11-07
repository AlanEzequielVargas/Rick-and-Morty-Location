import { useEffect, useState } from "react";
import "./App.css";
import Location from "./components/Location";


function App() {

   const [isLoad,setIsLoad] = useState(false)

   useEffect(()=>{
      setIsLoad(true)
      setTimeout(()=>{
         setIsLoad(false)
      },2000)
   },[])

	return (
      
		<>
         {isLoad ? 
         (<h1>cargando</h1>) : 
         (<div className="App">
            <img className='nav-image' src="../src/assets/nav-image.jpg" alt="" />
            <img className='logo' src="../src/assets/Rick-And-Morty-Logo.png" alt="" />
            <Location/>
         </div>)}
      </>  
		
	);
}

export default App;
