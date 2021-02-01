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
