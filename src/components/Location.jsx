import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import LocationInfo from './LocationInfo';
import ResidentInfo from './ResidentInfo';


const Location = () => {

   const [location, setLocation] = useState({});

   const randomNumber = Math.floor(Math.random() * 126) + 1;

   const [inputValue,setInputValue] = useState('')

	useEffect(() => {
		axios.get(`https://rickandmortyapi.com/api/location/${randomNumber}`)
      .then((res) =>
			setLocation(res.data)
		);
	}, []);


   function searchLocation(e){
      axios.get(`https://rickandmortyapi.com/api/location/${inputValue}`)
      .then(res=>setInputValue(res.data))
   }


   return (
      <>
         {inputValue ? 
         (<div className='search-section'>
            <LocationInfo location={inputValue}/>
            
         </div>) : 
         (<div className='search-section'>
            <LocationInfo location={location}/>
            
            
         </div>)}


         <div className='input'>
               <input type="text" placeholder="type a location id" onChange={e=>setInputValue(e.target.value)}/>
               <button onClick={searchLocation}>Search</button>
         </div>
         
         
         {inputValue ? 
         (inputValue.residents?.map(resident=>
            ( <div key={resident}><ResidentInfo url={resident}/></div>) 
            )) : 
         (location.residents?.map(resident=>
         ( <div key={resident}><ResidentInfo url={resident}/></div>) 
         ))}
         
      </>
   );
};

export default Location;