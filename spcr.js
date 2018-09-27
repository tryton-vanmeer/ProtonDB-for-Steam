/* Copyright 2018 Tryton Van Meer
 *
 * This software is licensed under the GNU GPL (version 3.0 or later).
 * See the LICENSE file in this distribution.
 */

'use strict';

const SPCR_HOMEPAGE = "https://spcr.netlify.com/";
const RATING_OPTIONS = ['Borked', 'Bronze', 'Silver', 'Gold', 'Platinum'];

/* Get the game's appid from the url */
function get_current_app_id()
{
    var url = window.location.href;
    var appid = url.match(/\/(app)\/([0-9]{1,7})/);

    return parseInt(appid[2], 10);
}

function rating_to_int(rating)
{
    return RATING_OPTIONS.findIndex(s => s.toLowerCase() === rating.toLowerCase()) + 1;
}

function average(reports, precision = 2)
{
    var tally = 0;
    reports.forEach(r =>
    {
        tally += rating_to_int(r.rating);
    });
    return (tally / reports.length).toPrecision(precision);
}

function confidence(reports)
{
    if (reports.length < 3)
    {
        return 0;
    } else if (reports.length < 8)
    {
        return 1;
    } else if (reports.length < 15)
    {
        return 2;
    } else if (reports.length < 25)
    {
        return 3;
    } else
    {
        return 4;
    }
}

function estimate_rating(reports, confidenceThreshold = 1)
{
    return (confidenceThreshold && confidence(reports) < confidenceThreshold)
        ? 'Pending' : RATING_OPTIONS[Math.round(average(reports)) - 1]
}

function parse_reports(response)
{
    var rating;

    if (response.charAt(0) != '<')
    {
        var reports = JSON.parse(response);
        rating = estimate_rating(reports);
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
                var response = request.responseText;

                var rating = parse_reports(request.responseText);

                if (rating)
                {
                    insert_rating(rating);
                }
            }
        }
        request.open("GET", SPCR_HOMEPAGE + 'data/reports/app/' + get_current_app_id() + '.json', true);
        request.send(null);
    }
}

main();
