# Planet Age Calculator

### _Epicodus Practice in JavaScript, October 16, 2017_

### By Kelsey Langlois & L. Devin MacKrell

## Description

_This program calculates a user's age and life expectancy based on their birthdate, and gender, then converts both amounts into years on the following planets: Mercury, Venus, Earth, Mars, and Jupiter._

## Setup/Installation Requirements

_This app can be viewed online at [langlk.github.io/pandemic](https://langlk.github.io/pandemic/). To install on your own machine, follow the steps below._

* Clone this repository.
* Open index.html in your web browser.
* To run on a development server:
  * After cloning the repo, run ```npm install``` in the root directory.
  * Then, run ```bower install```.
  * After that, run ```gulp serve```.
  * The site will now be running at ```localhost:3000```

## Specifications

* Program tracks time that has passed.
* Program stores locations and information about them.
* Based on time, program spreads infestation.
  * Infestation spreads every 4 time units.
  * If there are 3 instances of specific infestation at a location being added to, outbreak instead.
* User can move from location to location. (1 time unit)
* User can treat infestation at a location. (1 time unit)
* User can create a cure for an infestation (4 time units)if:
  * User is in the infestation's home neighborhood.
  * User has treated the infestation at least once.
* Every 4 time units, there is a one in eight chance of an epidemic. On an epidemic:
  * rate of infestation increases by 1
  * last location in draw array is selected to receive 3 IU.
  * locations in discard array are shuffled and moved to front of draw array.
* Player wins if all 4 cures are created.
* Player loses if any neighborhood becomes fully infested (3 IU at each location).

## Support and contact details

_Please contact [kels.langlois@gmail.com](mailto:kels.langlois@gmail.com) or [ldmackrell@gmail.com](mailto:ldmackrell@gmail.com) with questions, comments, or issues._

## Technologies Used

* JavaScript
* jQuery
* Bootstrap
* Node.js
* Jasmine/Karma

### License

Copyright (c) 2017 **Kelsey Langlois & L. Devin MacKrell**

*This software is licensed under the MIT license.*
