"use strict";

// Insert the ProtonDB rating below DEVELOPER/PUBLISHER
function insert_rating(rating) {
    var element = document.querySelector(".user_reviews");
    var subtitle = document.createElement("div");
    subtitle.className = "subtitle column'";
    subtitle.textContent = "ProtonDB Rating:";
    var container = ProtonDB.get_rating_container(rating, "steam_row");
    container.prepend(subtitle);

    if (element) {
        element.append(container);
    }
}

if (document.querySelector("span.platform_img.linux") === null) {
    var appid = Steam.get_app_id(window.location.href);

    ProtonDB.request_rating(appid, (rating) => {
        if (rating == "pending") {
            insert_rating("Awaiting reports!");
        } else {
            insert_rating(rating);
        }
    });
}