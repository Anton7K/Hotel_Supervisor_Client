/**
 * Created by Anton on 22.05.2017.
 */
$(document).ready(function () {
    var hotelId = getParamFromUrl("hotelId");
    $("#roomsBreadcrumb").attr("href", "rooms.html?hotelId=" + hotelId);
    $("#createRoomButton").click(function (event) {
        event.preventDefault();
        var roomName = $("#roomName").val();
        //var hotelId = getParamFromUrl("hotelId");
        if(isRoomNameValid(roomName)){
            createRoom(roomName, hotelId);
        }
        else{
            $("#name_error").css("display", "block");
        }
    });
});

function createRoom(name, hotelId){
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080/addRoom',
        type: "POST",
        data: {"roomName": name, "hotelId": hotelId},
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            if (received) {
                location.assign("rooms.html?hotelId=" + hotelId);
            }
        }
    });
}

function isRoomNameValid(hotelName){
    var isValidName=false;
    if(hotelName.trim()!="" && hotelName.trim()!=null){
        isValidName=true;
    }
    return isValidName;
}
