const bannedVideosHtml = `
<h2 class="title has-text-centered">Banned videos</h2>
<ul class="bannedVideosList">
</ul>
`;

let bannedVideos = new Map()

function createBannedVideosListElement(id, title) {
    let element = $(`<li><button class="button is-danger is-small unban"><i class="fas fa-times"></i></button>${title}</li>`);
    element.find("button.unban").on("click", () => unbanVideo(id));
    return element;
}

function refreshBannedVideos() {
    const base = $(".bannedVideosList");
    base.empty();
    bannedVideos.forEach((title, id) => base.append(createBannedVideosListElement(id, title)));
    saveBannedVideos();

    filters.set("bannedVideo", {
        filter: (video) => {
            return bannedVideos.get(video.id);
        },
        errorMessage: `The video you sent is banned!`
    })
}

function banVideo(id, title) {
    bannedVideos.set(id, title);
    refreshBannedVideos();
}

function unbanVideo(id) {
    bannedVideos.delete(id);
    refreshBannedVideos();
}

function loadBannedVideos() {
    let stringBannedVideos = Cookies.get("bannedVideos");
    if (stringBannedVideos) {
        bannedVideos = new Map(JSON.parse(stringBannedVideos));
    }
}

function saveBannedVideos() {
    Cookies.set("bannedVideos", JSON.stringify([...bannedVideos.entries()]));
}

$(document).ready(function() {
    const base = $("#bannedVideos");
    base.append(bannedVideosHtml);

    loadBannedVideos();
    refreshBannedVideos();
});