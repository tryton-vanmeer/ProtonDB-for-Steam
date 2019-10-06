function getRatingContainer(rating, appendToClassName) {
    var container = document.createElement("div");

    container.className = "protondb_rating_row " + appendToClassName;
    container.title = "As seen by the community of ProtonDB.com";

    var link = document.createElement("a");
    link.className = "protondb_rating_link protondb_rating_" + rating;

    link.href = ProtonDB.HOMEPAGE + "app/" + Steam.get_app_id(window.location.href);
    link.textContent = rating;

    var option_new_tab = chrome.storage.local.get("new_tab", (result) => {
        if (result.new_tab) {
            link.target = "_blank"
        }
    });

    container.appendChild(link);
    return container;
}
