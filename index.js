const MAP_ELEMENT_ID = 'map'
const ERROR_MSG_ELEMENT_ID = 'geolocation-error-container'
const SHORT_VIBRATION = 100
const LONG_VIBRATION = 300
const NO_VIBRATION = 150
const VIBRATION_PATTERN = [SHORT_VIBRATION,NO_VIBRATION,SHORT_VIBRATION,NO_VIBRATION,SHORT_VIBRATION,
                            NO_VIBRATION,LONG_VIBRATION,NO_VIBRATION,LONG_VIBRATION,NO_VIBRATION,LONG_VIBRATION,
                            NO_VIBRATION,SHORT_VIBRATION,NO_VIBRATION,SHORT_VIBRATION,NO_VIBRATION,SHORT_VIBRATION,]

const map = L.map(MAP_ELEMENT_ID).setView([0, 0], 15)
const markerLayerGroup = L.layerGroup().addTo(map)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

const handleGeolocationSuccess = (pos) => {
    document.querySelector(`#${ERROR_MSG_ELEMENT_ID}`).style.display = 'none'
    
    const coords = [pos.coords.latitude, pos.coords.longitude]
    markerLayerGroup.clearLayers();
    map.setView(coords)
    L.marker(coords).addTo(markerLayerGroup)
}

const handleGeolocationError = (err) => {
    document.querySelector(`#${ERROR_MSG_ELEMENT_ID}`).style.display = undefined
    document.querySelector(`#${ERROR_MSG_ELEMENT_ID} pre`).textContent = err?.message
    console.error('Geolocation Error', err)
}

const sosButtonClickHandler = () => {
    navigator.vibrate(VIBRATION_PATTERN)
}

navigator.geolocation.watchPosition(handleGeolocationSuccess, handleGeolocationError)

navigator.serviceWorker.register('sw.js')