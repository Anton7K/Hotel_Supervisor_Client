/**
 * Created by Anton on 19.05.2017.
 */
$(document).ready(function () {
    $("#logout_link").click(function (event) {
        event.preventDefault();
        logout();
    });

    function logout() {
        $.ajax({
            url: 'http://localhost:8080/logout',
            type: "GET",
            xhrFields: {
                withCredentials: true
            },
            success: function (received) {
                if(received){
                    window.location = "index.html";
                }
            }
        });
    }
});