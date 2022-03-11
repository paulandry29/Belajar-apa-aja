const userLocation = document.getElementById("location");

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showAddress, showError);
    }else{
        userLocation.innerHTML = "Pakai geolocation dong please";
    }
}

function showAddress(position){
    fetch('https://nominatim.openstreetmap.org/reverse.php?' +
            'lat=' + position.coords.latitude +
            '&lon=' + position.coords.longitude +
            '&zoom=16&format=jsonv2')
        .then(response => response.json())
        .then(data => {
            userLocation.innerHTML = data.display_name,
            console.log(data)
        });
}

function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        userLocation.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        userLocation.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        userLocation.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        userLocation.innerHTML = "An unknown error occurred."
        break;
    }
  }