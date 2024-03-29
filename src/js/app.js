"use strict";

const RATING_APP_DESKTOP_ID = "protondbRatingAppDesktop";
const RATING_APP_MOBILE_ID = "protondbRatingAppMobile";

function insertRatingDesktop(appid) {
  var rootElement = document.querySelector(".glance_ctn_responsive_left");

  if (rootElement.querySelector(`#${RATING_APP_DESKTOP_ID}`)) {
    return;
  }

  var row = document.createElement("div");
  var subtitleColumn = document.createElement("div");
  var summaryColumn = document.createElement("div");

  row.id = RATING_APP_DESKTOP_ID;
  row.className = "protondb_row dev_row";
  subtitleColumn.className = "subtitle column";
  summaryColumn.className = "summary column";

  subtitleColumn.textContent = "ProtonDB:";
  summaryColumn.append(getRatingElement(appid));

  row.append(subtitleColumn);
  row.append(summaryColumn);

  rootElement.append(row);
}

function insertRatingMobile(appid) {
  var rootElement = document.getElementById("appHeaderGridContainer");

  if (rootElement.querySelector(`#${RATING_APP_MOBILE_ID}`)) {
    return;
  }

  var label = document.createElement("div");
  var content = document.createElement("div");

  label.id = RATING_APP_MOBILE_ID;
  label.className = "grid_label";
  content.className = "grid_content";

  label.append("ProtonDB");
  content.append(getRatingElement(appid));

  rootElement.append(label);
  rootElement.append(content);
}

function insertRatings(appid) {
  insertRatingDesktop(appid);
  insertRatingMobile(appid);
}

insertRatings(parseAppId(window.location.href));
