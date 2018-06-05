/**
 * Created by Anton on 24.05.2017.
 */
$(document).ready(function () {
    var hotelId = getParamFromUrl("hotelId");
    $("#employeesBreadcrumb").attr("href", "employees.html?hotelId=" + hotelId);
    $("#registerEmployeeButton").click(function (event) {
        event.preventDefault();
        $(".error_message").css("display", "none");
        var name = $("#name").val().trim();
        var login = $("#login").val().trim();
        var firstPassword = $("#password").val().trim();
        var secondPassword = $("#password_repeat").val().trim();
        var age = $("#age").val();
        var isValidForm = validateForm(name, login, firstPassword, secondPassword);
        if(isValidForm){
            register(name, login, firstPassword ,age, hotelId);
        }
    });
});

function register(name, login, password, age, hotelId) {
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080/addEmployee',
        type: "POST",
        data: {name: name, login: login, password: password, age: age, hotelId: hotelId},
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            if(received.isRegistered){
                location.assign("employees.html?hotelId=" + hotelId);
            }
            if(!received.isRegistered){
                var error = received.errors;
                if(error === "userExist"){
                    $("#login_exist_error").css("display", "block");
                }
            }
        }
    });
}

