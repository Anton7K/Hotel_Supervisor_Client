/**
 * Created by Anton on 05.06.2018.
 */
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
function validateFormWithoutPassword(name, login){
    var isValidForm=true;

    if(!isValidName(name)){
        isValidForm=false;
        $("#name_error").css("display", "block");
    }
    if(!isValidLogin(login)){
        isValidForm=false;
        $("#login_validate_error").css("display", "block");
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