import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Item = ({url}) => {

   const [item,setItem] = useState({})

   useEffect(()=>{
      axios.get(url)
      .then(res=>setItem(res.data))
   },[])

   console.log(item)

   return (
         <li>
            <h1>{item.name}</h1>
            <h2>{item.type}</h2>
            <h3>{item.dimension}</h3>
         </li>
   );
};

export default Item;