'use strict'

var log = document.getElementById('status');

function restore()
{
    chrome.storage.local.get({
        'new_tab': false,
        'wishlist_ratings': false
    }, prefs => {
        Object.keys(prefs).forEach(name => {
            document.getElementById(name)[typeof prefs[name]
                === 'boolean' ? 'checked' : 'value'] = prefs[name];
        });
    });
}

function save() {
    const prefs = {
        'new_tab': document.getElementById('new_tab').checked,
        'wishlist_ratings': document.getElementById('wishlist_ratings').checked
    };

    chrome.storage.local.set(prefs, () => {
        log.textContent = 'Options saved.';
        setTimeout(() => log.textContent = '', 750);
        restore();
    })
}

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('button_save').addEventListener('click', () => {
    try
    {
        save();
    }
    catch (e)
    {
        log.textContent = e.message;
        setTimeout(() => log.textContent = '', 750);
    }
});
