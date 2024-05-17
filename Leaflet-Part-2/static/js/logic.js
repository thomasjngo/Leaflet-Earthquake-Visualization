// Create a map
var myMap = L.map('map').setView([0, 0], 2);

// Add base maps to choose from
var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var satelliteMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 19,
    id: 'mapbox.satellite',
    accessToken: 'Insert Mapbox Key'
});

// Create overlays for earthquake data and tectonic plates data
var earthquakesOverlay = L.layerGroup().addTo(myMap);
var tectonicPlatesOverlay = L.layerGroup().addTo(myMap);

// Add layer controls
var baseMaps = {
    "Street View": streetMap,
    "Satellite View": satelliteMap
};

var overlayMaps = {
    "Earthquakes": earthquakesOverlay,
    "Tectonic Plates": tectonicPlatesOverlay
};

L.control.layers(baseMaps, overlayMaps).addTo(myMap);

var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Loop through the earthquake data and create markers
        data.features.forEach(feature => {
            var mag = feature.properties.mag;
            var depth = feature.geometry.coordinates[2];
            var color = 'red';

            if (depth < 10) {
                color = 'lime';
            } else if (depth < 30) {
                color = 'greenyellow';
            } else if (depth < 50) {
                color = 'yellow';
            } else if (depth < 70) {
                color = 'darkorange';
            } else if (depth < 90) {
                color = 'orangered';
            } else if (depth > 90) {
                color = 'red';
            }
            
            L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                radius: mag * 4,
                fillColor: color,
                color: 'black',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup(`<b>Location:</b> ${feature.properties.place}<br><b>Magnitude:</b> ${mag}<br><b>Depth:</b> ${depth}`).addTo(myMap);
        });

        // Create a legend
        var legend = L.control({ position: 'bottomright' });
        legend.onAdd = function () {
            var div = L.DomUtil.create('div', 'info legend');
            div.style.backgroundColor = 'white';
            div.style.padding = '10px';
            div.innerHTML = '<h2>Depth (km)</h2>' +
                '<i class="square" style="background: lime;"></i><10<br>' +
                '<i class="square" style="background: greenyellow;"></i>10-30<br>' +
                '<i class="square" style="background: yellow;"></i>>30-50<br>'+
                '<i class="square" style="background: orange;"></i>>50-70<br>'+
                '<i class="square" style="background: darkorange;"></i>>70-90<br>'+
                '<i class="square" style="background: red;"></i>>90+';

            // Style for the colored squares
            var style = document.createElement('style');
            style.innerHTML = '.square { display: inline-block; width: 10px; height: 10px; margin-right: 5px; }';
            div.appendChild(style);
        
            return div;
        };
        legend.addTo(myMap);
    });

// Load tectonic plates data
var tectonicPlatesDataUrl = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json';
fetch(tectonicPlatesDataUrl)
    .then(response => response.json())
    .then(data => {
        L.geoJson(data, {
            style: function (feature) {
                return {
                    color: "orange",
                    weight: 2
                };
            }
        }).addTo(tectonicPlatesOverlay);
    });