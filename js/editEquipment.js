/**
 * Created by Anton on 23.05.2017.
 */
$(document).ready(function () {
    var hotelId = getParamFromUrl("hotelId");
    var roomId = getParamFromUrl("roomId");
    var equipmentId = getParamFromUrl("equipmentId");
    printPreviousEquipmentValues(equipmentId);
    $("#roomsBreadcrumb").attr("href", "rooms.html?hotelId=" + hotelId);
    $("#equipmentBreadcrumb").attr("href", "equipment.html?hotelId=" + hotelId + "&roomId=" + roomId);
    $("#saveEquipmentChangesButton").click(function(event){
        event.preventDefault();
        var type = $("#equipmentTypeField").val();
        var maxValue = $("#maxValueField").val();
        editEquipment(equipmentId, type, roomId, maxValue, hotelId);
    });
});

function editEquipment(equipmentId, type, roomId, maxValue, hotelId){
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080/editEquipment',
        type: "POST",
        data: {"equipmentId": equipmentId, "type": type, "maxValue": maxValue},
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

function printPreviousEquipmentValues(equipmentId){
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080/getEquipmentById',
        type: "GET",
        data: {"equipmentId": equipmentId},
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            $("#equipmentTypeField").val(received.type);
            $("#maxValueField").val(received.maxValue);
        }
    });
}