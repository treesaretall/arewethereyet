let map;
let service;
let infowindow;

function initMap() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'), {
      types: ['geocode']
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
  console.log(place);

  map.setCenter(place.geometry.location);
  map.setZoom(15);

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: place.geometry.location,
    radius: '5000',
    type: [document.getElementById('type').value]
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    console.log(results.length);
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  console.log(place);
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