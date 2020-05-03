const authorizationPanelHtml = `
<h2 class="title has-text-centered">Invite</h2>
<div class="columns is-mobile">
    <div class="column is-narrow"><input type="checkbox" id="accessByLinkCheckbox"></div>
    <div class="column"><p class="accessPropertyLabel">Access only with link</p></div><br>
</div>
<div>
    <div class="columns" style="padding: 0 40px">
        <button class="button is-danger is-light is-fullwidth" id="copyInviteLink">Copy invite link</button>
    </div>
    <div class="columns" style="margin-top: 10px; padding: 0 40px">
        <button class="button is-danger is-light is-fullwidth" id="showQr">Show invite QR code</button>
    </div>
</div>
`;

function getInvitationLink() {
    const userToken = Cookies.get("userToken");
    return `${window.location.origin}/auth/${userToken}`;
}

function copyInviteLink() {
    const $temp = $("<input>");
    $("body").append($temp);
    $temp.val(getInvitationLink()).select();
    document.execCommand("copy");
    $temp.remove();

    const copyBtn = $("#copyInviteLink");
    copyBtn.text("Copied!");
    setTimeout(() => copyBtn.text("Copy invite link"), 1000);
}

$(document).ready(function() {
    const base = $("#authorizationPanel");
    base.append(authorizationPanelHtml);

    $("#copyInviteLink").on("click", () => copyInviteLink());

    new QRCode(document.getElementById("qrcode"), getInvitationLink());
    $("#showQr").on("click", () => $(".qrContainer").show());
    $("button.close").on("click", () => $(".qrContainer").hide())
});