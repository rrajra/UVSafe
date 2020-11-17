var currentLocation;
var formattedLocale;
var longitude;
var latitude;
var request = new XMLHttpRequest()
var baseAddress = "https://api.openuv.io/api/v1/uv";
var geocodeAddress = "https://api.opencagedata.com/geocode/v1/json?q=";
var JSONdata;
var displayUVText = document.getElementById("UVNum");


document.getElementById("cont1").addEventListener("click", setLocation);
document.getElementById("cont2").addEventListener("click", setLatitude);
document.getElementById("cont3").addEventListener("click", setLongitude);
document.getElementById("getUVButton").addEventListener("click", getUV);

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
    displayUVText.textContent = JSONdata.result.uv;

    // This is between 0 and 2 UV, very low, should be the color green
    // color : #558B2F
    if(uvStat >= 0 && uvStat <= 2) 
    {
        displayUVText.style.color = "#558B2F";
        console.log(uvStat);
    }
    // This is between 3 and 6 UV, moderate, color orange
    // color: #F9A825
    if(uvStat >= 3 && uvStat <= 6)
    {
        displayUVText.style.color = "#F9A825";
        console.log(uvStat);
    }
    // This is betweeen 6 and 8 UV, high, color darkorange
    // color: #EF6C00
    if(uvStat >= 6 && uvStat <= 8)
    {
        displayUVText.style.color = "#EF6C00";
        console.log(uvStat);
    }   
    // This is between 8-11 UV, Very High, color red
    // color: #B71C1C
    if(uvStat >= 8 && uvStat <= 11) 
    {
        displayUVText.style.color = "#B71C1C";
        console.log(uvStat);
    }
    // This is 11+ UV, Extreme, color purple
    // color: #6A1B9A
    if(uvStat >= 11) 
    {
        displayUVText.style.color = "#6A1B9A";
        console.log(uvStat);
    }
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
        }
    }
    request.send()
}