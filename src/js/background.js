"use strict";

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.contentScriptQuery == "queryRating") {
        var url = "https://www.protondb.com/" + "api/v1/reports/summaries/" + request.appid + ".json";

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    if (response.status == 404) {
                        sendResponse("pending");
                    }
                    throw Error(response.status);
                }

                return response.json();
            })
            .then(data => sendResponse(data.tier))
            .catch(error => console.log(error))

        return true;
    }
}
);
