let longResult = document.getElementById("lng");
let latResult = document.getElementById("lat");


// gives Web content access to the location of the device
function getlocation() {
    navigator.geolocation.getCurrentPosition(handleCurrentLocation);
}

function handleCurrentLocation(location) {
    let lat = location.coords.latitude;
    let lng = location.coords.longitude;
    console.log(lat);
    longResult.textContent = "My longitude is: " + lng;
    latResult.textContent = "My latitude is: " + lat;
    console.log(location)

    timeZone(lat, lng);
}

async function timeZone(lat, lng) {
    let url = "http://api.timezonedb.com/v2.1/get-time-zone?key=$[YOUNEEDKEY]&format=json&by=position&lat=" + lat + "&lng=" + lng;

    let res = await fetch(url);
    let reply = await res.json();
    console.log(reply);

    document.getElementById("timeZone").textContent = "My time zone: " + reply.zoneName;
    document.getElementById("localTime").textContent = "The local time for my time zone: " + reply.formatted;
}

// creating dropbox for selection from moment.js 
let countryList = document.getElementById("countryList");
let allTimeZone = moment.tz.names();
console.log(allTimeZone);
for (let country of allTimeZone) {
    let option = document.createElement("option");
    option.textContent = country;
    //console.log(country);
    countryList.appendChild(option);
}

async function friendTimeZoneResult(){
    let friendTimeZoneElement = document.getElementById("countryList");
    let friendTimeZoneResult = friendTimeZoneElement.value;
    console.log(friendTimeZoneResult);
    let url = "http://api.timezonedb.com/v2.1/get-time-zone?key=$[YOUNEEDKEY]&format=json&by=zone&zone=" + friendTimeZoneResult;

    let res = await fetch(url);
    let reply = await res.json();
    console.log(reply);

    document.getElementById("friendTime").textContent = "The time for your friend: " + reply.formatted;
}
