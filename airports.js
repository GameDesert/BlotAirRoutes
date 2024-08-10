// Data script.
// IMPORTANT: THIS PROJECT IS IN TWO PARTS, PLEASE ALSO SEE THE FILE "main.js" FOR THE DRAWING AND PLOTTING.

// Process:
// - For each airport provided, get latitude and longitude.
// - Convert latitude and longitude to Cartesian coordinates.
// - Calculate great circle, get start, end, and 3 points in between.
// - Pass to catmullrom function.
// - PLOT! (other script, so just print data and paste there)

const fs = require('fs')
const csv = require('fast-csv');

const airportLookup = []


// Bounding box here is set to cover all of Europe as a square. Alter as you see fit.
// Moving clockwise from top left
coordinateBoundingBox = [
    [61.43, -14.24],
    [61.43, 27.25],
    [34.56, 27.25],
    [34.56, -14.24]
]

flights = [
    {
        "from": "EDI",
        "to": "VIE"
    },
    {
        "from": "PRG",
        "to": "GOA"
    },
    {
        "from": "PIS",
        "to": "WAW"
    },
    {
        "from": "PIS",
        "to": "GOA"
    },
    {
        "from": "BCN",
        "to": "VIE"
    },
    {
        "from": "LCY",
        "to": "PRG"
    },
    {
        "from": "EDI",
        "to": "CPH"
    },
    {
        "from": "MAD",
        "to": "PRG"
    },
    {
        "from": "PIS",
        "to": "EDI"
    },
    {
        "from": "BCN",
        "to": "PRG"
    },
    {
        "from": "GOA",
        "to": "LCY"
    },
    {
        "from": "",
        "to": "WAW"
    }
]
 
fs.createReadStream('airports.dat')
    .pipe(csv.parse({ headers: false }))
    .on('error', error => console.error(error))
    .on('data', row => airportLookup.push(row))
    .on('end', () => plot(flights));

function plot(flights) {
    getCoordinates("LCY")
}

function getCoordinates(airportCode) {
    const row = findRow(airportCode)
    const latitude = row[6].replace(/\s/g, '')
    const longitude = row[7].replace(/\s/g, '')
    console.log(latitude, longitude)
}

function findRow(airportCode) {
    return airportLookup.find(row => row[4] === airportCode)
}

function convertToRelative(lat, long, bbox) {
    // Takes latitude, longitude, and bounding box, then returns points relative to the bounding box as decimals (which can then be multiplied by the canvas size)
    // DON'T FORGET TO ACCOUNT FOR THE FACT THAT BLOT DRAWS FROM BOTTOM LEFT
}