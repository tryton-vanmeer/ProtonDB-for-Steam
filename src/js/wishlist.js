"use strict";

function isGrid(div) {
  return getComputedStyle(div).display == "grid";
}

async function insertRating(panel) {
  const grid = [...panel.querySelectorAll("div")].filter(isGrid)[0];

  if (grid.querySelector(".protondb_rating_link")) {
    return true;
  }

  // increase height of panel to accommodate new row
  const inner = panel.childNodes[0].childNodes[0];
  const innerHeight = parseInt(getComputedStyle(inner).height);
  inner.style.height = `${innerHeight + 20}px`;

  const appid = parseAppId(panel.querySelector("a").href);
  const rating = await getRatingElement(appid);

  const label = document.createElement("div");
  const value = document.createElement("div");

  label.className = "label";
  value.className = "value";

  label.textContent = "ProtonDB:";
  value.append(rating);

  grid.append(label);
  grid.append(value);
}

function insertRatings() {
  const panels = document.querySelectorAll("div.Panel[data-index]");

  for (const panel of panels) {
    insertRating(panel);
  }

  setTimeout(insertRatings, 1000);
}

insertRatings();
