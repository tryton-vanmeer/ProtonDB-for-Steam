function insertRatingDesktop(appid) {
  var rootElement = document.querySelector(".glance_ctn_responsive_left");

  var row = document.createElement("div");
  var subtitleColumn = document.createElement("div");
  var summaryColumn = document.createElement("div");

  row.className = "protondb_row dev_row";
  subtitleColumn.className = "subtitle column";
  summaryColumn.className = "summary column";

  subtitleColumn.textContent = "ProtonDB:";
  summaryColumn.appendChild(getRatingElement(appid));

  row.append(subtitleColumn);
  row.append(summaryColumn);
  rootElement.append(row);
}

function insertRatingMobile(appid) {
  var rootElement = document.getElementById("appHeaderGridContainer");

  var label = document.createElement("div");
  var content = document.createElement("div");

  label.className = "grid_label";
  content.className = "grid_content";

  label.append("ProtonDB");
  content.append(getRatingElement(appid));

  rootElement.append(label);
  rootElement.append(content);
}

var appid = parseAppId(window.location.href);

insertRatingDesktop(appid);
insertRatingMobile(appid);
