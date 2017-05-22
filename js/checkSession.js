/**
 * Created by Anton on 19.05.2017.
 */
$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8080/sessionCheck',
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function(received){
            if(received.isValid){
            $("#user_name").text(received.name)
            }
            else{
                window.location = "index.html";
            }
        }
    });
});