/**
 * Created by Anton on 21.05.2017.
 */
$(document).ready(function () {
    var hotelId = getParamFromUrl("hotelId");
    getRooms(hotelId);
    $(".rooms").on("click",".view_equipment_button", function () {
        var roomId = $(this).closest(".list-group-item").attr("data-id");
        location.assign("equipment.html?roomId=" + roomId + "&hotelId=" + hotelId);
    });
});
function getRooms(hotelId){
    $.ajax({
        url: 'http://localhost:8080/getHotelRooms',
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
                $(".rooms").html("<p>В этой гостинице нет комнат!</p>");
            }
        }
    });
}
function printRooms(element, index, array){
    var name = element.name;
    var html = "<li class='clearfix list-group-item' data-id='"+ element.id +"'>"+
        "<span>" + name + "</span>" +
        "<ul>" +
            //"<li><span class='badge'>14</span></li>"+
        "<li>" +
        "<button class='btn btn-danger'>Удалить</button>" +
        "</li>" +
        "<li>" +
        "<button class='btn btn-info edit_button'>Редактировать</button>" +
        "</li>" +
        "<li>" +
        "<button class='btn btn-default view_equipment_button'>Оборудование</button>" +
        "</li>" +
        "</ul>" +
        "</li>";

    $(".rooms").append(html);
}
function getParamFromUrl(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
        return null;
    }
    else{
        return results[1] || 0;
    }
}