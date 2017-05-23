/**
 * Created by Anton on 23.05.2017.
 */
$(document).ready(function () {
    var hotelId = getParamFromUrl("hotelId");
    var roomId = getParamFromUrl("roomId");
    $("#roomsBreadcrumb").attr("href", "rooms.html?hotelId=" + hotelId);
    $("#equipmentBreadcrumb").attr("href", "equipment.html?hotelId=" + hotelId + "$roomId=" + roomId);
    $("#addNewEquipmentButton").click(function(event){
        event.preventDefault();
        var type = $("#equipmentTypeField").val();
        var maxValue = $("#maxValueField").val();
        addEquipment(type,roomId, maxValue, hotelId);
    });
});

function addEquipment(type, roomId, maxValue, hotelId){
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080/addEquipment',
        type: "POST",
        data: {"type": type, "roomId": roomId, "maxValue": maxValue},
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            if(received){
                location.assign("equipment.html?roomId=" + roomId + "&hotelId=" + hotelId);
            }
        }
    });
}