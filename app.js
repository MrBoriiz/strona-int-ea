const THUMBNAILS = document.querySelectorAll(".thumbnail img");
const POPUP = document.querySelector(".popup");
const POPUP_CLOSE = document.querySelector(".popup__close");
const MOUSE = document.querySelector(".hover")

THUMBNAILS.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
        POPUP.classList.remove("hidden");
    });
});

POPUP_CLOSE.addEventListener("click", () => {
    POPUP.classList.add("hidden");
});