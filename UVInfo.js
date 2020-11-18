// This is used to easily convert the ISO 8601 string
// that the openUV api gives
const moment = require('moment')

var currentLocation;
var formattedLocale;
var longitude;
var latitude;
var request = new XMLHttpRequest()
var baseAddress = "https://api.openuv.io/api/v1/uv";
var geocodeAddress = "https://api.opencagedata.com/geocode/v1/json?q=";
var JSONdata;
var displayUVText = document.getElementById("UVNum");
var displayMaxUV = document.getElementById("UVMaxNum");
var UVMaxTime;


document.getElementById("cont1").addEventListener("click", setLocation);
document.getElementById("cont2").addEventListener("click", setLatitude);
document.getElementById("cont3").addEventListener("click", setLongitude);
document.getElementById("closeOut").addEventListener("click", closePopup);
document.getElementById("getUVButton").addEventListener("click", getUV);
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && document.getElementById("locationInput").value != "") {
      setLocation();
    }
});


// This is a WIP System to get lat/long by city / state 
function setLocation() 
{
    currentLocation = document.getElementById("locationInput").value;
    document.getElementById("locationName").textContent = currentLocation;

    // Formats text
    if(currentLocation.indexOf(' ') >= 0){
        console.log("contains spaces");
        formattedLocale = currentLocation.replace(' ', '');
        console.log(currentLocation);
    }
    //If theres no space, sets location to user input
    else 
    {
        formattedLocale = currentLocation;
    }
    

    forwardGeocoding();
    //document.getElementById("locationID").style.display = "block";
}

// Asks user for their latitude
function setLatitude()
{
    latitude = "lat=" + document.getElementById("latInput").value + "&";
    document.getElementById("latID").style.display = "none";
    document.getElementById("longID").style.display = "block";
    document.getElementById("latInfo").textContent = latitude;
}

//Asks user for their longitude
function setLongitude() 
{
    longitude = "lng=" + document.getElementById("longInput").value;
    document.getElementById("getUVButton").style.display = "block";
}

// Enters the program - aka hides all inputs
// and shows all data
function enterGram() 
{
    document.getElementById("latID").style.display = "none";
    document.getElementById("longID").style.display = "none";
    document.getElementById("postLaunch").style.display = "block";
}

// This is run after the UV is retrieved from API (getUV)
// It then displays the information to the user
function displayStats() 
{
    // Removes the input for longitude
    document.getElementById("longID").style.display = "none";
    // Shows div that displays information
    document.getElementById("postLaunch").style.display = "block";
    document.getElementById("locationID").style.display = "none";

    var uvStat = JSONdata.result.uv;
    var maxUVStat = JSONdata.result.uv_max;
    uvStat = Math.round(uvStat);
    maxUVStat = Math.round(maxUVStat);
    displayUVText.textContent = uvStat;
    displayMaxUV.textContent = maxUVStat;
    UVMaxTime = JSONdata.result.uv_max_time;
    UVMaxTime = moment.utc(UVMaxTime).format("hh:mm");
    console.log(UVMaxTime);
    document.getElementById("toolText").textContent = "Highest UV at: " + UVMaxTime;

    //#region Set current UV Color 
    // This is between 0 and 2 UV, very low, should be the color green
    // color : #558B2F
    if(uvStat >= 0 && uvStat <= 2) 
    {
        displayUVText.style.color = "#5DE876";
        document.getElementById("infoBarText").textContent = "Low risk of sun damage right now.";
        console.log(uvStat);
    }
    // This is between 3 and 6 UV, moderate, color orange
    // color: #F9A825
    if(uvStat >= 3 && uvStat <= 6)
    {
        displayUVText.style.color = "#F9A825";
        document.getElementById("infoBarText").textContent = "Moderate risk of sun damage right now.";
        console.log(uvStat);
    }
    // This is betweeen 6 and 8 UV, high, color darkorange
    // color: #EF6C00
    if(uvStat >= 6 && uvStat <= 8)
    {
        displayUVText.style.color = "#EF6C00";
        document.getElementById("infoBarText").textContent = "High risk of sun damage right now. If you plan on going out limit sun exposure and wear sunscreen.";
        console.log(uvStat);
    }   
    // This is between 8-11 UV, Very High, color red
    // color: #B71C1C
    if(uvStat >= 8 && uvStat <= 11) 
    {
        displayUVText.style.color = "#B71C1C";
        document.getElementById("infoBarText").textContent = "Very high risk of sun damage right now. If you plan on going out limit sun exposure and wear sunscreen.";
        console.log(uvStat);
    }
    // This is 11+ UV, Extreme, color purple
    // color: #6A1B9A
    if(uvStat >= 11) 
    {
        displayUVText.style.color = "#6A1B9A";
        document.getElementById("infoBarText").textContent = "Extreme UV. Make sure to wear sunscreen and don't be exposed to the sun for too long.";
        console.log(uvStat);
    }
    //#endregion
    //#region Set Max UV Color
    if(maxUVStat >= 0 && maxUVStat <= 2) 
    {
        displayMaxUV.style.color = "#5DE876";
        console.log(maxUVStat);
    }
    if(maxUVStat >= 3 && maxUVStat <= 6) 
    {
        displayMaxUV.style.color = "#F9A825";
        console.log(maxUVStat);
    }
    if(maxUVStat >= 6 && maxUVStat <= 8) 
    {
        displayMaxUV.style.color = "#EF6C00";
        console.log(maxUVStat);
    }
    if(maxUVStat >= 8 && maxUVStat <= 11) 
    {
        displayMaxUV.style.color = "#B71C1C";
        console.log(maxUVStat);
    }
    if(maxUVStat >= 8 && maxUVStat <= 11) 
    {
        displayMaxUV.style.color = "#F9A825";
        console.log(maxUVStat);
    }
    if(maxUVStat >= 11) 
    {
        displayMaxUV.style.color = "#6A1B9A";
        console.log(maxUVStat);
    }
    //#endregion
    document.getElementById("warningText").style.display = "none"
    console.log(uvStat);
}

// This retrieves JSON from the server
async function getUV() 
{
    var combined = baseAddress + "?" + latitude + longitude;
    console.log(combined)

    request.open('GET', combined, true)
    request.setRequestHeader("x-access-token", "cb9311e2d45c3b9e1e6d7c322f4bbb50")
    request.onload = function () {
        JSONdata = JSON.parse(this.response)
        
        displayStats();

        if (request.status >= 200 && request.status < 400) 
        {
            console.log(JSONdata);
        } 
        else 
        {
          console.log('error');
        }
      }
      request.send()
}

// Finds lat / long coords from a location
async function forwardGeocoding() 
{
    var combined = geocodeAddress + formattedLocale + "&key=99bc3196196348c695061468b29a99e2"

    request.open('GET', combined, true)
    request.onload = function() {
        geocodeData = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) 
        {
            console.log(geocodeData);
            latitude = "lat=" + geocodeData.results[0].geometry.lat + "&"
            longitude = "lng=" + geocodeData.results[0].geometry.lng
            getUV();
        } 
        else 
        {
          console.log('error');
          console.log(combined);
          console.log(formattedLocale);
          document.getElementById("warningText").style.display = "block";
        }
    }
    request.send()
}

function closePopup() 
{
    document.getElementById("infoContainer").style.display = "none";
}

function getLocalTime() 
{
    var utcDate = UVMaxTime.toUTCString();
    var time = utcDate.split(' ')[4];
    getDesiredTime(time);
}
function getDesiredTime(time) {
    hr = parseInt(time.split(':')[0]);
    amOrpm = hr < 12 ? 'AM' : 'PM'; // Set AM/PM
    hr = hr % 12 || '00'; // Adjust hours
    return`${hr}:${time.split(':')[1]} ${amOrpm}`
}
console.log(getDesireTime(time));
