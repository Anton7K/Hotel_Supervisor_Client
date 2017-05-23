/**
 * Created by Anton on 22.05.2017.
 */
$(document).ready(function () {
    var hotelId = getParamFromUrl("hotelId");
    var roomId = getParamFromUrl("roomId");
    $("#roomsBreadcrumb").attr("href", "rooms.html?hotelId=" + hotelId);
    getEquipment(roomId);
    $("#addEquipmentButton").click(function(event){
        event.preventDefault();
        location.assign("addEquipment.html?roomId=" + roomId + "&hotelId=" + hotelId);
    });
    //$(".equipment").on("click",".view_equipment_button", function () {
    //    var roomId = $(this).closest(".list-group-item").attr("data-id");
    //    location.assign("equipment.html?roomId=" + roomId);
    //});
});
function getEquipment(roomId){
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080/getRoomEquipment',
        type: "GET",
        data: {"roomId": roomId},
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            if(received.length>0){
                received.forEach(printEquipment);
            }
            else{
                $(".equipment").html("<p>В этой комнате нет оборудования!</p>");
            }
        }
    });
}


function printEquipment(element, index, array){
    var equipmentId = element.id;
    var type = element.type;
    var roomId = element.roomId;
    var maxValue = element.maxValue;
    var currentValue = element.currentValue ;
    var percentageValue = getCurrentValuePercentages(currentValue, maxValue);

    var equipmentHeader = "Id: <b>" + equipmentId + "</b> ("+type+")";
    var progressStyleClass;
    if(percentageValue<50){
        if(percentageValue<9){
            progressStyleClass="progress-bar-danger";
        }
        else{
            progressStyleClass="progress-bar-warning";
        }
    }
    else{
        progressStyleClass="progress-bar-success";
    }
    var html = "<li class='clearfix list-group-item' data-id='"+ equipmentId +"'>"+
    "<span>"+ equipmentHeader +"</span>"+
    "<div class='progress'>"+
    "<div class='progress-bar "+progressStyleClass+"' role='progressbar' aria-valuenow='"+ percentageValue +"' aria-valuemin='0' aria-valuemax='100' style='width: "+ percentageValue +"%;'>"+
        percentageValue+"%"+
    "</div>"+
    "</div>"+
    "<ul>"+
    "<li>"+
    "<button class='btn btn-danger'>Удалить</button>"+
    "</li>"+
    "<li>"+
    "<button class='btn btn-info edit_equipment_button' style='display: block'>Редактировать</button>"+
    "</li>"+
    "</ul>"+
    "</li>";

    $(".equipment").append(html);
}

function getCurrentValuePercentages(currentValue, maxValue){
    var division = currentValue / maxValue;
    if (division < 1) {
        return Math.round(division * 100);
    }
    else {
        return 100;
    }
}
