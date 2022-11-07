const LocationInfo = ({location}) => {

   return (
      <div className="location-info">
         <span>location</span>
         <h1>{location?.name}</h1>
         <div>
            <p><span>Type: </span>{location?.type}</p>
            <p><span>Dimension: </span>{location?.dimension}</p>
            <p><span>Population: </span>{location?.residents?.length}</p>
         </div>
         <div>
            <h2>Residents:</h2>
         </div>
      </div>
   );
};

export default LocationInfo;