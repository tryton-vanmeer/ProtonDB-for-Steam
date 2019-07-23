'use strict';

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
}
