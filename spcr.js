/* Copyright 2018 Tryton Van Meer
 *
 * This software is licensed under the GNU GPL (version 3.0 or later).
 * See the LICENSE file in this distribution.
 */

'use strict';

var SPCR_HOMEPAGE = "https://spcr.netlify.com/"


function get_current_app_id()
{
    var url = window.location.href;
    var appid = url.match(/\/(app)\/([0-9]{1,7})/);

    return parseInt(appid[2], 10);
}

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


insert_rating("gold");
