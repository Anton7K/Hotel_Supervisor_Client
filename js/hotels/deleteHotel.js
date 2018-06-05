/**
 * Created by Anton on 05.06.2018.
 */

$(document).ready(function () {
    $(".delete_hotel_button").click(function (event) {
        event.preventDefault();
        var hotelId = $(this).closest(".list-group-item").attr("data-id");
        if(isHotelNameValid(hotelName)){
            createHotel(hotelName);
        }
        else{
            $("#name_error").css("display", "block");
        }
    });
});

function deleteHotel(hotelId){
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080/deleteHotel',
        type: "POST",
        data: {"hotelId": hotelId},
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            if (received===true) {
                window.location = "home.html";
            }
        }
    });
}
