"use strict";

class ProtonDB {
    static get HOMEPAGE() {return "https://www.protondb.com/";}
    static get API_SUMMARY() {return "api/v1/reports/summaries/";}

    static request_summary(appid, callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            callback(request);
        }
        request.open("GET", this.HOMEPAGE + this.API_SUMMARY + appid + ".json", true);
        request.send(null);
    }

    static request_rating(appid, callback)
    {
        chrome.runtime.sendMessage(
            {contentScriptQuery: "queryRating", appid: appid},
            rating => callback(rating)
        );
    }

    static get_rating_container(rating, whitelisted = false) {
        var container = document.createElement("div");

        container.className = "protondb_rating_row " + "steam_row";
        container.title = "As seen by the community of ProtonDB.com";

        var link = document.createElement("a");
        link.className = "protondb_rating_link protondb_rating_" + rating;

        link.href = ProtonDB.HOMEPAGE + "app/" + Steam.get_app_id(window.location.href);
        link.textContent = rating;
        link.target = "_blank"

        if (whitelisted) {
            var star = document.createElement("span");
            star.className = "protondb_rating_whitelisted"
            star.title = "Whitelisted by Valve";
            star.textContent = " ★"

            link.appendChild(star);
        }

        container.appendChild(link);
        return container;
    }
}
