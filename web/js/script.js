// OLD VERSION !!!
// TODO: NEEDS TO BE REBUILD

var style = [{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#582700"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#919191"},{"lightness":21}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#919191"},{"lightness":21}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":61}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#c5d0d6"},{"saturation":-68}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"},{"gamma":1.22}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"},{"gamma":1.3}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"weight":0.1}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"},{"gamma":1.31}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"off"},{"lightness":0}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"lightness":33},{"gamma":1.08}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"gamma":1.63}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"gamma":4.77}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"gamma":2.57}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#11111f"},{"saturation":-100},{"lightness":0},{"gamma":5.72}]},{"featureType":"transit.line","elementType":"all","stylers":[{"visibility":"off"}]}];
navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
var map,marker,currentPositionMarker;
var circle;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 19,
        // zoom: 17,
        draggable: false,
        scrollwheel: false,
        panControl: false,
        styles: style,
        disableDefaultUI: true
    });
    navigator.vibrate(100);
}

function locError(error) {
    alert(error.message);
}

function getAllPoints(cur_pos)
{
    $.ajax({
        url : 'http://localhost/map_miner/web/app_dev.php/api/getMapData',
        method : 'GET',
        data: { lat: cur_pos.coords.latitude, lng: cur_pos.coords.longitude }
    }).done(function(json){

        console.debug(json);
        $.each(json, function(key, data) {
            var latLng = new google.maps.LatLng(data.lat, data.lng);
            // Creating a marker and putting it on the map
            var m = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: 'https://image.winudf.com/6/017cd8ecad6cf5/icon=30x.png',
            });
        });
    });
}

var rad = function(x) {
    return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
    var R = 6378137;
    var dLat = rad(p2.lat() - p1.lat());
    var dLong = rad(p2.lng() - p1.lng());
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
};

function setCurrentPosition(pos) {
    getAllPoints(pos);
    currentPositionMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
        ),
        icon: 'https://www.campsited.com/assets/person-icon-97a4be91c968c08db09fb11573bca122.png',
        title: "Current Position"
    });
    map.panTo(new google.maps.LatLng(
        pos.coords.latitude,
        pos.coords.longitude
    ));
}

function displayAndWatch(position) {
    setCurrentPosition(position);
    watchCurrentPosition();
}

function watchCurrentPosition() {
    var positionTimer = navigator.geolocation.watchPosition(
        function (position) {
            setMarkerPosition(
                currentPositionMarker,
                position
            );
        },locError,{
            enableHighAccuracy: true,
            maximumAge: Infinity
        });
}

function setMarkerPosition(marker, position) {
    marker.setPosition(
        new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
        ));
    map.panTo(
        new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
        ));
}

function initLocationProcedure() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
    } else {
        alert("Your browser does not support the Geolocation API");
    }
}

$(document).ready(function() {
    initLocationProcedure();
    initMap();
});