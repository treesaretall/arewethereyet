let map;
let service;
let infowindow;
let openInfoWindow;
let selectedType; // Define selectedType variable
let markers = []; // Keep track of markers, erases old ones when type changes.


function initMap() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'), {
      types: ['(cities)']
    });

  autocomplete.addListener('place_changed', searchNearbyPlaces);
  
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

document.getElementById('type').onchange = searchNearbyPlaces;



function searchNearbyPlaces() {
  document.getElementById('places').innerHTML = '';

  let place = autocomplete.getPlace();
  var inputValue = place.name
  getWeather(inputValue);
  

  map.setCenter(place.geometry.location);
  map.setZoom(15);

  service = new google.maps.places.PlacesService(map);

  selectedType = document.getElementById('type').value; // Assign the selected type

  service.nearbySearch({
    location: place.geometry.location,
    radius: '9000',
    type: selectedType // Use the selected type for filtering
}, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    console.log(results.length);

     // Clear existing markers from the map
     clearMarkers();

    for (var i = 0; i < results.length; i++) {
      if (results[i].types.includes(selectedType)) {
        createMarker(results[i], selectedType);
      }
    }
  }
}

function clearMarkers() {
  for (let i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  }
  markers=[];
}

function createMarker(place) {

 
  let table = document.getElementById('places');
  let row = table.insertRow();
  let cell1 = row.insertCell(0);
  cell1.innerHTML = place.name;
  if (place.photos) {
    let photoUrl = place.photos[0].getUrl();
    let cell2 = row.insertCell(1);
    cell2.innerHTML = "<img width='300' height='300' src='" + photoUrl + "'/>";
  } else {
    let photoUrl = "https://via.placeholder.com/150";
    let cell2 = row.insertCell(1);
    cell2.innerHTML = "<img width='300' height='300' src='" + photoUrl + "'/>";
  }
  
//added in marker for infoWindow
const marker = new google.maps.Marker({
  map: map,
  position: place.geometry.location
});
//API request for location information
const request = {
  placeId: place.place_id,
  fields: ['name', 'formatted_address', 'rating', 'types', 'formatted_phone_number', 'photos', 'reviews']
};

// Provided content for the pins
const service = new google.maps.places.PlacesService(map);
service.getDetails(request, (placeResult, status) => {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    const phoneNumber = placeResult.formatted_phone_number ? placeResult.formatted_phone_number : 'Not available';
    const content = `
      <div>
        <h3>${placeResult.name}</h3>
        <p>${placeResult.formatted_address}</p>
        <p>Rating: ${placeResult.rating}</p>
        <p>Phone Number: ${phoneNumber}</p>
        <div class="photos">
        ${placeResult.photos.map(photo => `<img src="${photo.getUrl({ maxWidth: 100 })}"/>`).join('')}
</div>
      <div class="reviews">
        <h4>Reviews:</h4>
         ${placeResult.reviews.map(review => `
          <p>Author: ${review.author_name}</p>
          <p>Rating: ${review.rating}</p>
          <p>Text: ${review.text}</p>
        <hr>
            `).join('')}
</div>
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
      content: content
    });

    marker.addListener('click', function () {
      if (openInfoWindow) {
        openInfoWindow.close();
      }
      infoWindow.open(map, marker);
      openInfoWindow = infoWindow;
    });

    markers.push(marker); // Add marker to the markers array
  }
});
}
function loadGoogleMapsAPI(callback) {
    const script = document.createElement("script");
    const apiKey = 'AIzaSyBjB0EtfnEBOQViQmBwAfKNLtZ6HSDcfas'
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&libraries=places&callback=" + callback;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);

}

loadGoogleMapsAPI("initMap");