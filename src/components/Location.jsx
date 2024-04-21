import React from 'react'

const Location = () => {
    async function getLocation() {
        const geocoder = new google.maps.Geocoder();
        console.log("geocoder",new google.maps.Geocoder());
        const latlng = {
            lat: 12.8637471,
            lng: 80.0777757,
        };

        try {
            const response = await geocoder.geocode({ location: latlng });
            console.log(response.results[0].formatted_address);
        } catch (e) {
            window.alert(`Geocoder failed due to: ${e}`);
        }
    }
  return (
    <div>
      <button onClick={getLocation}>getLocation</button>
    </div>
  )
}

export default Location
