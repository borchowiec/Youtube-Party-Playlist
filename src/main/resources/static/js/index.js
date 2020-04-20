$("#myPlaylistBtn").on("click", () => {
    // todo if there is no jwt, get new from backend
    // todo get id from jwt
    const id = "123asdasdasd1231";
    window.open(`/my/${id}`, "_self")
})

$("#joinPlaylistBtn").on("click", () => {
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

$("#joinPlaylistBox .delete").on("click", () => {
    $("#joinPlaylistBox").hide();
})

$("#joinPlaylistBox .joinBtn").on("click", () => {
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