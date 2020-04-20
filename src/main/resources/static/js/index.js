$("#myPlaylistBtn").on("click", () => {
    // todo if there is no jwt, get new from backend
    // todo get id from jwt
    const id = "123asdasdasd1231";
    window.open(`/my/${id}`, "_self")
})

$("#joinPlaylistBtn").on("click", () => {
    $("#joinPlaylistBox").show();
})

$("#joinPlaylistBox .delete").on("click", () => {
    $("#joinPlaylistBox").hide();
})

$("#joinPlaylistBox .joinBtn").on("click", () => {
    const id = $("#joinPlaylistBox .playlistId").val();
    window.open(`/playlist/${id}`, "_self");
})

$(document).ready(function(){
    // todo if there is jwt, fill nickname
});