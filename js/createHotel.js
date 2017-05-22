/**
 * Created by Anton on 22.05.2017.
 */
$(document).ready(function () {
    $("#createHotelButton").click(function (event) {
        event.preventDefault();
        var hotelName = $("#hotelName").val();
        if(isHotelNameValid(hotelName)){
            createHotel(hotelName);
        }
        else{
            $("#name_error").css("display", "block");
        }
    });
});

function createHotel(name){
    $.ajax({
        url: 'http://localhost:8080/addHotel',
        type: "POST",
        data: {"hotelName": name},
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            if (received) {
                window.location = "home.html";
            }
        }
    });
}

function isHotelNameValid(hotelName){
    var isValidName=false;
    if(hotelName.trim()!="" && hotelName.trim()!=null){
        isValidName=true;
    }
    return isValidName;
}
