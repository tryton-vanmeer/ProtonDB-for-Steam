"use strict";

function insert_rating(wishlist_row, rating) {
        var appid = wishlist_row.attributes["data-app-id"].nodeValue;

        var label = document.createElement("div");
        label.className = "label";
        label.textContent = "ProtonDB Rating:";

        var container = getRatingContainer(rating, "value");
        var element = wishlist_row.getElementsByClassName("stats")[0];

        if (element) {
            element.append(label);
            element.append(link);
        }
}

var callback = function(mutationsList) {
    for (var mutation of mutationsList) {
        let wishlist_row = mutation.addedNodes[0];
        if (wishlist_row) {
            if (wishlist_row.querySelector("span.platform_img.linux") === null &&
                wishlist_row.getElementsByClassName("protondb_rating").length == 0) {
                let appid = wishlist_row.attributes["data-app-id"].nodeValue;

                ProtonDB.request_rating(appid, (rating) => {
                    if (rating == "pending") {
                        insert_rating(wishlist_row, "Awaiting reports!");
                    } else {
                        insert_rating(wishlist_row, rating);
                    }
                });
            }
        }
    }
};

chrome.storage.local.get("wishlist_ratings", result => {
    if (result.wishlist_ratings) {
        // Create observer for wishlist
        var observer = new MutationObserver(callback);
        observer.observe(document.getElementById("wishlist_ctn"), {childList: true});
    }
});
