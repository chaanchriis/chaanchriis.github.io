let currentBackground = 1;

var backgroundContainer = document.querySelector(".indexHeroContainer");

const oceanButton = document.getElementById("bg1");
const rosemaryButton = document.getElementById("bg2");
const mountainButton = document.getElementById("bg3");

oceanButton.addEventListener("click", () => {
  //   if (bg == currentBackground) {
  //     return;
  //   } else {
  //     currentBackground = 1;
  backgroundContainer.style.backgroundImage = "url(img/bg1.jpg)";
  console.log(backgroundContainer);
  //   }
});

rosemaryButton.addEventListener("click", () => {
  //   if (bg == currentBackground) {
  //     return;
  //   } else {
  //   currentBackground = 2;
  backgroundContainer.style.backgroundImage = "url(img/bg2.jpg)";
  console.log("changed to bg2");

  //   }
});
mountainButton.addEventListener("click", () => {
  //   if (bg == currentBackground) {
  //     return;
  //   } else {
  //   currentBackground = 2;
  backgroundContainer.style.backgroundImage = "url(img/bg3.jpg)";
  console.log("changed to bg3");

  //   }
});

// function background(bg) {
//   if (bg == currentBackground) {
//     return;
//   }
//   switch (bg) {
//     case 1:
//       currentBackground = 1;
//       backgroundContainer.background = "url('../img/oceanbluegreen.png')";
//     case 2:
//       currentBackground = 2;
//       backgroundContainer.background = 'url("../img/rosemary.jpg")';

//     case 3:
//       currentBackground = 3;
//       backgroundContainer.background =
//         'url("../img/milky_way_sky-1920x1080.jpg")';
//   }
// }

//hamburger menu
function hamburger() {
  var x = document.getElementById("topNavbar");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}
