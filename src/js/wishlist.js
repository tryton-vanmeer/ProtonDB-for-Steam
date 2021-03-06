console.log('wishlist.js');

class Wishlist {
    static create_rating(rating, app_id, isWhitelisted, isNative) {
        const ratingLink = document.createElement('a');
        ratingLink.classList.add('protondb_rating_link');
        ratingLink.style.verticalAlign = 'middle';
        
        if (isNative) {
            ratingLink.classList.add('protondb_rating_native');
            ratingLink.textContent = "Native";
        } else if (rating !== 'pending') {
            ratingLink.classList.add('protondb_rating_' + rating);
            ratingLink.textContent = rating;
        } else {
            ratingLink.textContent = 'Awaiting Reports!';
        }

        ratingLink.href = ProtonDB.HOMEPAGE + "app/" + app_id;
        ratingLink.target = '_blank';
    
        if (isWhitelisted) {
            const star = document.createElement('span');
            star.classList.add('protondb_rating_whitelisted');
            star.title = 'Whitelisted by Valve';
            star.textContent = ' ★';
    
            ratingLink.appendChild(star);
        }
    
        return ratingLink;
    }
    
    static load_ratings() {
        const rows = document.getElementById('wishlist_ctn');
        for (const row of rows.getElementsByClassName('wishlist_row')) {
            const app_id = row.getAttribute('data-app-id');
            const stats_container = row.querySelector('.stats');
    
            // If a protondb rating has already been loaded, skip to the next wishlist item.
            if (stats_container.querySelector('.protondb_rating_link')) {
                continue;
            }

            ProtonDB.request_rating(app_id, rating => {
                console.log('Processing rating for ' + app_id + ' (' + rating + ')');
                const isWhitelisted = whitelist.includes(app_id);

                const isNative = row.querySelector('.platform_img.linux') !== null;
                const rating_container = Wishlist.create_rating(rating, app_id, isWhitelisted, isNative);
                
                const rating_field_label = document.createElement('div');
                rating_field_label.classList.add('label');
                rating_field_label.textContent = 'ProtonDB Rating:';

                const rating_field_value = document.createElement('div');
                rating_field_value.classList.add('value');
                rating_field_value.append(rating_container);

                stats_container.append(rating_field_label);
                stats_container.append(rating_field_value);
            });
        }
    
        setTimeout(Wishlist.load_ratings, 1000);
    }
}


if (document.readyState === 'complete') {
    Wishlist.load_ratings();
} else {
    document.addEventListener('readystatechange', _ => {
        if (document.readyState === 'complete') {
            Wishlist.load_ratings();
        }
    });
}
