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