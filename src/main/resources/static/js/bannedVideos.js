const bannedVideosHtml = `
<h2 class="title has-text-centered">Banned videos</h2>
<ul class="bannedVideosList">
</ul>
`;

let bannedVideos = new Map()

function createBannedVideosListElement(id, title) {
    let element = $(`<li><button class="button is-danger is-small"><i class="fas fa-times"></i></button>${title}</li>`);
    return element;
}

function refreshBannedVideos() {
    const base = $(".bannedVideosList");
    base.empty();
    bannedVideos.forEach((title, id) => base.append(createBannedVideosListElement(id, title)));
}

function banVideo(id, title) {
    bannedVideos.set(id, title);
    refreshBannedVideos();
}

$(document).ready(function() {
    const base = $("#bannedVideos");
    base.append(bannedVideosHtml);

    bannedVideos.set("iddd1", "hyhyehehe hyhyh heheh hehe 1");
    bannedVideos.set("iddd2", "hyhyehehe hyhyh heheh hehe 2");
    bannedVideos.set("iddd3", "hyhyehehe hyhyh heheh hehe 3");

    refreshBannedVideos();
});