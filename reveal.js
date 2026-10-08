document.addEventListener("DOMContentLoaded", function () {
    var sections = document.querySelectorAll(
        ".ambient-home > header, " +
        ".ambient-home > .title2, " +
        ".ambient-home > .srodkowanie, " +
        ".ambient-home > .gallery, " +
        ".ambient-home > footer, " +
        ".ambient-contact > .title2, " +
        ".ambient-contact > footer"
    );

    if (!("IntersectionObserver" in window)) {
        return;
    }

    document.body.classList.add("reveal-enabled");

    var observer = new IntersectionObserver(function (entries, sectionObserver) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px"
    });

    sections.forEach(function (section) {
        section.classList.add("reveal-section");
        observer.observe(section);
    });
});
