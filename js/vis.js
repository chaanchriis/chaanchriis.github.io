// Add your SVG drawing logic here
const svg = document.getElementById("vis");

// Example: Draw a simple circle in the SVG
const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

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
