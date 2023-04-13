function createMap(pointsOfInterest) {

  
    // Create the tile layer that will be the background of our map.
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
  
    // Create a baseMaps object to hold the streetmap layer.
    var baseMaps = {
      "Street Map": streetmap
    };
  
    // Create an overlayMaps object.
    var overlayMaps = {
      "Attractions": pointsOfInterest
    };
  
    // Create the map object with options.
    var map = L.map("poi_map", {
      center: [cityLat, cityLon],
      zoom: 12,
      layers: [streetmap, pointsOfInterest]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: true
    }).addTo(map);
  }
  
  function createMarkers(response2) {

    console.log(response2)
    // Pull the response.data.
    var POIs = response2.features;
    console.log(POIs)
    // Initialize an array to hold the markers.
    var touristSites = [];
    
    var greenIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Loop through the POIs array.
    for (var index = 0; index < POIs.length; index++) {
      var site = POIs[index];
  
      // For each site, create a marker, and bind a popup with the site's name.
      var touristMarker = L.marker([site.properties.lat, site.properties.lon])
        .bindPopup("<h3>" + site.properties.name + "<h3><h3>Street: " + site.properties.street + "</h3>");
        
      // Add the marker to the array.
      touristSites.push(touristMarker);
    }
  
    // Create a layer group and pass it to the createMap function.
    createMap(L.layerGroup(touristSites));
  }
  
  function findCity(response) {
    
    /*  NOT SURE HOW TO MAKE THIS CODE WORK
    var selector = d3.select("#hoteldata")

    d3.json(markerURL).then((data)) => {

      let city_Lat = data.city_lat;
      for( let lat = 0; i <10; i++){
          let c_lat = city_lat[i]
          selector.append.... 

      }*/
      let city_lon = data.city_lon;
    }
    var b =document.getElementById('hoteldata');
    var city_lat = b.hotel_lat;
    var city_lon = b.hotel_lon;

    //use response to find city coordinates
   // cityLat = response["results"][0]["lat"]
    //cityLon = response["results"][0]["lon"]
    radius = 25000

    categories = "tourism"
    limit = 200
    filters = `circle%3A${cityLon}%2C${cityLat}%2C${radius}`
    geoKey = "e36b93f065f8427b8961aa2d1de2d5b1"
    bias = `proximity:${city_Lon},${city_Lat}`

    params = {
      "categories":categories,
      "limit":limit,
      "filter":filters,
      "apiKey":geoKey    
  }

    markerURL = (`https://api.geoapify.com/v2/places?categories=${categories}&limit=${limit}&filter=${filters}&apiKey=${geoKey}`)
    console.log(markerURL)

    d3.json(markerURL).then(function(data) {
      //console.log(data)
      createMarkers(data)

    })

   
  }
  // Perform an API call. Call findCity when it completes.
  target_city = 'Chicago'
  geoKey = "e36b93f065f8427b8961aa2d1de2d5b1"
  url = (`https://api.geoapify.com/v1/geocode/search?text="${target_city}&format=json&apiKey=${geoKey}`)
  d3.json(url).then(findCity);

  //https://api.geoapify.com/v1/geocode/search?text={target_city}&format=json&apiKey=

  //  d3.json("https://api.geoapify.com/v2/places?categories=tourism&filter=place:
  //5114c48e44e4eb55c0590c5397644ceb4440f00101f901ecde010000000000c002069203074368696361676f&lang=en&
  //limit=200&apiKey=e36b93f065f8427b8961aa2d1de2d5b1").then(createMarkers);


