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

    return tr;
}

function loadDummyPlaylist() {
    const data = ["Title 1", "Ale urwał", "2000 mix", "CATSSS", "MORE CATS", "dogo"];
    data.forEach((title, index) => $("#playlistBody").append(createPlaylistElement(index, title)));
}

$(document).ready(function() {
    $(".idHeader").on("click", () => {
        copyContentOfElementToClipboard("#idSpan");
        showElement("#copyMessage", 3000);
    });
    loadDummyPlaylist(); // todo load real data
});