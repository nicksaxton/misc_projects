$(document).ready(function() {
    $("#search-term").on("keydown", function(event) {
        // If "Enter" key is pressed and the search field is non-blank
        if (event.which === 13 && $("#search-term").val()) {
            // Make request
            $.ajax({
                url: "https://en.wikipedia.org/w/api.php",
                jsonp: "callback", 
                dataType: 'jsonp', 
                data: { 
                action: "query", 
                list: "search", 
                srsearch: $("#search-term").val(), 
                format: "json" 
                },
                xhrFields: { withCredentials: true },
                success: function(response) {
                    // Hide random entry button
                    $("#random_button").addClass("hidden");

                    var html = "";

                    for (var i = 0; i < response["query"]["search"].length; i++) {
                        var articleTitle = response["query"]["search"][i]["title"];
                        html += '<a href="https://en.wikipedia.org/wiki/';
                        // Take article title and replace spaces with underscores for the URL
                        html += articleTitle.split("").map(function(val) {
                            if (val === " ") {
                                return "_";
                            }
                            else {
                                return val;
                            }
                        }).join("");
                        html += '" class="list-group-item" target="_blank"><h4 class="list-group-item-heading">';
                        html += articleTitle;
                        html += '</h4><p class="list-group-item-text">';
                        html += response["query"]["search"][i]["snippet"];
                        html += '</p></a>';
                    }

                    $("#results").html(html);

                    // Unhide results section
                    $("#results").removeClass("hidden");
                },
                error: function() {
                    console.log("ERROR");
                }
            });
        }
    });
});