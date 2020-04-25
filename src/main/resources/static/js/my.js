let player;
let videos = [];

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
 * Adds video to cookies and to page.
 * @param videoInfo contains video's data
 */
function addVideo(videoInfo) {
    setPlaylistFromCookies();

    videos.push({id: videoInfo.id, title: videoInfo.snippet.title, thumbnail: videoInfo.snippet.thumbnails.standard});
    Cookies.set("playlistContent", JSON.stringify(videos));
    refreshPlaylist();

    sendUpdatedPlaylist(videos);
}

/**
 * Removes playlist from page and adds new.
 */
function refreshPlaylist() {
    const playlistBody = $("#playlistBody");
    playlistBody.empty();
    videos.forEach((video, index) => playlistBody.append(createPlaylistElement(index, video)));
}

/**
 * Create element of playlist.
 * @param index Index of element.
 * @param video Object containing info about video.
 * @returns {jQuery|HTMLElement} tr
 */
function createPlaylistElement(index, video) {
    const tr = $("<tr></tr>");

    // todo buttons delete up down
    // todo thumbnail
    tr.append(`<td>${index + 1}</td>`)
    tr.append(`<td>${video.title}</td>`)
    tr.append(`<td><button class="button is-danger is-small"><i class="fas fa-trash"></i></button></td>`)
    tr.append(`<td><button class="button is-success is-small"><i class="fas fa-sort-up"></i></button></td>`)
    tr.append(`<td><button class="button is-success is-small"><i class="fas fa-sort-down"></i></button></td>`)

    return tr;
}

/**
 * Reads playlist from cookie and sets 'videos' variable
 */
function setPlaylistFromCookies() {
    let cookiePlaylist = Cookies.get("playlistContent");
    let playlistContent = [];

    if (cookiePlaylist) {
        playlistContent = JSON.parse(cookiePlaylist);
    }

    videos = playlistContent;
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
    setPlaylistFromCookies();
    refreshPlaylist();

    // listener of url input
    function addVideoAsOwner(url) {
        getInfoAboutVideo(url).then(videoInfo => {
            if (videoInfo !== null) {
                addVideo(videoInfo);
            }
        });
        $("#urlInput").val("");
    }

    $("#urlInput").keypress((e) => {
        if (e.which === 13) {
            addVideoAsOwner($("#urlInput").val());
        }
    });
    $("#sendUrlButton").on("click", () => addVideoAsOwner($("#urlInput").val()));
    initYoutubeIframe();
});