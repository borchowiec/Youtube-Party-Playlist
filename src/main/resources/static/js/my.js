let player;
let videos = [];
let currentVideo = 0;

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
 * It's called when player is ready.
 */
function onPlayerReady() {
    // set up first video, if exists
    if (videos.length > 0) {
        currentVideo = 0;
        setCurrentVideo();
    }
}

/**
 * Set up player when iframe is ready.
 */
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        events: {
            'onReady': onPlayerReady,
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

    if (state === 0) { // next song
        icon = "fa-play";
        if (videos.length > 0) {
            currentVideo = (currentVideo + 1) % videos.length;
            setCurrentVideo();
        }
    }
    else if (state === -1 || state === 2) {
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

    if (videos.length === 1) {
        currentVideo = 0;
        setCurrentVideo();
    }
    else {
        selectNthPlaylistElement(currentVideo);
    }
}

/**
 * Sets current video. Song of index equal to currentVideo.
 */
function setCurrentVideo() {
    if (videos.length > 0) {
        player.loadVideoById(videos[currentVideo].id, 0, "large");
        selectNthPlaylistElement(currentVideo);
        sendCurrentVideo(currentVideo, videos[currentVideo]);
    }
}

/**
 * Removes playlist from page and adds new.
 */
function refreshPlaylist() {
    const playlistBody = $("#playlistBody");
    playlistBody.empty();
    videos.forEach((video, index) => playlistBody.append(createPlaylistElement(index, video)));
}

function deleteVideo(index) {
    // if you deleting current video
    if (currentVideo === index) {
        // if deleting video is the last one
        if (index === videos.length - 1) {
            videos.pop();
            currentVideo--;
        }
        else {
            videos.splice(index, 1);
        }
        // run new video because current is removed
        setCurrentVideo();
    }
    else if (index < currentVideo) {
        // change index of current video
        currentVideo--;
        videos.splice(index, 1);
        sendCurrentVideo(currentVideo, videos[currentVideo])
    }
    else {
        videos.splice(index, 1);
    }

    Cookies.set("playlistContent", JSON.stringify(videos));
    refreshPlaylist();
    selectNthPlaylistElement(currentVideo);
    sendUpdatedPlaylist(videos);
    // todo rozkminić scenariusze co może pójść nie tak
}

/**
 * Create element of playlist.
 * @param index Index of element.
 * @param video Object containing info about video.
 * @returns {jQuery|HTMLElement} tr
 */
function createPlaylistElement(index, video) {
    const tr = $("<tr></tr>");

    // todo buttons up down
    // todo thumbnail
    tr.append(`<td>${index + 1}</td>`);
    tr.append(`<td>${video.title}</td>`);

    const deleteBtn = $('<button class="button is-danger is-small"><i class="fas fa-trash"></i></button>');
    deleteBtn.on("click", () => deleteVideo(index));
    const deleteContainer = $('<td></td>');
    deleteContainer.append(deleteBtn);
    tr.append(deleteContainer);

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
    $("#prevBtn").on("click", () => {
        currentVideo = (currentVideo + videos.length - 1) % videos.length;
        setCurrentVideo();
    });
    $("#nextBtn").on("click", () => {
        currentVideo = (currentVideo + 1) % videos.length;
        setCurrentVideo();
    });
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