// Add your SVG drawing logic here
const svg = document.getElementById("vis");

// Example: Draw a simple circle in the SVG
const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

//My attempt at making a parabola of circles to be displayed in a rainbow
for (let i = 0; i < colors.length; i++) {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );

  let cy = 0;
  if (i <= 3) {
    cy = -0.5 * i ** 2 - 3 * i + 250;
  } else {
    cy = 0.5 * i ** 2 - 3 * i + 250;
  }

  let cx = i * 45 + 60;

  console.log("i = " + i);
  console.log("cy = " + cy);

  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", "30");
  circle.setAttribute("fill", colors[i]);
  svg.appendChild(circle);
}


// Create and render the bar chart
// async function to load data from datasets/videogames_long.csv using d3.csv and then make visualizations
async function render() {
  // load data
  const data = await d3.csv("./datasets/videogames_wide.csv");

  // create a bar chart
  const vlSpec = vl
    .markBar()
    .data(data)
    .encode(
      vl.y().fieldN("Platform").sort("-x"),
      vl.x().fieldQ("Global_Sales").aggregate("sum")
    )
    .width("container")
    .height(400)
    .toSpec();

  vegaEmbed("#vis1", vlSpec).then((result) => {
    const view = result.view;
    view.run();
  });
}

render();
