/**
 * Basic template of youtube search section.
 * @type {string}
 */
const html = `
<div class="container">
    <h2 class="has-text-grey-lighter title has-text-centered playlistTitle">Find video on YouTube</h2>
    <div class="columns is-gapless">
        <div class="column is-10">
            <input class="input is-danger" type="text" placeholder="Find" id="phraseInput">
        </div>
        <div class="column is-2">
            <button class="button is-danger is-light is-fullwidth" id="searchBtn">Find</button>
        </div>
    </div>
    <h1 class="is-size-3" id="youtubeSearchMessage"></h1>
    <div class="searchResults has-text-grey-lighter">
    </div>
</div>
`;

/**
 * Creates element that represents one founded video.
 * @param video contains info about video
 * @returns {jQuery|HTMLElement}
 */
function createSearchResultElement(video) {
    const htmlElement = `
    <div class="searchResult columns is-gapless">
        <div class="column is-narrow thumbnail has-text-centered">
            <img src="${video.snippet.thumbnails.medium.url}" alt="thumbnail"/>
        </div>
        <div class="column details">
            <h1 class="is-size-6-mobile is-size-3-tablet">${video.snippet.title}</h1>
            <h3 class="is-size-7-mobile has-text-grey is-italic">${video.snippet.channelTitle}</h3>
            <p class="is-size-7-mobile is-size-6-tablet has-text-grey">${video.snippet.description}</p>
        </div>
        <div class="column is-narrow" style="text-align: center">
            <button class="button is-large is-danger add"><i class="fas fa-plus"></i></button>
            ${userType === "OWNER" 
                ? `<button class="button is-large is-danger ban"><i class="fas fa-ban"></i></button>` 
                : ""}
        </div>
    </div>
    `;
    const result = $(htmlElement);

    // add video
    result.find("button.add").on("click", () => {
        if (userType === "OWNER") {
            addVideo(video);
        }
        else {
            sendUrl(`https://www.youtube.com/watch?v=${video.id.videoId}`)
        }
        $("#phraseInput").val("");
        $(".searchResults").empty();
    });

    // ban video
    result.find("button.ban").on("click", () => {
        banVideo(video.id.videoId, video.snippet.title);
    });

    return result;
}

/**
 * Gets phrase from input and searches videos by this phrase.
 */
function find() {
    const phrase = $("#phraseInput").val().trim();
    // check if user typed anything
    if (phrase.length > 0) {
        $("#youtubeSearchMessage").text("Loading");
        $(".searchResults").empty();
        findVideosOnYoutube(phrase, 4).then(result => {
            if (result === null) {
                $("#youtubeSearchMessage").text("Error :/");
            }
            else if (result.length === 0) {
                $("#youtubeSearchMessage").text("No results :/");
            }
            else {
                $("#youtubeSearchMessage").text("");
                result.forEach(video => $(".searchResults").append(createSearchResultElement(video)));
            }
        });
    }
}

/**
 * Calls api that searches videos by phrase. Will be return specific amount of pages or less.
 * @param phrase
 * @param pages
 * @returns {Promise<T>}
 */
function findVideosOnYoutube(phrase, pages) {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=id%2C+snippet&q=${phrase}&key=${token}&type=video`;
    return axios.get(apiUrl)
        .then((response) => {
            let result = response.data.items;

            if (response.data.nextPageToken && pages > 1) {
                return getNextPage(phrase, response.data.nextPageToken, pages - 1).then(items => {
                    return result.concat(items);
                });
            }
            else {
                return result;
            }
        })
        .catch((response) => {return null});
}

/**
 * Searches videos on youtube by phrase. You can specify page. Will be return specific amount of pages or less.
 * @param phrase
 * @param pageToken
 * @param page
 * @returns {Promise<T | *[]>}
 */
function getNextPage(phrase, pageToken, page) {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=id%2C+snippet&q=${phrase}&key=${token}&type=video&pageToken=${pageToken}`;
    return axios.get(apiUrl)
        .then((response) => {
            let result = response.data.items;

            if (response.data.nextPageToken && page > 1) {
                return getNextPage(phrase, response.data.nextPageToken, page - 1).then(items => {
                    return result.concat(items);
                });
            }
            else {
                return result;
            }
        })
        .catch((response) => {return []});
}

$(document).ready(function() {
    const base = $("#youtubeSearch");
    base.addClass("has-background-black");
    base.append(html);

    $("#searchBtn").on("click", () => find());
    $("#phraseInput").keypress((e) => {
        if (e.which === 13) {
            find();
        }
    });

});