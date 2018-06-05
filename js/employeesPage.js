/**
 * Created by Anton on 23.05.2017.
 */
$(document).ready(function () {
    var hotelId = getParamFromUrl("hotelId");
    getEmployees(hotelId);
    $("#addEmployeeButton").click(function (event) {
        event.preventDefault();
        location.assign("addEmployee.html?hotelId=" + hotelId);
    });
    $(".employees").on("click",".edit_employee_button", function () {
        var employeeId = $(this).closest(".list-group-item").attr("data-id");
        location.assign("editEmployee.html?hotelId=" + hotelId + "&employeeId=" + employeeId );
    });
    $(".employees").on("click",".delete_employee_button", function () {
        var employeeId = $(this).closest(".list-group-item").attr("data-id");
        $('#employeeDeletingModal').modal('show');
        $('#employeeDeletingModal .ok-button').click(function () {
            deleteEmployee(employeeId, hotelId);
        });
    });
});
function getEmployees(hotelId){
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080/getHotelEmployees',
        type: "GET",
        data: {"id": hotelId},
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            if(received.length>0){
                received.forEach(printEmployee);
            }
            else{
                $(".employees").html("<p>В этой гостинице нет сотрудников!</p>");
            }
        }
    });
}
function printEmployee(element, index, array){
    var name = element.name;
    var age = element.age;
    var viewString = name + "("+age+" лет)";
    var html = "<li class='clearfix list-group-item' data-id='"+ element.id +"'>"+
        "<span>" + viewString + "</span>" +
        "<ul>" +
        "<li>" +
        "<button class='btn btn-danger delete_employee_button'>Удалить</button>" +
        "</li>" +
        "<li>" +
        "<button class='btn btn-info edit_employee_button'>Редактировать</button>" +
        "</li>" +
        "<li>" +
        "</li>" +
        "</ul>" +
        "</li>";

    $(".employees").append(html);
}

function deleteEmployee(employeeId, hotelId){
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080/deleteEmployee',
        type: "POST",
        data: {"employeeId": employeeId},
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            if (received===true) {
                $(".employees").empty();
                getEmployees(hotelId);
            }
        }
    });
}
