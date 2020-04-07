"use strict";

class Steam {
    // Return a games appid from the url
    static get_app_id(url) {
        var appid = url.match(/\/(app)\/([0-9]{1,7})/);

        return parseInt(appid[2], 10);
    }

    // Insert the ProtonDB rating below DEVELOPER/PUBLISHER
    static insert_rating(rating, whitelisted = false) {
        var element = document.querySelector(".user_reviews");
        var subtitle = document.createElement("div");
        subtitle.className = "subtitle column'";
        subtitle.textContent = "ProtonDB Rating:";
        var container = ProtonDB.get_rating_container(rating, whitelisted);
        container.prepend(subtitle);
    
        if (element) {
            element.append(container);
        }
    }
}

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

// Main
var appid = Steam.get_app_id(window.location.href);

if (document.querySelector("span.platform_img.linux") === null) {
    ProtonDB.request_rating(appid, (rating) => {
        if (rating == "pending") {
            Steam.insert_rating("Awaiting reports!");
        } else {
            Steam.insert_rating(rating, whitelist.includes(appid) ? true : false);
        }
    });
} else {
    Steam.insert_rating("native");
}