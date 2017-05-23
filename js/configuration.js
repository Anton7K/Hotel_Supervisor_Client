/**
 * Created by Anton on 23.05.2017.
 */
var CONFIGURATION_SERVER_IP;

$(document).ready(function () {
    $("#configureIp").click(function (event) {
        event.preventDefault();
        window.location = "configureClient.html";
    });

    $("#configureButton").click(function (event) {
        event.preventDefault();
        var serverIp = $("#serverIPField").val();
        setCookie("configServerIp", serverIp);
        window.location = "index.html";
    });
});

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value){
    document.cookie = name+ "=" +value;
}