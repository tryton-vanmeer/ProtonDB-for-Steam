'use strict'

if (document.querySelector("span.platform_img.linux") === null) {
    var appid = Steam.get_app_id(window.location.href);

    SPCR.request_summary(appid, (request) => {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var json = JSON.parse(request.responseText)
                Steam.store_insert_rating(json.tier);
            } else if (request.status == 404) {
                Steam.store_insert_rating("Awaiting reports!");
            }
        }
    });
}