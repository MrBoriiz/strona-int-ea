(() => {
  const storageKey = "entangledArtistsEpisodeView";
  const buttonLabels = {
    pl: { list: "Lista", cards: "Kafelki", singleFilm: "FILM TWORZONY WE WSPÓŁPRACY:" },
    en: { list: "List", cards: "Grid", singleFilm: "FILM CREATED IN COLLABORATION:" }
  };

  function readPreference() {
    try {
      return localStorage.getItem(storageKey) || "cards";
    } catch (error) {
      console.error("Nie udało się odczytać ustawienia widoku odcinków.", error);
      return "list";
    }
  }

  function createViewButton(view, label, icon) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "episode-view-button";
    button.dataset.episodeView = view;
    button.setAttribute("aria-label", label);
    button.title = label;
    button.innerHTML = `${icon}<span>${label}</span>`;
    return button;
  }

  function createViewButtons(labels) {
    const listIcon = '<svg aria-hidden="true" viewBox="0 0 20 20"><path d="M7 4h10M7 10h10M7 16h10M3 4h.01M3 10h.01M3 16h.01" /></svg>';
    const cardsIcon = '<svg aria-hidden="true" viewBox="0 0 20 20"><rect x="2.5" y="2.5" width="6" height="6" rx="1"/><rect x="11.5" y="2.5" width="6" height="6" rx="1"/><rect x="2.5" y="11.5" width="6" height="6" rx="1"/><rect x="11.5" y="11.5" width="6" height="6" rx="1"/></svg>';
    const buttons = document.createElement("div");
    buttons.className = "episode-view-buttons";
    buttons.append(
      createViewButton("list", labels.list, listIcon),
      createViewButton("cards", labels.cards, cardsIcon)
    );
    return buttons;
  }

  function addStandaloneFilmControls(labels) {
    document.querySelectorAll(".popup .content .modal").forEach((modal) => {
      if (modal.querySelector(".episode-list-title")) {
        return;
      }

      const [film] = modal.querySelectorAll(":scope > .play-btn");
      if (!film || modal.querySelectorAll(":scope > .play-btn").length !== 1) {
        return;
      }

      const list = document.createElement("div");
      list.className = "episode-grid-list episode-single-film-list";
      film.before(list);
      list.append(film);

      const precedingSeparator = list.previousElementSibling?.matches("hr") ? list.previousElementSibling : null;
      const followingSeparator = list.nextElementSibling?.matches("hr") ? list.nextElementSibling : null;
      precedingSeparator?.classList.add("episode-single-film-separator");
      followingSeparator?.classList.add("episode-single-film-separator");

      const title = document.createElement("div");
      title.className = "episode-list-title";
      const titleText = document.createElement("p");
      titleText.textContent = labels.singleFilm;
      title.append(titleText);

      const controls = document.createElement("div");
      controls.className = "episode-list-controls";
      const viewControl = document.createElement("div");
      viewControl.className = "episode-view-control";
      viewControl.append(createViewButtons(labels));
      controls.append(viewControl);
      (precedingSeparator || list).before(title);
      (precedingSeparator || list).before(controls);
    });
  }

  function prepareSeasonCarousel(list) {
    let season = "";
    let firstCardInSeason = true;

    [...list.children].forEach((item) => {
      if ((item.matches("p, h4")) && item.textContent.trim()) {
        season = item.textContent.trim();
        item.classList.add("episode-season-heading");
        firstCardInSeason = true;
        return;
      }

      const card = item.matches(".play-btn") ? item : item.matches("a") && item.querySelector(".play-btn") ? item : null;
      if (!card || !season) {
        return;
      }

      card.dataset.episodeSeason = season;
      if (firstCardInSeason) {
        card.classList.add("episode-season-start");
        card.dataset.episodeSeasonFirst = "true";
        firstCardInSeason = false;
      }
    });

    if (season) {
      list.classList.add("episode-season-carousel");
      return true;
    }

    return false;
  }

  function setSeasonEpisodeOrder(list, reverseSeasons) {
    const cards = [...list.querySelectorAll(":scope > .play-btn[data-episode-season], :scope > a[data-episode-season]")];
    const seasons = new Map();
    cards.forEach((card) => {
      const seasonCards = seasons.get(card.dataset.episodeSeason) || [];
      seasonCards.push(card);
      seasons.set(card.dataset.episodeSeason, seasonCards);
    });

    let order = 0;
    const seasonGroups = [...seasons.values()];
    if (reverseSeasons) {
      seasonGroups.reverse();
    }

    seasonGroups.forEach((seasonCards) => {
      seasonCards.forEach((card, index) => {
        card.style.order = reverseSeasons ? String(order + index) : "";
        card.classList.toggle("episode-season-start", card.dataset.episodeSeasonFirst === "true");
      });
      order += seasonCards.length + 1;
    });
  }

  function updateCurrentSeason(list, label) {
    const cards = [...list.querySelectorAll(":scope > .play-btn[data-episode-season], :scope > a[data-episode-season]")];
    if (!cards.length) {
      return;
    }

    const listRect = list.getBoundingClientRect();
    const center = listRect.left + list.clientWidth / 2;
    const currentCard = cards.reduce((nearest, card) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      return !nearest || distance < nearest.distance ? { card, distance } : nearest;
    }, null)?.card;

    if (currentCard) {
      label.textContent = currentCard.dataset.episodeSeason;
      label.hidden = false;
    }
  }

  function addEpisodeViewControls() {
    const language = /(^|\/)eng\//i.test(window.location.pathname) ? "en" : "pl";
    const labels = buttonLabels[language];

    document.querySelectorAll(".popup .content .episode-list-title").forEach((title) => {
      if (title.nextElementSibling?.classList.contains("episode-list-controls")) {
        return;
      }

      const controls = document.createElement("div");
      controls.className = "episode-list-controls";

      const seasonControl = title.nextElementSibling?.matches(".season-picker")
        ? title.nextElementSibling
        : title.nextElementSibling?.matches("select.season")
          ? title.nextElementSibling
          : null;
      const seasonSelect = seasonControl?.matches("select.season")
        ? seasonControl
        : seasonControl?.querySelector("select.season");
      const seasonLists = [];

      if (seasonSelect) {
        let list = seasonControl.nextElementSibling;
        while (list?.matches("div[id]") && list.querySelector(".play-btn")) {
          list.classList.add("episode-grid-list");
          seasonLists.push(list);
          list = list.nextElementSibling;
        }
        controls.append(seasonControl);
      } else {
        const list = document.createElement("div");
        list.className = "episode-grid-list";
        title.after(list);
        while (list.nextElementSibling && !list.nextElementSibling.matches("section.project-details")) {
          list.append(list.nextElementSibling);
        }
      }

      const buttons = createViewButtons(labels);
      const viewControl = document.createElement("div");
      viewControl.className = "episode-view-control";
      const currentSeason = document.createElement("span");
      currentSeason.className = "episode-current-season";
      currentSeason.hidden = true;
      currentSeason.setAttribute("aria-live", "polite");
      viewControl.append(currentSeason, buttons);
      controls.append(viewControl);

      const allSeasonsList = seasonLists.find((list) => prepareSeasonCarousel(list));
      if (allSeasonsList) {
        const allSeasonsSelected = () => seasonSelect.selectedOptions[0]?.textContent.trim().toLowerCase().includes("wszystko")
          || seasonSelect.selectedOptions[0]?.textContent.trim().toLowerCase().includes("all");
        const resetCarouselStart = () => {
          if (allSeasonsSelected() && document.body.classList.contains("episode-card-view")
            && window.matchMedia("(max-width: 550px)").matches
            && getComputedStyle(allSeasonsList).display !== "none") {
            allSeasonsList.scrollLeft = 0;
            updateCurrentSeason(allSeasonsList, currentSeason);
          }
        };
        const updateSeasonLabel = () => {
          const showingAllSeasons = allSeasonsSelected();
          const isVisible = getComputedStyle(allSeasonsList).display !== "none";
          const isCarouselView = document.body.classList.contains("episode-card-view") && window.matchMedia("(max-width: 550px)").matches;
          setSeasonEpisodeOrder(allSeasonsList, Boolean(showingAllSeasons && isVisible && isCarouselView));
          viewControl.classList.toggle("has-current-season", Boolean(showingAllSeasons && isVisible && isCarouselView));
          if (showingAllSeasons && isVisible && isCarouselView) {
            updateCurrentSeason(allSeasonsList, currentSeason);
          } else {
            currentSeason.hidden = true;
          }
        };

        allSeasonsList.addEventListener("scroll", () => {
          if (!currentSeason.hidden) {
            window.requestAnimationFrame(() => updateCurrentSeason(allSeasonsList, currentSeason));
          }
        }, { passive: true });
        seasonSelect.addEventListener("change", () => {
          updateSeasonLabel();
          if (allSeasonsSelected()) {
            resetCarouselStart();
            window.setTimeout(resetCarouselStart, 100);
          }
        });
        window.addEventListener("resize", updateSeasonLabel);
        window.addEventListener("episodeviewchange", () => {
          updateSeasonLabel();
          resetCarouselStart();
          window.setTimeout(resetCarouselStart, 100);
        });
        updateSeasonLabel();
      }

      if (seasonSelect) {
        title.after(controls);
      } else {
        title.nextElementSibling.before(controls);
      }
    });

    addStandaloneFilmControls(labels);
  }

  function setView(view, persist) {
    document.body.classList.toggle("episode-card-view", view === "cards");
    document.querySelectorAll(".episode-view-button").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.episodeView === view));
    });
    window.dispatchEvent(new Event("episodeviewchange"));

    if (persist) {
      try {
        localStorage.setItem(storageKey, view);
      } catch (error) {
        console.error("Nie udało się zapisać ustawienia widoku odcinków.", error);
      }
    }
  }

  function initialize() {
    addEpisodeViewControls();
    setView(readPreference(), false);
    document.querySelectorAll(".episode-view-buttons").forEach((buttons) => {
      buttons.addEventListener("click", (event) => {
        const button = event.target.closest("[data-episode-view]");
        if (button) {
          setView(button.dataset.episodeView, true);
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
