// Drawing script.
// IMPORTANT: THIS PROJECT IS IN TWO PARTS, PLEASE ALSO SEE THE FILE "airports.js" FOR THE ACTUAL MATHEMATICS AND DATA PROCESSING.

// List of flight paths (in Europe) to plot

const width = 125;
const height = 125;

setDocDimensions(width, height);

const airports = [{
  "from": "KRK",
  "to": "SZZ"
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

xhr.open("POST", "https://flightconvert.kotla.eu/plot-flights", false); // `false` makes the request synchronous
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(jsonString);

if (xhr.status === 200) {
    const responseArray = JSON.parse(xhr.responseText);
    console.log(responseArray);

    // Process the data immediately after receiving the response
    drawout(responseArray);
}