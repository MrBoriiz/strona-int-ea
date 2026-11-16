//chowanie scrolla przy popupie
function toggleBodyScrollOff() {
    updateProjectOverlayState();
}

//przywracanie scrolla przy zamknięciu popupu
function toggleBodyScrollOn() {
    updateProjectOverlayState();
}

function updateProjectOverlayState() {
    var isOpen = Boolean(
        document.querySelector(".popup.active, .wm-artwork-dialog[open]")
    );
    document.body.style.overflow = isOpen ? "hidden" : "";
    document.documentElement.classList.toggle("project-overlay-open", isOpen);
    document.body.classList.toggle("project-overlay-open", isOpen);
    document.dispatchEvent(new CustomEvent("project-overlay-change", {
        detail: { isOpen: isOpen }
    }));
}




//=============================== \/ \/ \/  POPUPY \/ \/ \/ ===============================

//wojny meneli
function togglePopup8(){
    document.getElementById("popup-8").classList.toggle("active");
    toggleBodyScrollOff();
}

//miasto gliwice
function togglePopup9(){
    document.getElementById("popup-9").classList.toggle("active");
    toggleBodyScrollOff();
}
//ukraine vs russia
function togglePopup10(){
    document.getElementById("popup-10").classList.toggle("active");
    toggleBodyScrollOff();
}
//ogrodowy wyścig
function togglePopup11(){
    document.getElementById("popup-11").classList.toggle("active");
    toggleBodyScrollOff();
}
//eleven vs wttg2
function togglePopup12(){
    document.getElementById("popup-12").classList.toggle("active");
    toggleBodyScrollOff();
}

//Bogdan Boner Egzorcysta
function togglePopup13(){
    document.getElementById("popup-13").classList.toggle("active");
    toggleBodyScrollOff();
}



//=============================== /\ /\ /\  POPUPY /\ /\ /\ ===============================




//Blok Ekipa
function togglePopup14(){
    document.getElementById("popup-14").classList.toggle("active");
    toggleBodyScrollOff();
}

//Bogdan Boner Wilkanoc 
function togglePopup15(){
    document.getElementById("popup-15").classList.toggle("active");
    toggleBodyScrollOff();
}

//Bogdan Boner Święto zmarłych 
function togglePopup16(){
    document.getElementById("popup-16").classList.toggle("active");
    toggleBodyScrollOff();
}

//Elektroglina
function togglePopup17(){
    document.getElementById("popup-17").classList.toggle("active");
    toggleBodyScrollOff();
}

//Bogdan Boner Sylwester
function togglePopup18(){
    document.getElementById("popup-18").classList.toggle("active");
    toggleBodyScrollOff();
}

//Rycerze Doliny Rozdupy
function togglePopup19(){
    document.getElementById("popup-19").classList.toggle("active");
    toggleBodyScrollOff();
}

document.addEventListener("DOMContentLoaded", function () {
    var isEnglishPage = window.location.pathname.indexOf("/eng/") !== -1;
    var detailsTitle = isEnglishPage ? "" : "";
    var profileRoutes = {
        "popup-8": "prod/wm",
        "popup-9": "prod/mg",
        "popup-10": "prod/uvr",
        "popup-11": "prod/ow",
        "popup-12": "prod/evwttg2",
        "popup-13": "koprod/egz",
        "popup-14": "koprod/be",
        "popup-15": "koprod/wielk-egz",
        "popup-16": "koprod/swzmarl-egz",
        "popup-17": "koprod/egln",
        "popup-18": "koprod/sylw-egz",
        "popup-19": "koprod/rydolroz"
    };

    document.querySelectorAll(".popup .modal").forEach(function (modal) {
        if (!modal.querySelector(".modal-prod-title")) {
            return;
        }

        var popup = modal.closest(".popup");
        var route = popup && profileRoutes[popup.id];
        var section = modal.querySelector(".project-details");

        if (!section) {
            section = document.createElement("section");
            section.className = "project-details";
            var title = document.createElement("h2");
            var details = document.createElement("div");

            title.className = "project-details-title";
            title.textContent = detailsTitle;
            details.className = "szczegoly";
            section.appendChild(title);
            section.appendChild(details);
            modal.appendChild(section);
        }

        if (popup && popup.id) {
            section.id = popup.id + "-details";
        }

        if (route) {
            var anchorId = route + "/szczegoly";
            var anchor = document.getElementById(anchorId);
            if (!anchor) {
                anchor = document.createElement("a");
                anchor.id = anchorId;
                anchor.className = "project-details-anchor";
                section.insertBefore(anchor, section.firstChild);
            }

            modal.querySelectorAll(".modal-content-second .sub-title").forEach(function (value) {
                var link = value.closest("a");
                if (!link || !modal.querySelector(".modal-content-second").contains(link)) {
                    link = document.createElement("a");
                    value.parentNode.insertBefore(link, value);
                    link.appendChild(value);
                }
                link.href = "#" + anchorId;
                link.classList.add("project-details-link");
            });
        }
    });

    var mediaSections = Array.from(document.querySelectorAll(".wm-project-media[data-gallery-route], #popup-8 .wm-project-media"));
    mediaSections.forEach(function (mediaSection) {
        var tabs = Array.from(mediaSection.querySelectorAll('[role="tab"]'));
        var panels = Array.from(mediaSection.querySelectorAll('[role="tabpanel"]'));
        var artworkButtons = Array.from(mediaSection.querySelectorAll(".wm-artwork-button"));
        var artworkDialog = mediaSection.querySelector(".wm-artwork-dialog");
        var artworkDialogImage = artworkDialog && artworkDialog.querySelector(".wm-lightbox-image");
        var closeArtworkButton = mediaSection.querySelector(".wm-artwork-close");
        var previousArtworkButton = mediaSection.querySelector(".wm-lightbox-previous");
        var nextArtworkButton = mediaSection.querySelector(".wm-lightbox-next");
        var artworkPost = mediaSection.querySelector(".wm-lightbox-post");
        var artworkTitle = mediaSection.querySelector(".wm-lightbox-title");
        var artworkDescription = mediaSection.querySelector(".wm-lightbox-description");
        var artworkDetails = mediaSection.querySelector(".wm-lightbox-details");
        var artworkArea = mediaSection.querySelector(".wm-lightbox-artwork");
        var artworkCounter = mediaSection.querySelector(".wm-lightbox-counter");
        var artworkToolbar = mediaSection.querySelector(".wm-lightbox-toolbar");
        var artworkMenu = mediaSection.querySelector(".wm-lightbox-menu");
        var artworkMenuToggle = mediaSection.querySelector(".wm-lightbox-menu-toggle");
        var artworkDownloadLink = mediaSection.querySelector(".wm-lightbox-download");
        var artworkSocialLinks = Array.from(mediaSection.querySelectorAll(".wm-lightbox-social-link"));
        var artworkMenuItems = [];
        var projectPopup = mediaSection.closest(".popup");
        var activeArtworkButton = null;
        var artworkPosts = [];
        var activeArtworkIndex = 0;
        var artworkIsClosing = false;
        var artworkSwipeStart = null;
        var artworkPointers = new Map();
        var artworkPinchStart = null;
        var artworkPanStart = null;
        var artworkZoomScale = 1;
        var artworkPanX = 0;
        var artworkPanY = 0;
        var artworkGestureHandled = false;
        var suppressArtworkClick = false;
        var artworkTapTimer = null;
        var lastArtworkTap = null;
        var artworkMenuDrag = null;
        var artworkMenuCloseTimer = null;
        var artworkControlPositions = null;
        var projectPopupWasActive = false;
        var galleryRoute = projectPopup
            ? profileRoutes[projectPopup.id]
            : mediaSection.dataset.galleryRoute;

        artworkButtons.forEach(function (button) {
            var thumbnail = button.querySelector("img");
            if (!thumbnail) {
                return;
            }

            artworkPosts.push({
                source: thumbnail.src,
                alt: thumbnail.alt,
                slug: button.dataset.artworkSlug || thumbnail.src.split("/").pop().replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]+/g, "_"),
                title: button.dataset.artworkTitle || thumbnail.alt,
                description: button.dataset.artworkDescription || thumbnail.alt,
                socialLinks: {
                    instagram: button.dataset.artworkLinkInstagram || "",
                    twitter: button.dataset.artworkLinkTwitter || "",
                    tiktok: button.dataset.artworkLinkTiktok || "",
                    threads: button.dataset.artworkLinkThreads || ""
                }
            });
        });
        artworkMenuItems = Array.from(artworkMenu.querySelectorAll('[role="menuitem"]'));

        if (artworkDialog) {
            document.body.appendChild(artworkDialog);
        }

        function setProjectMediaHash(suffix, replace) {
            var hash = "#" + galleryRoute + suffix;
            if (replace) {
                window.history.replaceState(null, "", hash);
            } else if (window.location.hash !== encodeURI(hash)) {
                window.history.pushState(null, "", hash);
                window.dispatchEvent(new PopStateEvent("popstate"));
            }
        }

        function selectMediaTab(selectedTab, updateUrl) {
            if (!selectedTab) {
                return;
            }

            tabs.forEach(function (tab) {
                var isSelected = tab === selectedTab;
                tab.setAttribute("aria-selected", String(isSelected));
                tab.tabIndex = isSelected ? 0 : -1;
            });

            panels.forEach(function (panel) {
                panel.hidden = panel.id !== selectedTab.getAttribute("aria-controls");
            });

            if (updateUrl && projectPopup) {
                setProjectMediaHash(selectedTab.id === "wm-extras-tab" ? "/dodatki" : "/filmy", false);
            }
        }

        function fitArtworkPreview() {
            if (!artworkDialogImage.naturalWidth || !artworkDialogImage.naturalHeight) {
                return;
            }

            var isMobile = window.matchMedia("(max-width: 1024px)").matches;
            if (isMobile) {
                artworkDialog.classList.remove("is-wide-artwork", "is-upright-artwork");
                artworkDialogImage.style.width = "";
                artworkDialogImage.style.height = "";
                artworkPost.style.width = "";
                applyArtworkZoom();
                return;
            }

            resetArtworkZoom();
            artworkDialog.classList.remove("is-wide-artwork", "is-upright-artwork", "is-interface-hidden");
            var maxWidth = Math.min(1920, window.innerWidth - 204);
            var maxHeight = Math.min(1080, window.innerHeight - 240);
            var scale = Math.min(
                1,
                maxWidth / artworkDialogImage.naturalWidth,
                maxHeight / artworkDialogImage.naturalHeight
            );
            var width = Math.max(1, Math.round(artworkDialogImage.naturalWidth * scale));
            var height = Math.max(1, Math.round(artworkDialogImage.naturalHeight * scale));

            artworkDialogImage.style.width = width + "px";
            artworkDialogImage.style.height = height + "px";
            artworkPost.style.width = width + "px";
        }

        function constrainArtworkPan() {
            var areaRect = artworkArea.getBoundingClientRect();
            var maxX = Math.max(0, (artworkDialogImage.offsetWidth * artworkZoomScale - areaRect.width) / 2);
            var maxY = Math.max(0, (artworkDialogImage.offsetHeight * artworkZoomScale - areaRect.height) / 2);
            artworkPanX = Math.max(-maxX, Math.min(maxX, artworkPanX));
            artworkPanY = Math.max(-maxY, Math.min(maxY, artworkPanY));
        }

        function applyArtworkZoom() {
            constrainArtworkPan();
            artworkDialogImage.style.transform = artworkZoomScale > 1
                ? "translate3d(" + artworkPanX + "px, " + artworkPanY + "px, 0) scale(" + artworkZoomScale + ")"
                : "";
            artworkDialogImage.classList.toggle("is-zoomed", artworkZoomScale > 1);
        }

        function resetArtworkZoom() {
            window.clearTimeout(artworkTapTimer);
            artworkTapTimer = null;
            lastArtworkTap = null;
            artworkZoomScale = 1;
            artworkPanX = 0;
            artworkPanY = 0;
            artworkPointers.clear();
            artworkPinchStart = null;
            artworkPanStart = null;
            artworkGestureHandled = false;
            artworkSwipeStart = null;
            artworkDialogImage.style.removeProperty("transform");
            artworkDialogImage.classList.remove("is-zoomed");
        }

        function setArtworkZoom(scale, anchorX, anchorY) {
            var previousScale = artworkZoomScale;
            artworkZoomScale = Math.max(1, Math.min(5, scale));
            if (anchorX !== undefined && anchorY !== undefined && previousScale > 0) {
                var areaRect = artworkArea.getBoundingClientRect();
                var pointX = anchorX - areaRect.left - areaRect.width / 2;
                var pointY = anchorY - areaRect.top - areaRect.height / 2;
                var ratio = artworkZoomScale / previousScale;
                artworkPanX = pointX + (artworkPanX - pointX) * ratio;
                artworkPanY = pointY + (artworkPanY - pointY) * ratio;
            }
            if (artworkZoomScale === 1) {
                artworkPanX = 0;
                artworkPanY = 0;
            }
            applyArtworkZoom();
        }

        function toggleArtworkZoomAt(x, y) {
            if (artworkZoomScale > 1) {
                resetArtworkZoom();
                return;
            }
            setArtworkZoom(2.5, x, y);
        }

        function handleArtworkTouchTap(event) {
            var now = Date.now();
            if (lastArtworkTap &&
                now - lastArtworkTap.time < 320 &&
                Math.hypot(event.clientX - lastArtworkTap.x, event.clientY - lastArtworkTap.y) < 48) {
                window.clearTimeout(artworkTapTimer);
                artworkTapTimer = null;
                lastArtworkTap = null;
                suppressArtworkClick = true;
                toggleArtworkZoomAt(event.clientX, event.clientY);
                return;
            }

            lastArtworkTap = { time: now, x: event.clientX, y: event.clientY };
            suppressArtworkClick = true;
            artworkTapTimer = window.setTimeout(function () {
                artworkTapTimer = null;
                lastArtworkTap = null;
                suppressArtworkClick = false;
                toggleArtworkInterface();
            }, 320);
        }

        function positionArtworkCounter() {
            if (window.matchMedia("(max-width: 1024px)").matches) {
                artworkDetails.insertBefore(artworkCounter, artworkDetails.firstChild);
            } else {
                artworkArea.appendChild(artworkCounter);
            }
        }

        function updateArtworkDescriptionMode() {
            var isExpanded = artworkDetails.classList.contains("is-description-expanded");
            artworkDescription.setAttribute("role", "button");
            artworkDescription.tabIndex = 0;
            artworkDescription.setAttribute("aria-expanded", String(isExpanded));
        }

        function freezeDesktopArtworkControls() {
            if (window.matchMedia("(max-width: 1024px)").matches) {
                return null;
            }

            var positions = new Map();
            [artworkToolbar, previousArtworkButton, nextArtworkButton].forEach(function (element) {
                var rect = element.getBoundingClientRect();
                positions.set(element, { top: rect.top, left: rect.left });
            });

            var toolbarRect = artworkToolbar.getBoundingClientRect();
            artworkToolbar.style.position = "fixed";
            artworkToolbar.style.top = toolbarRect.top + "px";
            artworkToolbar.style.left = toolbarRect.left + "px";
            artworkToolbar.style.right = "auto";
            artworkToolbar.style.bottom = "auto";
            artworkToolbar.style.width = toolbarRect.width + "px";
            artworkToolbar.style.height = toolbarRect.height + "px";

            [previousArtworkButton, nextArtworkButton].forEach(function (button) {
                var buttonRect = button.getBoundingClientRect();
                button.style.position = "fixed";
                button.style.top = buttonRect.top + "px";
                button.style.left = buttonRect.left + "px";
                button.style.right = "auto";
                button.style.bottom = "auto";
            });

            return positions;
        }

        function alignDesktopArtworkControls(positions) {
            if (!positions || !artworkDetails.classList.contains("is-description-expanded")) {
                return;
            }

            positions.forEach(function (position, element) {
                var rect = element.getBoundingClientRect();
                element.style.transform =
                    "translate(" + (position.left - rect.left) + "px, " +
                    (position.top - rect.top) + "px)";
            });

            var artworkTop = artworkArea.getBoundingClientRect().top;
            var toolbarBottom = artworkToolbar.getBoundingClientRect().bottom;
            var artworkHeight = artworkArea.getBoundingClientRect().height;
            var maskEnd = artworkHeight > 0
                ? Math.min(100, Math.max(0, ((toolbarBottom + 25 - artworkTop) / artworkHeight) * 100))
                : 0;
            var maskStart = artworkHeight > 0
                ? Math.min(maskEnd, Math.max(0, ((toolbarBottom - artworkTop) / artworkHeight) * 100))
                : 0;
            var overlapsToolbar = artworkTop < toolbarBottom + 25;

            artworkPost.classList.toggle("has-toolbar-overlap", overlapsToolbar);
            if (overlapsToolbar) {
                artworkArea.style.setProperty("--artwork-mask-start", maskStart + "%");
                artworkArea.style.setProperty("--artwork-mask-end", maskEnd + "%");
            } else {
                artworkArea.style.removeProperty("--artwork-mask-start");
                artworkArea.style.removeProperty("--artwork-mask-end");
            }
        }

        function unfreezeDesktopArtworkControls() {
            [artworkToolbar, previousArtworkButton, nextArtworkButton].forEach(function (element) {
                ["position", "top", "left", "right", "bottom", "width", "height", "transform"].forEach(function (property) {
                    element.style.removeProperty(property);
                });
            });
        }

        function toggleArtworkDescription() {
            var isCurrentlyExpanded = artworkDetails.classList.contains("is-description-expanded");

            if (!isCurrentlyExpanded) {
                artworkControlPositions = freezeDesktopArtworkControls();
                artworkDetails.classList.add("is-description-expanded");
                artworkPost.classList.add("is-description-expanded");
                updateArtworkDescriptionMode();
                if (artworkControlPositions) {
                    alignDesktopArtworkControls(artworkControlPositions);
                }
                return;
            }

            artworkDetails.classList.remove("is-description-expanded");
            artworkPost.classList.remove("is-description-expanded");
            updateArtworkDescriptionMode();
            artworkPost.classList.remove("has-toolbar-overlap");
            artworkArea.style.removeProperty("--artwork-mask-start");
            artworkArea.style.removeProperty("--artwork-mask-end");
            unfreezeDesktopArtworkControls();
            artworkControlPositions = null;
        }

        function handleArtworkMenuDragStart(event) {
            if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) {
                return;
            }

            artworkMenuDrag = {
                pointerId: event.pointerId,
                startY: event.clientY,
                deltaY: 0
            };
            event.currentTarget.setPointerCapture(event.pointerId);
            event.preventDefault();
        }

        function handleArtworkMenuDragMove(event) {
            if (!artworkMenuDrag || artworkMenuDrag.pointerId !== event.pointerId) {
                return;
            }

            var deltaY = Math.max(0, event.clientY - artworkMenuDrag.startY);
            artworkMenuDrag.deltaY = deltaY;
            artworkMenu.querySelector(".wm-lightbox-menu-sheet").style.transform =
                "translateY(" + deltaY + "px)";
            artworkMenu.querySelector(".wm-lightbox-menu-backdrop").style.opacity =
                String(Math.max(0, 1 - deltaY / window.innerHeight));
        }

        function handleArtworkMenuDragEnd(event) {
            if (!artworkMenuDrag || artworkMenuDrag.pointerId !== event.pointerId) {
                return;
            }

            var shouldClose = event.type === "pointerup" && artworkMenuDrag.deltaY > 72;
            artworkMenuDrag = null;

            if (shouldClose) {
                setArtworkMenuOpen(false);
                return;
            }

            if (event.type === "pointerup") {
                artworkMenu.querySelector(".wm-lightbox-menu-sheet").style.transform =
                    "translateY(0)";
                artworkMenu.querySelector(".wm-lightbox-menu-backdrop").style.opacity = "1";
            } else {
                setArtworkMenuOpen(false);
            }
        }

        function handleArtworkSwipeStart(event) {
            if (event.pointerType === "touch" && window.matchMedia("(max-width: 1024px)").matches) {
                artworkPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
                if (artworkPointers.size === 1) {
                    artworkSwipeStart = {
                        pointerId: event.pointerId,
                        x: event.clientX,
                        y: event.clientY
                    };
                    artworkPanStart = artworkZoomScale > 1
                        ? { pointerId: event.pointerId, x: event.clientX, y: event.clientY, panX: artworkPanX, panY: artworkPanY }
                        : null;
                    artworkGestureHandled = false;
                } else {
                    artworkSwipeStart = null;
                    artworkPanStart = null;
                    artworkGestureHandled = true;
                    var touchPoints = Array.from(artworkPointers.values());
                    artworkPinchStart = {
                        distance: Math.hypot(
                            touchPoints[1].x - touchPoints[0].x,
                            touchPoints[1].y - touchPoints[0].y
                        ),
                        scale: artworkZoomScale,
                        panX: artworkPanX,
                        panY: artworkPanY,
                        centerX: (touchPoints[0].x + touchPoints[1].x) / 2,
                        centerY: (touchPoints[0].y + touchPoints[1].y) / 2
                    };
                }
                artworkArea.setPointerCapture(event.pointerId);
                event.preventDefault();
                return;
            }

            if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) {
                return;
            }

            if (event.pointerType === "mouse" && artworkZoomScale > 1) {
                artworkPanStart = {
                    pointerId: event.pointerId,
                    x: event.clientX,
                    y: event.clientY,
                    panX: artworkPanX,
                    panY: artworkPanY
                };
                artworkArea.setPointerCapture(event.pointerId);
                event.preventDefault();
                return;
            }

            artworkSwipeStart = {
                pointerId: event.pointerId,
                x: event.clientX,
                y: event.clientY
            };

            artworkArea.setPointerCapture(event.pointerId);
        }

        function handleArtworkPointerMove(event) {
            var isTouchPointer = artworkPointers.has(event.pointerId);
            if (isTouchPointer) {
                artworkPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
            }

            if (isTouchPointer && artworkPointers.size >= 2 && artworkPinchStart) {
                var touchPoints = Array.from(artworkPointers.values());
                var distance = Math.hypot(
                    touchPoints[1].x - touchPoints[0].x,
                    touchPoints[1].y - touchPoints[0].y
                );
                var centerX = (touchPoints[0].x + touchPoints[1].x) / 2;
                var centerY = (touchPoints[0].y + touchPoints[1].y) / 2;
                var areaRect = artworkArea.getBoundingClientRect();
                var pointX = artworkPinchStart.centerX - areaRect.left - areaRect.width / 2;
                var pointY = artworkPinchStart.centerY - areaRect.top - areaRect.height / 2;
                artworkZoomScale = Math.max(1, Math.min(5,
                    artworkPinchStart.scale * distance / Math.max(1, artworkPinchStart.distance)
                ));
                var scaleRatio = artworkZoomScale / artworkPinchStart.scale;
                artworkPanX = artworkPinchStart.panX + pointX * (1 - scaleRatio) + centerX - artworkPinchStart.centerX;
                artworkPanY = artworkPinchStart.panY + pointY * (1 - scaleRatio) + centerY - artworkPinchStart.centerY;
                applyArtworkZoom();
                artworkGestureHandled = true;
                event.preventDefault();
                return;
            }

            if (artworkPanStart && artworkPanStart.pointerId === event.pointerId) {
                var deltaX = event.clientX - artworkPanStart.x;
                var deltaY = event.clientY - artworkPanStart.y;
                if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
                    artworkPanX = artworkPanStart.panX + deltaX;
                    artworkPanY = artworkPanStart.panY + deltaY;
                    applyArtworkZoom();
                    artworkGestureHandled = true;
                    event.preventDefault();
                }
                return;
            }

            if (!isTouchPointer) {
                return;
            }
        }

        function handleArtworkSwipeEnd(event) {
            if (artworkPointers.has(event.pointerId)) {
                artworkPointers.delete(event.pointerId);
                if (artworkPointers.size < 2) {
                    artworkPinchStart = null;
                }
                if (artworkPointers.size === 0) {
                    var touchSwipe = artworkSwipeStart;
                    var touchGestureHandled = artworkGestureHandled;
                    artworkSwipeStart = null;
                    artworkPanStart = null;
                    artworkGestureHandled = false;

                    if (event.type === "pointerup" && artworkZoomScale === 1 &&
                        !touchGestureHandled && touchSwipe &&
                        touchSwipe.pointerId === event.pointerId) {
                        var touchDeltaX = event.clientX - touchSwipe.x;
                        var touchDeltaY = event.clientY - touchSwipe.y;
                        if (Math.abs(touchDeltaX) >= 48 && Math.abs(touchDeltaX) >= Math.abs(touchDeltaY) * 1.25) {
                            suppressArtworkClick = true;
                            showArtworkPost(activeArtworkIndex + (touchDeltaX < 0 ? 1 : -1), true);
                        } else if (Math.hypot(touchDeltaX, touchDeltaY) < 16) {
                            handleArtworkTouchTap(event);
                        } else {
                            suppressArtworkClick = true;
                        }
                    } else {
                        suppressArtworkClick = true;
                    }
                } else {
                    suppressArtworkClick = true;
                }
                return;
            }

            if (artworkPanStart && artworkPanStart.pointerId === event.pointerId) {
                artworkPanStart = null;
                artworkSwipeStart = null;
                artworkGestureHandled = false;
                suppressArtworkClick = true;
                return;
            }

            if (!artworkSwipeStart || event.pointerId !== artworkSwipeStart.pointerId) {
                return;
            }

            if (event.type === "pointercancel") {
                artworkSwipeStart = null;
                return;
            }

            var deltaX = event.clientX - artworkSwipeStart.x;
            var deltaY = event.clientY - artworkSwipeStart.y;
            artworkSwipeStart = null;

            if (artworkZoomScale !== 1 ||
                Math.abs(deltaX) < 48 ||
                Math.abs(deltaX) < Math.abs(deltaY) * 1.25) {
                return;
            }

            suppressArtworkClick = true;
            window.requestAnimationFrame(function () {
                suppressArtworkClick = false;
            });
            showArtworkPost(activeArtworkIndex + (deltaX < 0 ? 1 : -1), true);
        }

        function handleArtworkWheel(event) {
            if (!window.matchMedia("(max-width: 1024px)").matches || !artworkDialog.open) {
                return;
            }

            event.preventDefault();
            var scaleStep = event.deltaY < 0 ? 1.18 : 1 / 1.18;
            setArtworkZoom(artworkZoomScale * scaleStep, event.clientX, event.clientY);
        }

        function handleArtworkDoubleClick(event) {
            if (!window.matchMedia("(max-width: 1024px)").matches || !artworkDialog.open) {
                return;
            }

            event.preventDefault();
            toggleArtworkZoomAt(event.clientX, event.clientY);
        }

        function toggleArtworkInterface() {
            if (!window.matchMedia("(max-width: 1024px)").matches ||
                artworkDetails.classList.contains("is-description-expanded") ||
                !artworkDialog.open ||
                !artworkMenu.hidden) {
                return;
            }

            artworkDialog.classList.toggle("is-interface-hidden");
        }

        function setArtworkMenuOpen(isOpen) {
            artworkMenuToggle.setAttribute("aria-expanded", String(isOpen));
            window.clearTimeout(artworkMenuCloseTimer);

            if (isOpen) {
                artworkMenu.hidden = false;
                if (window.matchMedia("(max-width: 1024px)").matches) {
                    var menuBackdrop = artworkMenu.querySelector(".wm-lightbox-menu-backdrop");
                    var menuSheet = artworkMenu.querySelector(".wm-lightbox-menu-sheet");
                    artworkMenu.offsetHeight;
                    artworkMenu.classList.add("is-open");
                    menuBackdrop.style.opacity = "0";
                    menuSheet.style.transform = "translateY(100%)";
                    menuSheet.offsetHeight;
                    menuBackdrop.style.opacity = "1";
                    menuSheet.style.transform = "translateY(0)";
                }
                return;
            }

            if (window.matchMedia("(max-width: 1024px)").matches && !artworkMenu.hidden) {
                artworkMenu.classList.remove("is-open");
                var closingMenuBackdrop = artworkMenu.querySelector(".wm-lightbox-menu-backdrop");
                var closingMenuSheet = artworkMenu.querySelector(".wm-lightbox-menu-sheet");
                closingMenuBackdrop.style.opacity = "0";
                closingMenuSheet.style.transform = "translateY(100%)";
                var closeDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 280;
                artworkMenuCloseTimer = window.setTimeout(function () {
                    artworkMenu.hidden = true;
                    closingMenuBackdrop.style.removeProperty("opacity");
                    closingMenuSheet.style.removeProperty("transform");
                }, closeDuration);
                return;
            }

            artworkMenu.hidden = true;
            artworkMenu.classList.remove("is-open");
            artworkMenu.querySelector(".wm-lightbox-menu-backdrop").style.removeProperty("opacity");
            artworkMenu.querySelector(".wm-lightbox-menu-sheet").style.removeProperty("transform");
        }

        tabs.forEach(function (tab, index) {
            tab.addEventListener("click", function () {
                selectMediaTab(tab, true);
            });

            tab.addEventListener("keydown", function (event) {
                var nextIndex = index;
                if (event.key === "ArrowRight") {
                    nextIndex = (index + 1) % tabs.length;
                } else if (event.key === "ArrowLeft") {
                    nextIndex = (index - 1 + tabs.length) % tabs.length;
                } else if (event.key === "Home") {
                    nextIndex = 0;
                } else if (event.key === "End") {
                    nextIndex = tabs.length - 1;
                } else {
                    return;
                }

                event.preventDefault();
                tabs[nextIndex].focus();
                selectMediaTab(tabs[nextIndex], true);
            });
        });

        function showArtworkPost(index, animate) {
            activeArtworkIndex = (index + artworkPosts.length) % artworkPosts.length;
            var post = artworkPosts[activeArtworkIndex];
            activeArtworkButton = artworkButtons[activeArtworkIndex];

            unfreezeDesktopArtworkControls();
            artworkControlPositions = null;
            artworkPost.classList.remove("is-changing");
            resetArtworkZoom();
            artworkDialogImage.src = post.source;
            artworkDialogImage.alt = post.alt;
            positionArtworkCounter();
            fitArtworkPreview();
            artworkTitle.textContent = post.title;
            artworkDescription.textContent = post.description;
            artworkDetails.classList.remove("is-description-expanded");
            artworkPost.classList.remove("is-description-expanded");
            artworkDialog.classList.remove("is-interface-hidden");
            artworkPost.classList.remove("has-toolbar-overlap");
            artworkArea.style.removeProperty("--artwork-mask-start");
            artworkArea.style.removeProperty("--artwork-mask-end");
            updateArtworkDescriptionMode();
            artworkCounter.textContent = isEnglishPage
                ? "Artwork " + (activeArtworkIndex + 1) + " of " + artworkPosts.length
                : "Praca " + (activeArtworkIndex + 1) + " z " + artworkPosts.length;
            artworkDownloadLink.href = post.source;
            artworkDownloadLink.download = post.source.split("/").pop().split("?")[0];
            artworkSocialLinks.forEach(function (link) {
                var href = post.socialLinks[link.dataset.social];
                if (href) {
                    link.href = href;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    link.removeAttribute("aria-disabled");
                    link.removeAttribute("tabindex");
                    link.title = "";
                } else {
                    link.removeAttribute("href");
                    link.removeAttribute("target");
                    link.removeAttribute("rel");
                    link.setAttribute("aria-disabled", "true");
                    link.tabIndex = -1;
                    link.title = isEnglishPage
                        ? "A link to this post will be added later"
                        : "Link do tego posta zostanie dodany później";
                }
            });
            setArtworkMenuOpen(false);

            if (artworkDialog.open) {
                setProjectMediaHash(projectPopup ? "/dodatki/" + post.slug : "/" + post.slug, true);
            }

            if (animate) {
                window.requestAnimationFrame(function () {
                    artworkPost.classList.add("is-changing");
                });
            }
        }

        function closeArtworkPreview() {
            if (!artworkDialog.open || artworkIsClosing) {
                return;
            }

            artworkIsClosing = true;
            resetArtworkZoom();
            artworkDetails.classList.remove("is-description-expanded");
            artworkPost.classList.remove("is-description-expanded", "has-toolbar-overlap");
            artworkArea.style.removeProperty("--artwork-mask-start");
            artworkArea.style.removeProperty("--artwork-mask-end");
            unfreezeDesktopArtworkControls();
            artworkControlPositions = null;
            updateArtworkDescriptionMode();
            var duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220;
            var animation = artworkDialog.animate(
                [
                    { opacity: 1 },
                    { opacity: 0 }
                ],
                { duration: duration, easing: "ease", fill: "forwards" }
            );

            animation.onfinish = function () {
                animation.cancel();
                artworkIsClosing = false;
                artworkDialog.close();
            };
        }

        function openArtworkRoute(suffix) {
            var route = suffix.replace(/^\/+/, "");
            var routeParts = route.split("/");
            var isExtrasRoute = projectPopup && routeParts[0] === "dodatki";
            if (projectPopup) {
                var tab = isExtrasRoute ? tabs[1] : tabs[0];
                selectMediaTab(tab, false);
            }

            if ((isExtrasRoute && routeParts[1]) || (!projectPopup && routeParts[0])) {
                var slug;
                try {
                    slug = decodeURIComponent(projectPopup ? routeParts.slice(1).join("/") : routeParts.join("/"));
                } catch (error) {
                    console.error("Invalid artwork route in URL.", error);
                    return;
                }
                var artworkIndex = artworkPosts.findIndex(function (post) {
                    return post.slug === slug;
                });
                if (artworkIndex === -1) {
                    return;
                }

                if (!artworkDialog.open) {
                    openArtworkPreview(artworkIndex);
                } else {
                    if (projectPopup) {
                        projectPopup.classList.remove("active");
                    }
                    toggleBodyScrollOff();
                    if (activeArtworkIndex !== artworkIndex) {
                        showArtworkPost(artworkIndex, false);
                    }
                }
                return;
            }

            if (artworkDialog.open) {
                closeArtworkPreview();
            }
        }

        function openArtworkPreview(artworkIndex) {
            projectPopupWasActive = Boolean(projectPopup && projectPopup.classList.contains("active"));
            if (projectPopup) {
                projectPopup.classList.remove("active");
            }
            showArtworkPost(artworkIndex, false);
            if (!artworkDialog.open) {
                artworkDialog.showModal();
            }
            toggleBodyScrollOff();
            setProjectMediaHash(projectPopup
                ? "/dodatki/" + artworkPosts[artworkIndex].slug
                : "/" + artworkPosts[artworkIndex].slug, false);
        }

        if (artworkPosts.length && artworkDialog && artworkDialogImage && closeArtworkButton) {
            artworkDialogImage.draggable = false;
            positionArtworkCounter();
            updateArtworkDescriptionMode();
            artworkDialogImage.addEventListener("load", fitArtworkPreview);
            window.addEventListener("resize", function () {
                positionArtworkCounter();
                updateArtworkDescriptionMode();
                if (artworkDialog.open) {
                    fitArtworkPreview();
                }
            });

            artworkArea.addEventListener("pointerdown", handleArtworkSwipeStart);
            document.addEventListener("pointermove", handleArtworkPointerMove, { passive: false });
            document.addEventListener("pointerup", handleArtworkSwipeEnd);
            document.addEventListener("pointercancel", handleArtworkSwipeEnd);
            artworkArea.addEventListener("wheel", handleArtworkWheel, { passive: false });
            artworkArea.addEventListener("dblclick", handleArtworkDoubleClick);
            artworkArea.addEventListener("click", function (event) {
                if (suppressArtworkClick) {
                    suppressArtworkClick = false;
                    return;
                }
                if (event.target === artworkDialogImage || event.target === artworkArea) {
                    toggleArtworkInterface();
                }
            });

            artworkButtons.forEach(function (button, artworkIndex) {
                button.addEventListener("click", function () {
                    openArtworkPreview(artworkIndex);
                });
            });

            previousArtworkButton.addEventListener("click", function () {
                showArtworkPost(activeArtworkIndex - 1, true);
            });

            nextArtworkButton.addEventListener("click", function () {
                showArtworkPost(activeArtworkIndex + 1, true);
            });

            artworkMenuToggle.addEventListener("click", function () {
                setArtworkMenuOpen(artworkMenuToggle.getAttribute("aria-expanded") !== "true");
            });

            artworkMenu.querySelector(".wm-lightbox-menu-backdrop").addEventListener("click", function () {
                setArtworkMenuOpen(false);
            });

            var artworkMenuHandle = artworkMenu.querySelector(".wm-lightbox-menu-handle");
            artworkMenuHandle.addEventListener("pointerdown", handleArtworkMenuDragStart);
            document.addEventListener("pointermove", handleArtworkMenuDragMove);
            document.addEventListener("pointerup", handleArtworkMenuDragEnd);
            document.addEventListener("pointercancel", handleArtworkMenuDragEnd);

            artworkDescription.addEventListener("click", toggleArtworkDescription);
            artworkDescription.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleArtworkDescription();
                }
            });

            artworkMenu.addEventListener("click", function (event) {
                var clickedItem = event.target.closest('[role="menuitem"]');
                if (clickedItem && clickedItem.getAttribute("aria-disabled") !== "true") {
                    setArtworkMenuOpen(false);
                }
            });

            artworkMenu.addEventListener("keydown", function (event) {
                var currentIndex = artworkMenuItems.indexOf(document.activeElement);
                var nextIndex = currentIndex;
                if (event.key === "ArrowDown") {
                    nextIndex = (currentIndex + 1) % artworkMenuItems.length;
                } else if (event.key === "ArrowUp") {
                    nextIndex = (currentIndex - 1 + artworkMenuItems.length) % artworkMenuItems.length;
                } else if (event.key === "Home") {
                    nextIndex = 0;
                } else if (event.key === "End") {
                    nextIndex = artworkMenuItems.length - 1;
                } else {
                    return;
                }

                event.preventDefault();
                artworkMenuItems[nextIndex].focus();
            });

            document.addEventListener("click", function (event) {
                if (!artworkMenu.hidden && !artworkMenu.contains(event.target) && event.target !== artworkMenuToggle) {
                    setArtworkMenuOpen(false);
                }
            });

            closeArtworkButton.addEventListener("click", function () {
                closeArtworkPreview();
            });

            artworkDialog.addEventListener("click", function (event) {
                if (event.target === artworkDialog) {
                    closeArtworkPreview();
                }
            });

            artworkDialog.addEventListener("cancel", function (event) {
                event.preventDefault();
                closeArtworkPreview();
            });

            artworkDialog.addEventListener("close", function () {
                if (projectPopupWasActive && projectPopup) {
                    projectPopup.classList.add("active");
                }
                var artworkHashPrefix = projectPopup
                    ? "#" + galleryRoute + "/dodatki/"
                    : "#" + galleryRoute + "/";
                if (window.location.hash.indexOf(artworkHashPrefix) === 0) {
                    setProjectMediaHash(projectPopup ? "/dodatki" : "", true);
                }
                toggleBodyScrollOn();
                if (activeArtworkButton) {
                    activeArtworkButton.focus();
                }
            });

            document.addEventListener("keydown", function (event) {
                if (!artworkDialog.open) {
                    return;
                }

                if (event.key === "Escape") {
                    event.preventDefault();
                    if (!artworkMenu.hidden) {
                        setArtworkMenuOpen(false);
                        artworkMenuToggle.focus();
                        return;
                    }
                    closeArtworkPreview();
                } else if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    showArtworkPost(activeArtworkIndex - 1, true);
                } else if (event.key === "ArrowRight") {
                    event.preventDefault();
                    showArtworkPost(activeArtworkIndex + 1, true);
                }
            });

            if (projectPopup) {
                window.openProjectMediaRoute = openArtworkRoute;
            } else {
                var handleGalleryLocation = function () {
                    var routePrefix = "#" + galleryRoute;
                    if (window.location.hash.indexOf(routePrefix) !== 0) {
                        if (artworkDialog.open) {
                            closeArtworkPreview();
                        }
                        return;
                    }
                    var routeSuffix = window.location.hash.slice(routePrefix.length);
                    openArtworkRoute(routeSuffix);
                };
                window.addEventListener("hashchange", handleGalleryLocation);
                window.addEventListener("popstate", handleGalleryLocation);
                handleGalleryLocation();
            }
        }
    });
});