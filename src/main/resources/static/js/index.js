/**
 * @returns {string | jQuery} Username from nickname input.
 */
function getUsername() {
    return $(".nicknameInput").val().trim();
}

/**
 * Redirects to user's playlist.
 */
$("#myPlaylistBtn").on("click", () => {
    Cookies.set("username", getUsername());

    return axios.get("/user/get-id")
        .then((response) => {
            const id = response.data.userId;
            window.open(`/my/${id}`, "_self")
        })
        .catch((error) => {
            console.log(error)
        });
})

/**
 * Open box where you can specify, which playlist you want to join.
 */
$("#joinPlaylistBtn").on("click", () => {
    // check if user gave nickname
    const nickname = getUsername();
    if (nickname.length === 0) {
        const errorLabel = $(".nickErrorMsg");
        errorLabel.text("You should type your nickname");
        errorLabel.show();
    }
    else {
        Cookies.set("username", nickname);
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
    // if cookies contains username, put it in nickname input
    const username = Cookies.get("username");
    if (username) {
        $(".nicknameInput").val(username);
    }
});