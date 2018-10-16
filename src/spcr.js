/* Copyright 2018 Tryton Van Meer
 *
 * This software is licensed under the GNU GPL (version 3.0 or later).
 * See the LICENSE file in this distribution.
 */

'use strict';

const SPCR_HOMEPAGE = "https://spcr.netlify.com/";
const API_ENDPOINT = "api/v1/reports/summaries/";

function on_error(error)
{
    console.log("Error: $(error)");
}

/* Get the game's appid from the url */
function get_current_app_id()
{
    var url = window.location.href;
    var appid = url.match(/\/(app)\/([0-9]{1,7})/);

    return parseInt(appid[2], 10);
}

function parse_response(response)
{
    var rating;

    if (response.charAt(0) != '<')
    {
        var summary = JSON.parse(response);
        rating = summary.tier;
    }

    return rating;
}

/* Insert the SPCR rating below DEVELOPER/PUBLISHER */
function insert_rating(rating)
{
    var container = document.createElement('div');

    container.className = 'dev_row spcr_rating_row';
    container.title = 'As seen by spcr.netlify.com';

    var link = document.createElement('a');
    link.className = 'spcr_rating_link spcr_rating_' + rating;

    link.href = SPCR_HOMEPAGE + 'app/' + get_current_app_id();
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

function main()
{
    // Don't show spcr rating if native game
    if (document.querySelector('span.platform_img.linux') === null)
    {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function()
        {
            if (request.readyState == 4 && request.status == 200)
            {
                var rating = parse_response(request.responseText);

                if (rating)
                {
                    insert_rating(rating);
                }
            }
        }
        request.open("GET", SPCR_HOMEPAGE + API_ENDPOINT + get_current_app_id() + '.json', true);
        request.send(null);
    }
}

main();
