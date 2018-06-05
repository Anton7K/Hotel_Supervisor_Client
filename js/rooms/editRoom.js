/**
 * Created by Anton on 05.06.2018.
 */
$(document).ready(function () {
    var currentHotelId = getParamFromUrl("hotelId");
    var roomId = getParamFromUrl("roomId");
    getHotelsOptions();
    printPreviousRoomValues(roomId);
    $("#roomsBreadcrumb").attr("href", "rooms.html?hotelId=" + currentHotelId);
    $("#saveRoomChangesButton").click(function(event){
        event.preventDefault();
        var newHotelId = $("#hotelField option:selected").attr("data-hotel-id");
        var roomName = $("#roomName").val();
        editRoom(roomId, roomName, newHotelId, currentHotelId);
    });
});

function editRoom(roomId, roomName, newHotelId, previousHotelId){
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080/editRoom',
        type: "POST",
        data: {"roomId": roomId, "roomName": roomName, "hotelId": newHotelId},
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            if(received){
                location.assign("rooms.html?hotelId=" + previousHotelId);
            }
        }
    });
}

function printPreviousRoomValues(roomId){
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080/getRoomById',
        type: "GET",
        data: {"roomId": roomId},
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            $("#hotelField").find("[data-hotel-id='" + received.hotelId + "']").attr('selected','selected');
            $("#roomName").val(received.name);
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