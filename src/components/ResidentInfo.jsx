import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ResidentInfo = ({url}) => {

   const [resident,setResident] = useState({});

   useEffect(()=>{
      axios.get(url)
      .then(res=>setResident(res.data))
   },[])

   const status = resident.status;


   return (
      <div className='card-resident'>
         <h2 className='resident-name'>{resident?.name}</h2>
         <img className='resident-img' src={resident.image} alt="" />
         <div className='resident-status'><span>Status: </span><div className={`${status?.includes('d') ? 'red-light' : status?.includes('w') ? 'gray-light' : 'green-light'} ` }></div><p>{status}</p></div>

         {/* <p className='resident-status'><span>Status: </span>{`${status?.includes('d') ? '🔴' : status?.includes('w') ? '⚪' : <div className='green-light'></div>}  ${resident.status}`} </p> */}
         <p className='resident-origin'><span>Origin: </span>{resident.origin?.name}</p>
         <p className='resident-species'><span>Species: </span>{resident.species}</p>
         <p className='resident-episodes'><span>Episodes: </span>{resident.episode?.length}</p>
      </div>
   );
};

export default ResidentInfo;