/**
 * Redirects to user's playlist.
 */
$("#myPlaylistBtn").on("click", () => {
    // todo if there is no jwt, get new from backend
    // todo get id from jwt
    const id = "123asdasdasd1231";
    window.open(`/my/${id}`, "_self")
})

/**
 * Open box where you can specify, which playlist you want to join.
 */
$("#joinPlaylistBtn").on("click", () => {
    // check if user gave nickname
    const nickname = $(".nicknameInput").val().trim();
    if (nickname.length === 0) {
        const errorLabel = $(".nickErrorMsg");
        errorLabel.text("You should type your nickname");
        errorLabel.show();
    }
    else {
        $("#joinPlaylistBox").show();
    }
})

/**
 * Hides box, that redirects user to specified playlist.
 */
$("#joinPlaylistBox .delete").on("click", () => {
    $("#joinPlaylistBox").hide();
})

/**
 * Joins user to playlist.
 */
$("#joinPlaylistBox .joinBtn").on("click", () => {
    // check if user typed id of playlist.
    const id = $("#joinPlaylistBox .playlistId").val().trim();
    if (id.length === 0) {
        const errorLabel = $(".idErrorMsg");
        errorLabel.text("You should type id of playlist");
        errorLabel.show();
    }
    else {
        window.open(`/playlist/${id}`, "_self");
    }
})

$(document).ready(function(){
    // todo if there is jwt, fill nickname
});