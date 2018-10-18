'use strict';

class Steam {
    // Return a games appid from the url
    static get_app_id(url) {
        var appid = url.match(/\/(app)\/([0-9]{1,7})/);

        return parseInt(appid[2], 10);
    }

    // Insert the SPCR rating below DEVELOPER/PUBLISHER
    static store_insert_rating(rating) {
        var container = document.createElement('div');

        container.className = 'dev_row spcr_rating_row';
        container.title = 'As seen by spcr.netlify.com';

        var link = document.createElement('a');
        link.className = 'spcr_rating_link spcr_rating_' + rating;

        link.href = SPCR.HOMEPAGE + 'app/' + Steam.get_app_id(window.location.href);
        link.textContent = rating;

        var option_new_tab = chrome.storage.local.get('new_tab', result => {
            if (result.new_tab)
            {
                link.target = '_blank'
            }
        });

        var subtitle = document.createElement('div');
        subtitle.className = 'subtitle column';
        subtitle.textContent = 'SPCR Rating:';

        container.appendChild(subtitle);
        container.appendChild(link);

        var element = document.querySelector('.user_reviews')

        if (element)
        {
            element.append(container);
        }
    }
}

class SPCR {
    static get HOMEPAGE() {return "https://spcr.netlify.com/";}
    static get API_SUMMARY() {return "api/v1/reports/summaries/";}

    static request_summary(appid, callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            callback(request);
        }
        request.open("GET", this.HOMEPAGE + this.API_SUMMARY + appid + ".json", true);
        request.send(null);
    }
}