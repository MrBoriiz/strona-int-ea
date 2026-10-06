var projectRoutes = {
    "prod/wm": "popup-8",
    "prod/mg": "popup-9",
    "prod/uvr": "popup-10",
    "prod/ow": "popup-11",
    "prod/evwttg2": "popup-12",
    "koprod/egz": "popup-13",
    "koprod/be": "popup-14",
    "koprod/wielk-egz": "popup-15",
    "koprod/swzmarl-egz": "popup-16",
    "koprod/egln": "popup-17",
    "koprod/sylw-egz": "popup-18"
};

function openProjectFromHash(hashValue) {
    var hash = (typeof hashValue === "string" ? hashValue : window.location.hash).replace(/^#/, "");
    var isDetailsRoute = hash.endsWith("/szczegoly");
    var route = isDetailsRoute ? hash.slice(0, -"/szczegoly".length) : hash;
    var popupId = projectRoutes[route];

    if (!popupId) {
        return;
    }

    document.querySelectorAll(".popup.active").forEach(function (popup) {
        if (popup.id !== popupId) {
            popup.classList.remove("active");
        }
    });

    var popup = document.getElementById(popupId);
    if (!popup) {
        return;
    }

    var wasActive = popup.classList.contains("active");
    popup.classList.add("active");
    toggleBodyScrollOff();

    if (isDetailsRoute) {
        var scrollToDetails = function () {
            if (window.location.hash.slice(1) !== hash || !popup.classList.contains("active")) {
                return;
            }

            var details = popup.querySelector(".project-details");
            var content = popup.querySelector(".content");
            if (details && content) {
                var top = details.getBoundingClientRect().top -
                    content.getBoundingClientRect().top +
                    content.scrollTop;
                content.scrollTo({ top: top, behavior: "smooth" });
            }
        };

        if (wasActive) {
            window.requestAnimationFrame(scrollToDetails);
        } else {
            window.setTimeout(scrollToDetails, 650);
        }
    }
}

document.addEventListener("click", function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link) {
        return;
    }

    var hash = link.getAttribute("href").slice(1);
    var route = hash.endsWith("/szczegoly") ? hash.slice(0, -"/szczegoly".length) : hash;
    if (projectRoutes[route]) {
        openProjectFromHash("#" + hash);
    }
});

document.addEventListener("DOMContentLoaded", openProjectFromHash);
window.addEventListener("hashchange", openProjectFromHash);
