//Kopiowanie istniejącego już diva z całym paskiem menu na górze strony (navbar) z pliku "powiadomienia.html" do diva z id="powiadomienia"

$(document).ready(function () {
    $("#powiadomienia").load("powiadomienia.html");
});

$(document).ready(function () {
    $("#powiadomienia").load("../powiadomienia.html");
});