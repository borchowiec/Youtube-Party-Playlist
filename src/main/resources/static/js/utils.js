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

function addUserToTable(username, userType) {
    // todo  check by id if user exists
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

function removeUserFromTable(username) { // todo remove by id
    $("#usersBody tr").filter(function() {
        return $(this).children("td").eq(1).text().trim() === username;
    }).first().remove();
}