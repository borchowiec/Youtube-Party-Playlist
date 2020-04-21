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

/**
 * Copies id of playlist to clipboard.
 */
function copyId() {
    const $temp = $("<input>");
    $("body").append($temp);
    $temp.val($("#idSpan").text()).select();
    document.execCommand("copy");
    $temp.remove();
    $("#copyMessage").show();
    setTimeout(function() { $("#copyMessage").hide(); }, 3000);
}

$(document).ready(function() {
    $(".idHeader").on("click", () => copyId());
    loadDummyPlaylist(); // todo load real data
    initYoutubeIframe();
});