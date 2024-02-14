var len;
var results = '';


var params = {
    "q":"",
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
};


function apiSearch() {
    params.q = $("#query").val();
    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "63a1601a6c084331ba10999e705f57ab");
        },
        type: "GET",
    })
        .done(function (data) {
            len = data.webPages.value.length;
            results = '';
            for (i = 0; i < len; i++) {
                results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
            }
            $('#searchResults').html(results);
            $('#searchResults').css('visibility', 'initial');
            $('#searchResults').show(); // Show the search results
            
        })
        .fail(function () {
            alert("error");
        });

    toggleBackground();
}



var currentBackgroundIndex = 1; // Start with the first background image

function toggleBackground() {
    var backgrounds = [
        'url(https://images.unsplash.com/photo-1707501813364-7dbc1c4e97ea?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        'url(https://images.unsplash.com/photo-1678389541315-4f4f2e069ee2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
    ];

    currentBackgroundIndex = (currentBackgroundIndex + 1) % 2; // Cycle through the images

    $('body').css('background-image', backgrounds[currentBackgroundIndex]);
}


function displayTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var formattedTime = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;
    $('#time').css('visibility', 'initial');
    $('#time').html(formattedTime);
    $('#time').dialog();
    toggleBackground();
}


function feelingLucky() {
    params.q = $("#query").val();
    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "63a1601a6c084331ba10999e705f57ab");
        },
        type: "GET",
    })
        .done(function (data) {
            if (data.webPages.value.length > 0) {
                window.open(data.webPages.value[0].url, "_blank");
            } else {
                alert("No search results available.");
            }
        })
        .fail(function () {
            alert("Error");
        });
}


