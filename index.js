// Drawing script.
// THIS PROJECT CONSISTS OF TWO PARTS!
// 1. This drawing script.
// 2. The maths script, airports.js, found at https://github.com/GameDesert/BlotAirRoutes
// This part 2 creates the API, which couldn't be included in this file due to import constraints.

// List of flight paths (in Europe) to plot

const width = 125;
const height = 125;

setDocDimensions(width, height);


// These airports can be changed to any in Europe (excluding maybe very Northern bits)
// Use IATA Codes
const airports = [
    {
      "from": "KRK",
      "to": "PMI"
    },
    {
      "from": "MAD",
      "to": "PMI"
    },
    {
      "from": "MAD",
      "to": "KRK"
    },
    {
      "from": "FCO",
      "to": "CTA"
    },
    {
      "from": "MAD",
      "to": "LIS"
    },
    {
      "from": "OSL",
      "to": "SVG"
    },
    {
      "from": "ATH",
      "to": "SKG"
    },
    {
      "from": "FCO",
      "to": "PMO"
    },
    {
      "from": "MAD",
      "to": "ORY"
    },
    {
      "from": "CDG",
      "to": "NCE"
    },
    {
      "from": "ATH",
      "to": "HER"
    },
    {
      "from": "MAD",
      "to": "IBZ"
    },
    {
      "from": "AMS",
      "to": "KRK"
    },
    {
      "from": "ATH",
      "to": "JTR"
    },
    {
      "from": "AMS",
      "to": "CDG"
    },
    {
      "from": "AAL",
      "to": "CPH"
    },
    {
      "from": "LCY",
      "to": "FRA"
    },
    {
      "from": "LCY",
      "to": "PMI"
    },
    {
      "from": "AMS",
      "to": "MAD"
    },
    {
      "from": "FCO",
      "to": "CAG"
    },
    {
      "from": "FCO",
      "to": "MAD"
    },
    {
      "from": "AMS",
      "to": "LIS"
    },
    {
      "from": "ATH",
      "to": "CDG"
    },
    {
      "from": "ATH",
      "to": "CHQ"
    },
    {
      "from": "AMS",
      "to": "AGP"
    },
    {
      "from": "MAD",
      "to": "LHR"
    },
    {
      "from": "CDG",
      "to": "KRK"
    },
    {
      "from": "CDG",
      "to": "BOD"
    },
    {
      "from": "MAD",
      "to": "FRA"
    },
    {
      "from": "CPH",
      "to": "OSL"
    },
    {
      "from": "BRU",
      "to": "MAD"
    },
    {
      "from": "FCO",
      "to": "CDG"
    },
    {
      "from": "DUB",
      "to": "LHR"
    },
    {
      "from": "OSL",
      "to": "STN"
    },
    {
      "from": "FRA",
      "to": "TXL"
    },
    {
      "from": "TLS",
      "to": "ORY"
    },
    {
      "from": "NCE",
      "to": "ORY"
    },
    {
      "from": "TXL",
      "to": "MUC"
    },
    {
      "from": "LGW",
      "to": "KRK"
    },
    {
      "from": "LHR",
      "to": "FRA"
    }
  ];
const jsonString = JSON.stringify(airports);





function drawout(paths) {
  let finalLines = [];
  paths.forEach(object => {
    finalLines.push(bt.catmullRom(object));
  });
  console.log(finalLines);
  drawLines(finalLines);
}

const xhr = new XMLHttpRequest();

xhr.open("POST", "https://flightconvert.kotla.eu/plot-flights", false);
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(jsonString);

if (xhr.status === 200) {
    const responseArray = JSON.parse(xhr.responseText);
    console.log(responseArray);

    drawout(responseArray);
}