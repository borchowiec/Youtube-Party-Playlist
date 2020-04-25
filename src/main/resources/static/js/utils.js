const token = "AIzaSyDwW-mhoTot64j06Frtv-wGCnOsi7bvImc";

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
    setTimeout(function() { $("#copyMessage").hide(); }, time);
}

/**
 * Adds user to table in page.
 * @param username
 * @param userType if user is a owner, it will be decorated
 */
function addUserToTable(username, userType) {
    // todo check by id if user already exists in table
    let length = $("#usersBody tr").filter(function() {
        return $(this).children("td").eq(1).text().trim() === username;
    }).length;

    // if user already exists in users table
    if (length > 0) return;

    const tr = $("<tr></tr>");
    tr.append(`<td><i class="fas fa-user"></i></td>`)
    tr.append(`<td>${username}</td>`)

    if (userType === "OWNER") {
        tr.addClass("has-text-warning");
        $("#usersBody").prepend(tr);
    }
    else {
        tr.addClass("has-text-white");
        $("#usersBody").append(tr);
    }
}

/**
 * Removes user from table of users.
 * @param username
 */
function removeUserFromTable(username) { // todo remove by id
    $("#usersBody tr").filter(function() {
        return $(this).children("td").eq(1).text().trim() === username;
    }).first().remove();
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
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${id}&key=${token}`;
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