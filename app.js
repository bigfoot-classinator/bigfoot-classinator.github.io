const CLASSINATE_URL = 'https://bigfoot-classinator.herokuapp.com/classinate'

const CLASS_MESSAGES = {
    'Class A': "You saw bigfoot! That's a Class A sighting.",
    'Class B': "You found some evidence of bigfoot like a footprint! That's a Class B sighting.",
    'Class C': "Someone told you about seeing bigfoot! That's a Class C sighting"
}

const ERROR_MESSAGE = "There was an error processing your classination."


document.addEventListener('DOMContentLoaded', onDocumentLoaded)

let classinateButton, sightingTextBox

let fetchSettings = {
  method: 'POST',
  headers: { "Content-Type": "application/json; charset=utf-8" }
}

function onDocumentLoaded() {
  classinateButton = document.getElementById('classinate')
  sightingTextBox = document.getElementById('report')

  classinateButton.addEventListener('click', onClassinateClicked)
}

async function onClassinateClicked() {

  classinateButton.disabled = true

  try {

    let coords = await fetchLocation()

    fetchSettings.body = JSON.stringify({
      latitude: coords.latitude,
      longitude: coords.longitude,
      sighting: sightingTextBox.value
    })

    let response = await fetch(CLASSINATE_URL, fetchSettings)
    let json = await response.json()

    console.log(json);

    alert(CLASS_MESSAGES[json.classination.selected])

  } catch (error) {
    console.log(error);
    alert(ERROR_MESSAGE);
  }

  classinateButton.disabled = false

}

async function fetchLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
      resolve(position.coords)
    })
  })
}
