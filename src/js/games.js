"use strict";

async function insertRating(row) {
  const container = row.querySelector("[class*=gameslistitems_Playtime]");

  if (container.querySelector(".gameslistitems_ProtonRating")) {
    return true;
  }

  const url = row.querySelectorAll(
    "a[class*=gameslistitems_GameItemPortrait]"
  )[0].href;
  const rating = await getRatingElement(parseAppId(url));

  const item = document.createElement("span");
  const label = document.createElement("span");

  item.className = "gameslistitems_ProtonRating";
  label.className = "gameslistitems_ProtonRatingLabel";

  label.textContent = "ProtonDB";
  item.append(label);
  item.append(rating);

  container.append(item);
}

function insertRatings() {
  const rows = document.querySelectorAll(
    "div[class*=gameslistitems_GamesListItemContainer]"
  );

  for (const row of rows) {
    insertRating(row);
  }

  setTimeout(insertRatings, 1000);
}

insertRatings();
