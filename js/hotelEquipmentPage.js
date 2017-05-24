/**
 * Created by Anton on 24.05.2017.
 */
$(document).ready(function () {
    var hotelId = getParamFromUrl("hotelId");
    getEquipment();
});
function getEquipment(){
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080/getHotelEquipment',
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            if(received.length>0){
                received.forEach(printEquipment);
            }
            else{
                $(".equipment").html("<p>В этой гостинице нет оборудования!</p>");
            }
        }
    });
}


function printEquipment(element, index, array){
    var equipmentId = element.id;
    var type = element.type;
    var roomName = element.roomName;
    var maxValue = element.maxValue;
    var currentValue = element.currentValue ;
    var percentageValue = getCurrentValuePercentages(currentValue, maxValue);

    var equipmentHeader = "Комната:<b>"+roomName+"</b> Id: <b>" + equipmentId + "</b> ("+type+")";
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

function deleteEquipment(equipmentId){
    $.ajax({
        url: 'http://' + getCookie("configServerIp") + ':8080/deleteEquipment',
        type: "POST",
        data: {"id": equipmentId},
        xhrFields: {
            withCredentials: true
        },
        success: function (received) {
            if(received){
                location.reload();
            }
        }
    });
}
