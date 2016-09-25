var inCelsius = true;
var temp = 0;
var tempStr = "";
var currLoc = "";
var conditionId = 0;
var currCondition = "";

var weatherBackgrounds = {
  "rain": "https://kunal24borah.files.wordpress.com/2013/10/rain.jpg",
  "clear": "http://onceuponatimeblog.weebly.com/uploads/5/8/3/1/5831762/474426177_orig.jpg?248",
  "clouds": "http://www.wallpaperscharlie.com/wp-content/uploads/2016/07/Cloudy-Weather-HD-Wallpapers-3.jpg",
  "snow": "http://www.wallpaperscharlie.com/wp-content/uploads/2016/07/Snowy-Weather-HD-Images-5.jpg",
  "mist": "https://kneverkneverland.files.wordpress.com/2012/04/misty-hills.jpg"
};

$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather",
                jsonp: "callback", 
                dataType: 'jsonp', 
                data: { 
                    lat: position.coords.latitude, 
                    lon: position.coords.longitude, 
                    units: "metric",
                    APPID: "f7ab56be8e1004b3b42fc1b1dd65c688" 
                },
                xhrFields: { withCredentials: true },
                success: function(response) {
                    // Get weather info from response 
                    temp = response["main"]["temp"]
                    currLoc = response["name"];
                    conditionId = response["weather"][0]["id"];
                    currCondition = response["weather"][0]["main"];
                                        
                    tempStr = temp.toString() + "\xB0C";

                    $("#current-temp").text(tempStr);
                    $("#location").text(currLoc);
                    $("#condition").text(currCondition);
                    
                    var weatherBg = "";
                    
                    if (conditionId < 600) {
                        weatherBg = weatherBackgrounds["rain"];
                    }
                    else if (conditionId < 700) {
                        weatherBg = weatherBackgrounds["snow"];
                    }
                    else if (conditionId === 800) {
                        weatherBg = weatherBackgrounds["clear"];
                    }
                    else if (conditionId < 900) {
                        weatherBg = weatherBackgrounds["clouds"];
                    }
                    else {
                        weatherBg = weatherBackgrounds["mist"];
                    }
                                        
                    $("body").css("background-image", "url('" + weatherBg + "')")
                },
                error: function() {
                    console.log("ERROR");
                }
            });
        });
    }

    $("#convert").click(function() {
        if (inCelsius) {
            $("#convert").text("To Celsius");
            temp = temp * 1.80 + 32;
            temp = Math.round(temp * 10) / 10;
            tempStr = temp.toString() + "\xB0F";
            $("#current-temp").text(tempStr);
            inCelsius = false;
        }
        else {
            $("#convert").text("To Fahrenheit")
            temp = (temp - 32) / 1.80;
            temp = Math.round(temp * 10) / 10;
            tempStr = temp.toString() + "\xB0C";
            $("#current-temp").text(tempStr);
            inCelsius = true;
        }
    });
});