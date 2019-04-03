# The Bigfoot Classinator

This repository contains the code needed to deploy the Bigfoot Classinator. The Bigfoot Classinator makes use of a microservice that in turn makes use of a model built with [DataRobot](https://www.datarobot.com/). The code for the microservice can be found [here](https://github.com/bigfoot-classinator/bigfoot-classinator-server). The code and data for building that model can be found [here](https://github.com/bigfoot-classinator/bigfoot-classinator-model).

This README contains the instructions on how to use said code so that you can build the Bigfoot Classinator yourself. Because everyone needs to classinate Bigfoot sightings.

## Deploying the Code

The code in this repository is a simple static website. It just needs deployed to a webserver to work. There are a couple of small tidbits to get it working in your environment. Well, one really. In `app.js` on the very first line you will see this code:

```javascript
const CLASSINATE_URL = 'https://bigfoot-classinator.herokuapp.com/classinate'
```

This will point to my deployed version of the microservice on Heroku. You will want to comment out this line and uncomment the second line of `app.js` making the application point to the local version of your microservice:

```javascript
const CLASSINATE_URL = 'http://localhost:5000/classinate'
```

If you have some other place you'd like the Bigfoot Classinator to point, I'm sure you can figure out how to change the URL to what best meets your needs.

## Running the Code Locally

I have written a little shell script called `run.sh` that will help you run this code if you are using Linux or MacOS and have Python 3.x installed. If you're doing the rest of this exercise, you have some flavor of Python 3 installed. If you're on Windows, you can accomplish the same thing by running:

    $ python -m http.server 8000

## That's It

Not much to do here except serve up a folder full of files over HTTP. Have fun squatching!
