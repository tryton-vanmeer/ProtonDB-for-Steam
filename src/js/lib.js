"use strict";

const PROTONDB_HOMEPAGE = "https://www.protondb.com";

function parseAppId(url) {
  var appid = url.match(/\/(app)\/([0-9]{1,7})/);

  return parseInt(appid[2], 10);
}

function protondbRequestRating(appid, callback) {
  browser.runtime.sendMessage(
    {
      contentScriptQuery: "queryRating",
      appid: appid,
    },
    (rating) => callback(rating)
  );
}

function getRatingElement(appid) {
  var element = document.createElement("a");

  element.classList.add("protondb_rating_link");

  element.href = `${PROTONDB_HOMEPAGE}/app/${appid}`;
  element.target = "_blank";

  protondbRequestRating(appid, (rating) => {
    if (rating === "pending") {
      element.textContent = "Awaiting reports!";
    } else {
      element.textContent = rating;
      element.classList.add(`protondb_rating_${rating}`);
    }
  });

  return element;
}
