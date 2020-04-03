"use strict";

class Steam {
    // Return a games appid from the url
    static get_app_id(url) {
        var appid = url.match(/\/(app)\/([0-9]{1,7})/);

        return parseInt(appid[2], 10);
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

    static get_rating_container(rating, append_to_class_name) {
        var container = document.createElement("div");
    
        container.className = "protondb_rating_row " + append_to_class_name;
        container.title = "As seen by the community of ProtonDB.com";
    
        var link = document.createElement("a");
        link.className = "protondb_rating_link protondb_rating_" + rating;
    
        link.href = ProtonDB.HOMEPAGE + "app/" + Steam.get_app_id(window.location.href);
        link.textContent = rating;
        link.target = "_blank"
    
        container.appendChild(link);
        return container;
    }
}
