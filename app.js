const WAIT_MESSAGE = "Analyzing your sighting...";
const ERROR_MESSAGE = "There was an error processing your classination.";
const CLASS_MESSAGES = {
    'Class A': "You saw bigfoot! That's a Class A sighting.",
    'Class B': "You found some evidence of bigfoot like a footprint! That's a Class B sighting.",
    'Class C': "Someone told you about seeing bigfoot! That's a Class C sighting"
};

class App {
  constructor() {
    document.addEventListener('DOMContentLoaded', _ => this.onDocumentLoaded())
  }

  onDocumentLoaded() {
    this.viewController = new ViewController()
  }
}

class View {
  constructor() {
    this._reportTextBox = document.getElementById('report')
    this._messageElements = document.getElementsByClassName('message')
  }

  get report() {
    return this._reportTextBox.value
  }

  set message(value) {
    Array.from(this._messageElements)
      .forEach(element => element.textContent = value);
  }
}

class ViewController {
  constructor() {
    this.model = new Model()
    this.view = new View()

    this.classinateButton = document.getElementById('classinate')
    this.classinateButton.addEventListener('click', () => this.onClassinateClicked())
  }

  onClassinateClicked() {
    this.view.message = WAIT_MESSAGE;
    this.model.classinate(this.view.report)
      .then(classination => {
        console.log(classination);
        this.view.message = classination.message;
      })
      .catch(error => {
        console.log(error);
        this.view.message = ERROR_MESSAGE;
      })
  }

}

class Model {
  constructor() {
    this.adapter = new Adapter()
  }

  classinate(report) {
    return this.adapter.classinate({ sighting: report })
      .then(response => {
        return {
          classination: response.classination,
          message: CLASS_MESSAGES[response.classination.selected]
        }
      })
  }
}

class Adapter {
  classinate(json) {
    return fetch(CLASSINATE_URL, {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(json)
    }).then(response => response.json())
  }
}
