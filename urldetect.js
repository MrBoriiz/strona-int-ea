//Otwiera kartę z serialem / filmem jeśli URL zawiera odpowiedni fragment tekstu

let currentPage = location.href;
    //Otwiera kartę bez odświeżania strony
    setInterval(function()
    {
        if (currentPage != location.href)
        {
            // page has changed, set new page as 'current'
            currentPage = location.href;
            $(document).ready(function() {
                if (window.location.href.indexOf("#prod/wm") > -1) {
                    togglePopup8();
                }
                if (window.location.href.indexOf("#prod/mg") > -1) {
                    togglePopup9();
                }
                if (window.location.href.indexOf("#prod/uvr") > -1) {
                    togglePopup10();
                }
                if (window.location.href.indexOf("#prod/ow") > -1) {
                    togglePopup11();
                }
                if (window.location.href.indexOf("#prod/evwttg2") > -1) {
                    togglePopup12();
                }
                if (window.location.href.indexOf("#koprod/egz") > -1) {
                    togglePopup13();
                }
                if (window.location.href.indexOf("#koprod/be") > -1) {
                    togglePopup14();
                }
                if (window.location.href.indexOf("#koprod/wielk-egz") > -1) {
                    togglePopup15();
                }
                if (window.location.href.indexOf("#koprod/swzmarl-egz") > -1) {
                    togglePopup16();
                }
                if (window.location.href.indexOf("#koprod/egln") > -1) {
                    togglePopup17();
                }
                if (window.location.href.indexOf("#koprod/sylw-egz") > -1) {
                    togglePopup18();
                }

    //Szczegóły na kartach projektów
    
                if (window.location.href.indexOf("#prod/wm/szczegoly") > -1) {
                    togglePopup8();
                    document.getElementById("prod/wm/szczegoly").scrollIntoView();
                }

                if (window.location.href.indexOf("#prod/mg/szczegoly") > -1) {
                    togglePopup9();
                    document.getElementById("prod/mg/szczegoly").scrollIntoView();
                }


            });
        }
    }, 50);

    //Otwiera kartę gdy został wprowadzony / kliknięty link z hastagiem bądź przy odświeżeniu strony kiedy wprowadzony jest w URL hashtag znajdujący się w kodzie poniżej 
    $(document).ready(function() {
        if (window.location.href.indexOf("#prod/wm") > -1) {
            togglePopup8();
        }
        if (window.location.href.indexOf("#prod/mg") > -1) {
            togglePopup9();
        }
        if (window.location.href.indexOf("#prod/uvr") > -1) {
            togglePopup10();
        }
        if (window.location.href.indexOf("#prod/ow") > -1) {
            togglePopup11();
        }
        if (window.location.href.indexOf("#prod/evwttg2") > -1) {
            togglePopup12();
        }
        if (window.location.href.indexOf("#koprod/egz") > -1) {
            togglePopup13();
        }
        if (window.location.href.indexOf("#koprod/be") > -1) {
            togglePopup14();
        }
        if (window.location.href.indexOf("#koprod/wielk-egz") > -1) {
            togglePopup15();
        }
        if (window.location.href.indexOf("#koprod/swzmarl-egz") > -1) {
            togglePopup16();
        }
        if (window.location.href.indexOf("#koprod/egln") > -1) {
            togglePopup17();
        }
        if (window.location.href.indexOf("#koprod/sylw-egz") > -1) {
            togglePopup18();
        }
    });