/**
 * Created by Anton on 19.05.2017.
 */
$(document).ready(function () {
    $("#registration_button").click(function (event) {
        event.preventDefault();
        $(".error_message").css("display", "none");
        var name = $("#name").val().trim();
        var login = $("#login").val().trim();
        var firstPassword = $("#password").val().trim();
        var secondPassword = $("#password_repeat").val().trim();

        var isValidForm = validateForm(name, login, firstPassword, secondPassword);
        if(isValidForm){
            register(name, login, firstPassword);
        }
    });
    function validateForm(name, login, firstPassword, secondPassword){
        var isValidForm=true;

        if(!isValidName(name)){
            isValidForm=false;
            $("#name_error").css("display", "block");
        }
        if(!isValidLogin(login)){
            isValidForm=false;
            $("#login_validate_error").css("display", "block");
        }
        if(!isValidPassword(firstPassword)){
            isValidForm=false;
            $("#password_error").css("display", "block");
        }
        if(!isPasswordsMatch(firstPassword, secondPassword)){
            isValidForm=false;
            $("#repeat_password_error").css("display", "block");
        }
        return isValidForm;
    }
    function isValidName(name){
        var isValid=true;
        if(name.length<3 || name.length>20){
             isValid=false;
        }
        return isValid;
    }

    function isValidLogin(login) {
        var regexp = /^[a-zA-Z0-9]{3,20}$/;
        return regexp.test(login);
    }

    function isValidPassword(password){
        var regexp = /^[a-zA-Z0-9!@#.]{3,20}$/;
        return regexp.test(password);
    }
    function isPasswordsMatch(firstPassword, secondPassword){
        return firstPassword === secondPassword;
    }

    function register(name, login, password) {
        $.ajax({
            url: 'http://' + getCookie("configServerIp") + ':8080/registration',
            type: "POST",
            data: {name: name, login: login, password: password},
            xhrFields: {
                withCredentials: true
            },
            success: function (received) {
                if(received.isRegistered){
                    window.location = "index.html";
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
});