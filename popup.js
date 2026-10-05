//chowanie scrolla przy popupie
function toggleBodyScrollOff() {
    document.body.style.overflow = 'hidden';
}

//przywracanie scrolla przy zamknięciu popupu
function toggleBodyScrollOn() {
    document.body.style.overflow = '';
}

//wojny meneli
function togglePopup8(){
    document.getElementById("popup-8").classList.toggle("active");
    toggleBodyScrollOff();
}


//=============================== \/ \/ \/ NIEUŻYWANE POPUPY \/ \/ \/ ===============================

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



//=============================== /\ /\ /\ NIEUŻYWANE POPUPY /\ /\ /\ ===============================




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
        "popup-18": "koprod/sylw-egz"
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
});