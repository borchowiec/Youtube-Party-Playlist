let currentVideo = 0;

/**
 * Create element of playlist.
 * @param index Index of element
 * @param title Title of video
 * @returns {jQuery|HTMLElement} tr
 */
function createPlaylistElement(index, title) {
    const tr = $("<tr></tr>");

    tr.append(`<td>${index + 1}</td>`)
    tr.append(`<td>${title}</td>`)

    return tr;
}

/**
 * Removes playlist from page and adds new.
 * @param playlist
 */
function updatePlaylist(playlist) {
    const playlistBody = $("#playlistBody");
    playlistBody.empty();
    playlist.forEach((el, index) => playlistBody.append(createPlaylistElement(index, el.title)));
    selectNthPlaylistElement(currentVideo);
}

$(document).ready(function() {
    connectToPlaylist("GUEST");
    $(".idHeader").on("click", () => {
        copyContentOfElementToClipboard("#idSpan");
        showElement("#copyMessage", 3000);
    });

    // listeners for url input
    $("#urlInput").keypress((e) => {
        if (e.which === 13) {
            sendUrl($("#urlInput").val());
            $("#urlInput").val("");
        }
    });
    $("#sendUrlButton").on("click", () => {
        sendUrl($("#urlInput").val());
        $("#urlInput").val("");
    })
});

/**
 * Sets label that displays current video's title.
 * @param title Title of current video
 */
function setCurrentTitle(title) {
    $("#currentTitle").text(title);
}