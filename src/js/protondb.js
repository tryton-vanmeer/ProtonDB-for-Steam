"use strict";

class ProtonDB {
    static get HOMEPAGE() { return "https://www.protondb.com/"; }
    static get API_SUMMARY() { return "api/v1/reports/summaries/"; }

    static request_rating(appid, callback) {
        browser.runtime.sendMessage(
            { contentScriptQuery: "queryRating", appid: appid },
            rating => callback(rating)
        );
    }

    static get_rating_container(rating, whitelisted = false) {
        var container = document.createElement("div");

        container.className = "protondb_rating_row dev_row";
        container.title = "As seen by the community of ProtonDB.com";

        var link = document.createElement("a");
        link.className = `protondb_rating_link protondb_rating_${rating}`;

        link.href = ProtonDB.HOMEPAGE + "app/" + Steam.get_app_id(window.location.href);
        link.textContent = rating;
        link.target = "_blank"

        if (whitelisted) {
            var star = document.createElement("span");
            star.className = "protondb_rating_whitelisted"
            star.title = "Whitelisted by Valve";
            star.textContent = " ★"

            link.append(star);
        }

        container.append(link);
        return container;
    }
}
