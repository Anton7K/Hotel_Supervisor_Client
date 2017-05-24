/**
 * Created by Anton on 19.05.2017.
 */
$(document).ready(function () {
    $("#authorization_button").click(function (event) {
        event.preventDefault();
        $(".error_message").css("display", "none");
        var login = $("#login").val();
        var password = $("#password").val();
        var role = $(".role_checker:checked").val();
        authorize(login, password, role);
    });
    $("#registration_link").click(function (event) {
        event.preventDefault();
        window.location = "registration.html";
    });
    function authorize(log, pass, role) {
        $.ajax({
            url: 'http://' + getCookie("configServerIp") + ':8080/authorization',
            type: "POST",
            data: {login: log, password: pass, user_role: role},
            xhrFields: {
                withCredentials: true
            },
            success: function (received) {
                if (received.isAuthorized) {
                    if(role==="admin") {
                        window.location = "home.html";
                    }
                    if(role==="employee"){
                        window.location = "hotelEquipment.html";
                    }
                }
                else{
                    var error = received.error;
                    if (error == "login") {
                        $("#login_error").css("display", "block");
                    }
                    if (error == "password") {
                        $("#password_error").css("display", "block");
                    }
                }
            }
        });
    }
});