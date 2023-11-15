"use strict";

async function insertRating(row) {
  const statsContainer = row.querySelector(".stats");

  if (statsContainer.querySelector(".protondb_rating_link")) {
    return true;
  }

  const appid = row.getAttribute("data-app-id");
  const rating = await getRatingElement(appid);

  const label = document.createElement("div");
  const value = document.createElement("div");

  label.className = "label";
  value.className = "value";

  label.textContent = "ProtonDB:";
  value.append(rating);

  statsContainer.append(label);
  statsContainer.append(value);
}

function insertRatings() {
  const rows = document.getElementById("wishlist_ctn");

  for (const row of rows.getElementsByClassName("wishlist_row")) {
    insertRating(row);
  }

  setTimeout(insertRatings, 1000);
}

insertRatings();
