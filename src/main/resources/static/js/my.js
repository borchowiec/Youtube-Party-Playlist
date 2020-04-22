let player;

/**
 * Initialize youtube iframe
 */
function initYoutubeIframe() {
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    onYouTubeIframeAPIReady();
}

/**
 * Set up player when iframe is ready.
 */
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

/**
 * Reacts on changing state of player.
 * @param event Contains info about state of player.
 */
function onPlayerStateChange(event) {
    let icon = "";
    const state = event.data;

    if (state === -1 || state === 0 || state === 2) {
        icon = "fa-play";
    }
    else if (state === 1 || state === 5) {
        icon = "fa-pause";
    }
    else if (state === 3) {
        icon = "fa-spinner";
    }

    // change toggle play button's icon
    $("#togglePlayBtn svg").hide();
    $(`#togglePlayBtn .${icon}`).show();
}

/**
 * Pause or start player
 */
function togglePlay() {
    const state = player.getPlayerState();
    if (state === 0 || state === 2 || state === 5) {
        player.playVideo();
    }
    else {
        player.pauseVideo();
    }
}

/**
 * Create element of playlist.
 * @param index Index of element
 * @param title Title of video
 * @returns {jQuery|HTMLElement} tr
 */
function createPlaylistElement(index, title) {
    const tr = $("<tr></tr>");

    tr.append(`<td>${index}</td>`)
    tr.append(`<td>${title}</td>`)
    tr.append(`<td><button class="button is-danger is-small"><i class="fas fa-trash"></i></button></td>`)
    tr.append(`<td><button class="button is-success is-small"><i class="fas fa-sort-up"></i></button></td>`)
    tr.append(`<td><button class="button is-success is-small"><i class="fas fa-sort-down"></i></button></td>`)

    return tr;
}

function loadDummyPlaylist() {
    const data = ["Title 1", "Ale urwał", "2000 mix", "CATSSS", "MORE CATS", "dogo"];
    data.forEach((title, index) => $("#playlistBody").append(createPlaylistElement(index, title)));
}

$(document).ready(function() {
    connectToPlaylist("OWNER");
    $("#togglePlayBtn").on("click", () => togglePlay());
    $("#prevBtn").on("click", () => console.log("previous")); // todo previous song
    $("#nextBtn").on("click", () => console.log("next")); // todo next song
    $(".idHeader").on("click", () => {
        copyContentOfElementToClipboard("#idSpan");
        showElement("#copyMessage", 3000);
    });
    loadDummyPlaylist(); // todo load real data
    initYoutubeIframe();
});