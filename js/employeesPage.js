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
                received.forEach(printRooms);
            }
            else{
                $(".employees").html("<p>В этой гостинице нет сотрудников!</p>");
            }
        }
    });
}
function printRooms(element, index, array){
    var name = element.name;
    var age = element.age;
    var viewString = name + "("+age+" лет)";
    var html = "<li class='clearfix list-group-item' data-id='"+ element.id +"'>"+
        "<span>" + viewString + "</span>" +
        "<ul>" +
        "<li>" +
        "<button class='btn btn-danger'>Удалить</button>" +
        "</li>" +
        "<li>" +
        "<button class='btn btn-info edit_button'>Редактировать</button>" +
        "</li>" +
        "<li>" +
        "</li>" +
        "</ul>" +
        "</li>";

    $(".employees").append(html);
}
