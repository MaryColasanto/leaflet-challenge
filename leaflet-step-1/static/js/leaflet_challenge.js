// Create a map object.
var map = L.map("map", {
    center: [25.5994, -45.6731],
    zoom: 3
  });
  
  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // USGS data
  var earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

  // Loop through the cities array, and create one marker for each city object.
  d3.json(earthquakes).then(function(response) {

    for (var i = 0; i < response.length; i++) {
        var location = response[i].geometry
        var depth = response[i].geometry.coordinates[3]

        console.log(location)

        if (location) {
            L.marker([location.coordinates[1], location.coordinates[0]]).addTo(map);
          }
        }
      

  
    //     // Conditionals for depth of earthquake
    //     var color = "";
    //     if (depth > 90) {
    //     color = "red";
    //     }
    //     else if (depth > 100) {
    //     color = "darkorange";
    //     }
    //     else if (depth > 90) {
    //     color = "orange";
    //     }
    //     else if (depth > 100) {
    //     color = "dark yellow";
    //     }
    //     else if (depth > 90) {
    //     color = "yellowgreen";
    //     }
    //     else {
    //     color = "green";
    //     }
  
    //     // Add a circle for each earthquake
    //     L.circle(location.coordinates[1], location.coordinates[0], {
    //     fillOpacity: 0.75,
    //     color: "white",
    //     fillColor: color,
    //     // Adjust the radius.
    //     radius: depth * 1500
    //     }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(map);
    // }
  });