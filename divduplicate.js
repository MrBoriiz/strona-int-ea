var duplicateScriptUrl = document.currentScript && document.currentScript.src;

$(function () {
    var notificationContainer = document.getElementById("powiadomienia") ||
        document.getElementById("powiadomienia-eng");
    if (!notificationContainer) {
        return;
    }

    var notificationsUrl = duplicateScriptUrl
        ? new URL("powiadomienia.html", duplicateScriptUrl).href
        : "powiadomienia.html";
    $(notificationContainer).load(notificationsUrl, function () {
        if (window.location.pathname.indexOf("/eng/") === -1) {
            return;
        }

        notificationContainer.querySelectorAll(".notification img").forEach(function (image) {
            image.src = new URL("../" + image.getAttribute("src"), window.location.href).href;
        });
    });
});