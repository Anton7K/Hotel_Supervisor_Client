/**
 * Created by Anton on 05.06.2018.
 */
$(document).ready(function () {
    var current_hotelId = getParamFromUrl("hotelId");
    var employeeId = getParamFromUrl("employeeId");
    $("#employeesBreadcrumb").attr("href", "employees.html?hotelId=" + current_hotelId);
    getHotelsOptions();
    printPreviousEmployeeValues(employeeId);
    $("#updateEmployeeButton").click(function (event) {
        event.preventDefault();
        $(".error_message").css("display", "none");
        var name = $("#name").val().trim();
        var login = $("#login").val().trim();
        var age = $("#age").val();
        var newHotelId = $("#hotelField option:selected").attr("data-hotel-id");
        var isValidForm = validateFormWithoutPassword(name, login);
        if(isValidForm){
            updateEmployee(employeeId, name, login, age, newHotelId, current_hotelId);
        }
    });
});

function updateEmployee(employeeId, name, login, age, hotelId, curHotelId) {
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080/editEmployee',
        type: "POST",
        data: {employeeId: employeeId, name: name, login: login, age: age, hotelId: hotelId},
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            if(received.isUpdated){
                location.assign("employees.html?hotelId=" + curHotelId);
            }
            if(!received.isUpdated){
                var error = received.errors;
                if(error === "userExist"){
                    $("#login_exist_error").css("display", "block");
                }
            }
        }
    });
}



function printPreviousEmployeeValues(employeeId){
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080//getEmployeeById',
        type: "GET",
        data: {"employeeId": employeeId},
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            $("#name").val(received.name);
            $("#login").val(received.login);
            $("#age").val(received.age);
            $("#hotelField").find("[data-hotel-id='" + received.hotelId + "']").attr('selected','selected');
        }
    });
}

function getHotelsOptions(){
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080/getHotels',
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            if(received.length>0){
                received.forEach(addHotelsOption);
            }
        }
    });
}

function addHotelsOption(element, index, array){
    var name = element.name;
    var html = "<option data-hotel-id= '" + element.id + "'>" + element.name +
        "</option>";

    $("#hotelField").append(html);
}
