/**
 * Created by Anton on 21.05.2017.
 */
$(document).ready(function () {
    getHotels();
    $(".hotels").on("click",".view_rooms_button", function () {
        var hotelId = $(this).closest(".list-group-item").attr("data-id");
        location.assign("rooms.html?hotelId=" + hotelId);
    });
    $(".hotels").on("click",".view_employees_button", function () {
        var hotelId = $(this).closest(".list-group-item").attr("data-id");
        location.assign("employees.html?hotelId=" + hotelId);
    });
    $("#createHotelButton").click(function (event) {
        event.preventDefault();
        window.location = "createHotel.html";
    });

});
function getHotels(){
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080/getHotels',
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            if(received.length>0){
                received.forEach(printHotels);
            }
            else{
                $(".hotels").html("<p>У вас нет созданных гостиниц!</p>");
            }
        }
    });
}
function printHotels(element, index, array){
    var name = element.name;
    var html = "<li class='clearfix list-group-item' data-id='"+ element.id +"'>"+
        "<span>" + name + "</span>" +
        "<ul>" +
            //"<li><span class='badge'>14</span></li>"+
        "<li>" +
        "<button class='btn btn-danger'>Удалить</button>" +
        "</li>" +
        "<li>" +
        "<button class='btn btn-default view_employees_button'>Работники</button>" +
        "</li>" +
        "<li>" +
        "<button class='btn btn-default view_rooms_button'>Комнаты</button>" +
        "</li>" +
        "</ul>" +
        "</li>";

    $(".hotels").append(html);
}

