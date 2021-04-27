// // Create a map object.
// var map = L.map("map", {
//     center: [25.5994, -45.6731],
//     zoom: 3
//   });
  
//   // Add a tile layer.
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(map);
  
//   // USGS data
//   var earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//   // Loop through the cities array, and create one marker for each city object.
//   d3.json(earthquakes).then(function(response) {

//     for (var i = 0; i < response.length; i++) {
//         var location = response[i].geometry
//         // var depth = response[i].geometry.coordinates[3]

//         console.log(location)
//     }
//     })  

        // if (location) {
        //     L.marker([location.coordinates[1], location.coordinates[0]]).addTo(map);
        //   }
        // }
      

  
    //     // Conditionals for depth of earthquake
    //     var color = "";
    //     if (depth > 90) {
    //     color = "red";
    //     }
    //     else if (depth > 70) && (depth <= 90) {
    //     color = "darkorange";
    //     }
    //     else if (depth > 50) && (depth <= 70) {
    //     color = "orange";
    //     }
    //     else if (depth > 30) && (depth <= 50) {
    //     color = "dark yellow";
    //     }
    //     else if (depth > 10) && (depth <= 30) {
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
  // });


  // Store our API endpoint as queryUrl.
var USGSUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(USGSUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    var color = "";
        if (depth > 90) {
        color = "red";
        }
        else if (depth > 70) && (depth <= 90) {
        color = "darkorange";
        }
        else if (depth > 50) && (depth <= 70) {
        color = "orange";
        }
        else if (depth > 30) && (depth <= 50) {
        color = "dark yellow";
        }
        else if (depth > 10) && (depth <= 30) {
        color = "yellowgreen";
        }
        else {
        color = "green";
        }
  
        // Add a circle for each earthquake
        L.circle(location.coordinates[1], location.coordinates[0], {
        fillOpacity: 0.75,
        color: "white",
        fillColor: color,
        // Adjust the radius.
        radius: depth * 1500
        }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(map);
    }
  });
    
    
    
    
    
    
    
    
    
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var map = L.map("map", {
    center: [
      37.09, -45.71
    ],
    zoom: 2,
    layers: [street, earthquakes]
  });

  // Layer control.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}