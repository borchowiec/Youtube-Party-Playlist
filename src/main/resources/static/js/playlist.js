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

function updatePlaylist(playlist) {
    playlist.forEach((el, index) => $("#playlistBody").append(createPlaylistElement(index, el.title)));
}

$(document).ready(function() {
    connectToPlaylist("GUEST");
    $(".idHeader").on("click", () => {
        copyContentOfElementToClipboard("#idSpan");
        showElement("#copyMessage", 3000);
    });
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