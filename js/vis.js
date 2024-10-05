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
  // const dataLong = await d3.csv("./datasets/videogames_wide.csv");

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

  const vlSpec2 = vl
    .markLine()
    .title("Global Sales of Genres from 1980 - 2020")
    .data(data)
    .encode(
      vl.y().fieldQ("Global_Sales").aggregate("sum"),
      vl.x().fieldQ("Year").title("Years"),
      vl.color().fieldN("Genre")
    )
    .width("container")
    .height(400)
    .toSpec();

  const vlSpec3 = vl
    .markLine()
    .title("Global Sales of Platforms from 1980 - 2020")
    .data(data)
    .encode(
      vl.y().fieldQ("Global_Sales").aggregate("sum"),
      vl.x().fieldQ("Year").title("Years"),
      vl.color().fieldN("Platform")
    )
    .width("container")
    .height(500)
    .toSpec();

  const vlSpec4 = vl
    .markLine()
    .title("Global Sales of Publishers from 1980 - 2020")
    .data(data)
    .encode(
      vl.y().fieldQ("Global_Sales").aggregate("sum"),
      vl.x().fieldQ("Year").title("Years"),
      vl.color().fieldN("Publisher")
    )
    .width("container")
    .height(400)
    .toSpec();

  const vlSpec5 = vl
    .markBar()
    .title("Regional Sales for PS2")
    .data(data)
    .encode(
      vl.y().fieldQ("NA_Sales").stack("EU_Sales"),
      vl.x().fieldN("Platform"),
      vl.color().fieldQ("NA_Sales"),
      vl.color().fieldQ("EU_Sales"),
      vl.color().fieldQ("JP_Sales"),
      vl.color().fieldQ("Other_Sales")
    )
    .width("container")
    .height(400)
    .toSpec();

  // PS2, Wii, X360
  // NA_Sales,EU_Sales,JP_Sales,Other_Sales

  vegaEmbed("#vis1", vlSpec).then((result) => {
    const view = result.view;
    view.run();
  });

  vegaEmbed("#vis2", vlSpec2).then((result) => {
    const view = result.view;
    view.run();
  });

  vegaEmbed("#vis3", vlSpec3).then((result) => {
    const view = result.view;
    view.run();
  });

  vegaEmbed("#vis4", vlSpec4).then((result) => {
    const view = result.view;
    view.run();
  });

  vegaEmbed("#vis5", vlSpec5).then((result) => {
    const view = result.view;
    view.run();
  });
}

render();
