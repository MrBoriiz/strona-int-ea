//Kopiowanie istniejącego już diva z całym paskiem menu na górze strony (navbar) z pliku "powiadomienia-eng.html" do diva z id="powiadomienia-eng"

$(document).ready(function () {
    $("#powiadomienia-eng").load("powiadomienia-eng.html");
});