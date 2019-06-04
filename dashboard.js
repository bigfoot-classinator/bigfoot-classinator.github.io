const DASHBOARD_URL = 'https://bigfoot-classinator.herokuapp.com/dashboard'


document.addEventListener('DOMContentLoaded', onDocumentLoaded)

async function onDocumentLoaded() {

  let centerOfContiguousUs = [ -98.5633, 39.8333 ]
  let mapElement = 'map'
  let zoomLevel = 3

  mapboxgl.accessToken = 'pk.eyJ1IjoiZ3V5cm95c2UiLCJhIjoiY2p3Z3RkZjA1MjF2NTRjbWRtdzdnbmxvbyJ9.8IuKcirKqTBC-Jcm4qd8EA'

  let map = new mapboxgl.Map({
    container: mapElement,
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: centerOfContiguousUs,
    zoom: zoomLevel
  })

  map.on('load', () => onMapLoaded(map))
  map.on('click', 'places', event => onClickedPlace(event, map))
  map.on('mouseenter', 'places', () => onMouseEnteredPlace(map))
  map.on('mouseleave', 'places', () => onMouseLeftPlace(map))

}

async function onMapLoaded(map) {

  let urlParams = new URLSearchParams(window.location.search)
  let threshold = parseFloat(urlParams.get('threshold')) || 2.0
  let quantity = parseInt(urlParams.get('quantity')) || 100

  let url = new URL(DASHBOARD_URL)
  url.searchParams.append('threshold', threshold)
  url.searchParams.append('quantity', quantity)

  console.log(url)

  try {

    let response = await fetch(url)
    let json = await response.json()

    console.log(json);

    let features = json.map(entry => ({
      type: 'Feature',
      properties: {
        description: `
          <strong>${entry.classination}</strong> (${entry.latitude}, ${entry.longitude})<br/>${entry.sighting}`
      },
      geometry: {
        type: 'Point',
        coordinates: [entry.longitude, entry.latitude]
      }
    }))

    map.loadImage('/bigfoot-logo.png', (error, image) => {

      if (error) throw error

      map.addImage('bigfoot', image)
      map.addLayer({
        id: 'places',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: features
          }
        },
        layout: {
          'icon-image': 'bigfoot',
          'icon-size': 0.2
        }
      })
    })


  } catch (error) {
    console.log(error)
    alert(ERROR_MESSAGE)
  }

}

function onClickedPlace(event, map) {

  var coordinates = event.features[0].geometry.coordinates.slice()
  var description = event.features[0].properties.description

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map)
}

function onMouseEnteredPlace(map) {
  map.getCanvas().style.cursor = 'pointer'
}

function onMouseLeftPlace(map) {
  map.getCanvas().style.cursor = ''
}
