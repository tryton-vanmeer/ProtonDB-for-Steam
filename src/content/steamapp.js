'use strict'

// Insert the SPCR rating below DEVELOPER/PUBLISHER
function insert_rating(rating) {
    var container = document.createElement("div");

    container.className = "dev_row spcr_rating_row";
    container.title = "As seen by spcr.netlify.com";

    var link = document.createElement("a");
    link.className = "spcr_rating_link spcr_rating_" + rating;

    link.href = SPCR.HOMEPAGE + "app/" + Steam.get_app_id(window.location.href);
    link.textContent = rating;

    var option_new_tab = chrome.storage.local.get("new_tab", result => {
        if (result.new_tab) {
            link.target = "_blank"
        }
    });

    var subtitle = document.createElement("div");
    subtitle.className = "subtitle column'";
    subtitle.textContent = "SPCR Rating:";

    container.appendChild(subtitle);
    container.appendChild(link);

    var element = document.querySelector(".user_reviews")

    if (element)
    {
        element.append(container);
    }
}

if (document.querySelector("span.platform_img.linux") === null) {
    var appid = Steam.get_app_id(window.location.href);

    SPCR.request_summary(appid, (request) => {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var json = JSON.parse(request.responseText)
                insert_rating(json.tier);
            } else if (request.status == 404) {
                insert_rating("Awaiting reports!");
            }
        }
    });
}