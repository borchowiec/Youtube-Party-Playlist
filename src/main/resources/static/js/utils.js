let users = new Map();

/**
 * Copies text of element to user's clipboard.
 * @param cssQuery element containing data to copy.
 */
function copyContentOfElementToClipboard(cssQuery) {
    const $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(cssQuery).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

/**
 * Shows element for specific period of time.
 * @param cssQuery Element that will be shown.
 * @param time Period of time.
 */
function showElement(cssQuery, time) {
    $(cssQuery).show();
    setTimeout(function() { $(cssQuery).hide(); }, time);
}

/**
 * Adds user to table in page.
 * @param username
 * @param userType if user is a owner, it will be decorated
 * @param userId id of user
 */
function addUserToTable(username, userType, userId) {
    users.set(userId, {username: username, userType: userType})
    refreshUserTable();
}

/**
 * Removes user from table of users.
 * @param userId
 */
function removeUserFromTable(userId) {
    users.delete(userId);
    refreshUserTable();
}

function refreshUserTable() {
    $("#usersBody").empty();
    users.forEach(v  => {
        const tr = $("<tr></tr>");
        tr.append(`<td><i class="fas fa-user"></i></td>`)
        tr.append(`<td>${v.username}</td>`)

        if (v.userType === "OWNER") {
            tr.addClass("has-text-warning");
            $("#usersBody").prepend(tr);
        }
        else {
            tr.addClass("has-text-white");
            $("#usersBody").append(tr);
        }
    })
}

/**
 * Returns data about youtube video by given url. If video doesn't exists, it returns null.
 * @param stringUrl url of video
 * @returns {null|Promise<T>}
 */
function getInfoAboutVideo(stringUrl) {
    // taking id of video
    const url = new URL(stringUrl);
    const id = url.searchParams.get("v");

    if (id === null) {
        return null;
    }
    else {
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails%2C+id%2C+snippet&id=${id}&key=${token}`;
        return axios.get(apiUrl)
            .then((response) => {
                if (response.data.pageInfo.totalResults < 1) {
                    return null;
                }
                else {
                    return response.data.items[0];
                }
            })
            .catch((response) => {return null});
    }
}

/**
 * Selects nth element of playlist.
 * @param n
 */
function selectNthPlaylistElement(n) {
    const tr = $("#playlistBody tr");
    tr.removeAttr("class");
    tr.eq(n).attr("class", "is-selected");
}