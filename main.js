// Drawing script.
// IMPORTANT: THIS PROJECT IS IN TWO PARTS, PLEASE ALSO SEE THE FILE "airports.js" FOR THE ACTUAL MATHEMATICS AND DATA PROCESSING.

// List of flight paths (in Europe) to plot

const width = 125;
const height = 125;

setDocDimensions(width, height);

const airports = [
    {
        "from": "KRK",
        "to": "PMI"
    },
    // ... rest of the airports data
];

// Send the airports data to the API and retrieve the flight paths
fetch("https://flightconvert.kotla.eu/plot-flights", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(airports)
})
    .then(response => response.json())
    .then(data => {

        const paths = data;

        let finalLines = [];

        // create a polyline
        paths.forEach(object => {
            finalLines.push(bt.catmullRom(object));
        });

        // draw it
        drawLines(finalLines);
    })
    .catch(error => {
        console.error("Error:", error);
    });
