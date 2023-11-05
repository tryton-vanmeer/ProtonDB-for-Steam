"use strict";

const PROTONDB_API_SUMMARY =
  "https://www.protondb.com/api/v1/reports/summaries";

function protondbRequestRating(request, sendResponse) {
  var url = `${PROTONDB_API_SUMMARY}/${request.appid}.json`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        if (response.status == 404) {
          sendResponse("pending");
        }
        throw Error(response.status);
      }

      return response.json();
    })
    .then((data) => sendResponse(data.tier))
    .catch((error) => console.log(error));

  return true;
}

function onMessage(request, _, sendResponse) {
  if (request.contentScriptQuery == "queryRating") {
    return protondbRequestRating(request, sendResponse);
  }

  return false;
}

browser.runtime.onMessage.addListener(onMessage);
