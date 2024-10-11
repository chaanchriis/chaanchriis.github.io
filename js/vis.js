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
  const dataLong = await d3.csv("./datasets/videogames_long.csv");

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
      vl.color().fieldN("Genre").legend(null),
      vl.facet().fieldN("Genre").columns(3)
    )
    .width(250)
    //.width("container")
    .height(300)
    .toSpec();

  const vlSpec3 = vl
    .markArea()
    .title("Global Sales of Platforms from 1980 - 2020")
    .data(data)
    .encode(
      vl.y().fieldQ("Global_Sales").aggregate("sum"),
      vl.x().fieldQ("Year").title("Years"),
      vl.color().fieldN("Platform").scale({ scheme: "spectral" }),
      vl.tooltip().fieldN("Platform")
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
    .title("Regional Sales for each platform")
    .data(dataLong)
    .encode(
      vl
        .y()
        .fieldQ("sales_amount")
        .aggregate("sum")
        .title("Games sold (in millions) in each Region"),
      vl.x().fieldN("sales_region"),
      vl.color().fieldN("sales_region").legend(null),
      vl.facet().fieldN("platform").columns(3),
      vl.tooltip().fieldN("sales_region")
    )
    .width(250)
    .height(400)
    .toSpec();

  //typeof(data[0].Name.includes("Pokemon"))
  pokemonGames = Array[20];
  pokemonGames = data.filter((d) => {
    // Ensure d.name exists and is not null or undefined
    return (
      typeof d.Name === "string" &&
      d.Name.toLowerCase().includes("pok") &&
      d.Global_Sales > 2
    );
  });

  const vlSpec6 = vl
    .markCircle()
    .data(pokemonGames)
    .encode(
      vl.y().fieldN("Name").title("Pokemon Game").sort("-x"),
      vl.x().fieldN("Year").title("Year"),
      vl.size().fieldQ("Global_Sales"),
      vl.color().fieldQ("Global_Sales").scale({ scheme: "spectral" }),
      vl.tooltip([vl.fieldN("Name"), vl.fieldQ("Global_Sales")])
    )
    .title("Global Sales of Pokemon Games")
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

  vegaEmbed("#vis6", vlSpec6).then((result) => {
    const view = result.view;
    view.run();
  });
}

render();
