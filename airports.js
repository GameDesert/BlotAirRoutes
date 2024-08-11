// Data script.
// IMPORTANT: THIS PROJECT IS IN TWO PARTS, PLEASE ALSO SEE THE FILE "main.js" FOR THE DRAWING AND PLOTTING.

// Process:
// - For each airport provided, get latitude and longitude.
// - Convert latitude and longitude to Cartesian coordinates.
// - Calculate great circle, get start, end, and 3 points in between.
// - Pass to catmullrom function.
// - PLOT! (other script, so just print data and paste there)

import { createReadStream } from 'fs';
import { parse } from 'fast-csv';
import LatLon, { Dms } from 'geodesy/latlon-spherical.js';

let airportLookup = []


// Bounding box here is set to cover all of Europe as a quadrilateral. Alter as you see fit.
// Top left and bottom right ( - | )
const coordinateBoundingBox = [
    [61.43, -14.24],
    [34.56, 27.25]
]

const flights = [
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
 
createReadStream('airports.dat')
    .pipe(parse({ headers: false }))
    .on('error', error => console.error(error))
    .on('data', row => airportLookup.push(row))
    .on('end', () => plot("LCY", "KRK"));

function plot(start, end) {
    const start_coords = getCoordinates(start);
    const end_coords = getCoordinates(end);

    const global_gc = greatCircle(start_coords[0], start_coords[1], end_coords[0], end_coords[1])

    let points = global_gc.map(obj => [obj.lon, obj.lat]);
    // points.unshift([parseFloat(start_coords[1]), parseFloat(start_coords[0])]);
    // points.push([parseFloat(end_coords[1]), parseFloat(end_coords[0])]);

    console.log(points)

    const convertedPoints = points.map(obj => convertToRelative(obj[1], obj[0], coordinateBoundingBox));
    console.log(convertedPoints);

    return convertedPoints;
}

function getCoordinates(airportCode) {
    const row = findRow(airportCode)
    const latitude = row[6].replace(/\s/g, '')
    const longitude = row[7].replace(/\s/g, '')
    console.log(latitude, longitude)
    return [latitude, longitude]
}

function findRow(airportCode) {
    return airportLookup.find(row => row[4] === airportCode)
}

function greatCircle(aLat, aLong, bLat, bLong) {
    const start = new LatLon(aLat, aLong);
    const end = new LatLon(bLat, bLong);

    const midpoints = 5;
    const points = [];

    for (let i = 0; i <= midpoints - 1; i++) {
        const fraction = i / (midpoints - 1);
        const intermediatePoint = start.intermediatePointTo(end, fraction);
        points.push(intermediatePoint);
    }

    console.log(points)
    return points
}

function convertToRelative(lat, long, bbox) {
    // Takes latitude, longitude, and bounding box, then returns points relative to the bounding box as decimals (which can then be multiplied by the canvas size)
    // DON'T FORGET TO ACCOUNT FOR THE FACT THAT BLOT DRAWS FROM BOTTOM LEFT

    const relLong = (long - bbox[0][1]) / (bbox[1][1] - bbox[0][1])
    console.log(relLong)

    const relLat = (lat - bbox[1][0]) / (bbox[0][0] - bbox[1][0]) // Using distance from bottom here; because, again, BLOT DRAWS FROM BOTTOM LEFT
    console.log(relLat)

    return [relLong, relLat] // Longitude first, because it defines the X coordinate, and latitude defines Y
}