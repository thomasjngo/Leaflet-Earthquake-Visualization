// Create a map centered around a specific location
var myMap = L.map('map').setView([37.77, -122.41], 6);

// Add a tile layer for the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the earthquake data from the USGS GeoJSON feed
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
                color = 'orange';
            } else if (depth < 90) {
                color = 'darkorange';
            } else if (depth > 90) {
                color = 'red';
            }
            
            L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                radius: mag * 3,
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
            div.style.padding = '15px';
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