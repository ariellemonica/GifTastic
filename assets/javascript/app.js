//Here we begin the array of default button options
$(document).ready(function () {
    var topics = ["ecstatic", "frustrated", "tired", "snuggly", "indignant", "LOL", "embarassed", "ennui"];

    var queryUrl = "https://api.giphy.com/v1/gifs/search?q="
    var apiKey = "&api_key=SZQ5icer57LMT0D3ANkORbr1aHaJSO5l"

    function createButton() {
        $("#emoButtons").empty();

        //write a for loop that loops through the topics array and creates buttons
        for (let i = 0; i < topics.length; i++) {
            $("#emoButtons").append(`<button class="gifBtn" data-attr="${topics[i]}">${topics[i]}</button>`);
        }
    }
    createButton();



    //input field to add text to the array - click handler
    $("#searchBtn").on("click", function () {
        var userInput = $("#search").val();
        topics.push(userInput);
        createButton();
    })

    //event bubbling :)
    $("#emoButtons").on("click", ".gifBtn", function (event) {
        event.preventDefault();
        console.log("button clicked!");
        var btnVal = $(this).attr("data-attr");
        console.log(queryUrl + btnVal + apiKey);

        $.ajax({
            url: queryUrl + btnVal + apiKey,
            method: "GET"
        })
            .then(function (response) {
                // console.log(response);
                $("#gifDisplay").empty();
                for (let i = 0; i < response.data.length; i++) {
                    // console.log(response.data[i].images.fixed_height_still.url, response.data[i].images.fixed_height.url);
                    $("#gifDisplay").append(`<img data-still="${response.data[i].images.fixed_height_still.url}" 
                    data-video="${response.data[i].images.fixed_height.url}" 
                    src="${response.data[i].images.fixed_height_still.url}"
                    data-state="still" class="emoGifs">`);
                    var rating = response.data[i].rating;
                    $("#gifDisplay").append(`<p class="rating">Rated: ${rating}</p>`);
                }
            })
    })

    $("#gifDisplay").on("click", ".emoGifs", function(){
        var gifState = $(this).attr("data-state");
        var stillUrl = $(this).attr("data-still");
        var vidUrl = $(this).attr("data-video");

        if (gifState === "still"){
            $(this).attr("src", vidUrl);
            $(this).attr("data-state", "animate")
        } else {
            $(this).attr("src", stillUrl);
            $(this).attr("data-state", "still")
        }

    })

    //response - data - [i] - images - 
    //fixed_height_still.url
    //fixed_height.url


    //api key = SZQ5icer57LMT0D3ANkORbr1aHaJSO5l
    // gify endpoint - https://api.giphy.com/v1/gifs/search











})
