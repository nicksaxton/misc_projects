var colors = ["#271111", "#05202d", "#303e34", "#2d323c", "	#2c212d", "	#00000c", "	#090538", "#2a2490", "	#5a286d", "	#b167c6"];

$(document).ready(function() {
    getResponse();
    $("#new-quote").on("click", function() {
        getResponse();
    });
});

function getResponse() {
    $.ajax({
        url: "http://api.forismatic.com/api/1.0/?jsonp=?",
        jsonp: "callback", 
        dataType: 'jsonp', 
        data: { 
            method: "getQuote", 
            lang: "en", 
            format: "jsonp"
        },
        xhrFields: { withCredentials: true },
        success: function(response) {
            var quoteText = response["quoteText"];
            var quoteAuthor = response["quoteAuthor"];
            
            $("#quote-text").text(quoteText);
            $("#quote-source").text(quoteAuthor);
                
            var tweetLink = "https://twitter.com/intent/tweet?hashtags=quotes&text=%22" + encodeURIComponent(quoteText) + "%22%20" + encodeURIComponent(quoteAuthor);
                
            $("#tweet-link").attr("href", tweetLink);
            
            var colorIndex = Math.floor((Math.random() * colors.length));
            var randColor = colors[colorIndex];
            
            $("body").css("background-color", randColor);
            $("#content-area").css("color", randColor);
        },
        error: function() {
            alert("ERROR");
        }
    });
}