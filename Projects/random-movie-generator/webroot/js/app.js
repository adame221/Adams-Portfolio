/* This file gets the user inputed value from the index.html page.
    If the input is valid then we'll send the data to index.php to search for the movie.
    If the user click on the random movie button then we'll search on a random movie.
    Results will be displayed on the html page.

    @author: Adam Ely
    @date: 02/29/2020
*/
$(document).ready(function () {

    var movieObj;
    //var ratings;

    $(".loader").show();

    //This function fires when the user clicks the submit button
    $("#submitButton").click(function () {
        //Creating a random number to get a random move
        var randomNumber = Math.floor(1000000 + Math.random() * 1000000);
        var randomString = 'tt' + randomNumber;

        $(".loader").show();

        fetch("http://www.omdbapi.com/?i=" + randomString + "&apikey=c1f2e45e")
            .then(
                function (response) {
                    if (response.status !== 200) {
                        alert("An error has occured.  Please try again!");
                        return;
                    }
                    // Examine the text in the response
                    response.json().then(function (data) {
                        $("#content").show();
                        $(".loader").hide();
                        var parseData = "[" + JSON.stringify(data) + "]";
                        data = JSON.parse(parseData);
                        outputTable(data);
                    });
                }
            )

            .catch(function (err) {
                $(".loader").hide();
                alert(err);
            });
        //Calling the index.php file to get the random movie
        /*$.ajax({
            type: "GET",
            url: "./api/index.php",
            data: ({ movieInput: randomString }),
            dataType: "json",

            //If we made it here that means we have something that returned from the php file
            //Pass the data to the outputTable function
            success: function (data) {
                $("#content").show();
                $(".loader").hide();
                outputTable(data);
            },

            //If we made it here, that means there was an error in the return json
            error: function (jqXHR, textStatus, errorThrown) {
                $(".loader").hide();
                alert(errorThrown);
            }
        });*/
        return false;
    });

    //This function fires when the user clicks the search button
    $("#searchButton").click(function () {

        //Getting the user input.  This will be a movie title
        var textValue = $("#userInput").val();

        //Encoding input
        var sParameter = encodeURIComponent(textValue.trim());

        $("loader").show();

        //If input is blank, alert user
        if (sParameter == '') {
            alert('Please enter a value');
        } else {

            fetch("http://www.omdbapi.com/?t=" + sParameter + "&apikey=c1f2e45e")
            .then(
                function (response) {
                    if (response.status !== 200) {
                        alert("An error has occured.  Please try again!");
                        return;
                    }
                    // Examine the text in the response
                    response.json().then(function (data) {
                        $("#content").show();
                        $(".loader").hide();
                        var parseData = "[" + JSON.stringify(data) + "]";
                        data = JSON.parse(parseData);
                        outputTable(data);
                    });
                }
            )

            .catch(function (err) {
                $(".loader").hide();
                alert(errorThrown);
            });
            //Calling the index.php file to get the movie
           /* $.ajax({
                type: "GET",
                url: "./api/index.php",
                data: ({ movieTitle: sParameter }),
                dataType: "json",

                //If we made it here that means we have something that returned from the php file
                //Pass the data to the outputTable function
                success: function (data) {
                    $("#content").show();
                    $(".loader").hide();
                    //alert(data);
                    outputTable(data);
                },

                //If we made it here, that means there was an error in the return json
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                    $(".loader").hide();
                }
            });*/
        }

        return false;
    });

    //This function runs when we click on the imbd logo
    //Open the imbd site
    $("#imbdLogo").click(function () {
        window.open("https://www.imdb.com/title/" + movieObj[0].imdbID, "_blank");
    });

    //This function runs when the user clicks on the metacritic logo
    //Open the metacritic site
    $("#metaCriticLogo").click(function () {
        var str = movieObj[0].Title;
        str = str.replace(/\s+/g, '-').toLowerCase();
        str = str.replace(/'/g, '');
        window.open("https://www.metacritic.com/" + movieObj[0].Type + "/" + str, "_blank");
    });

    //This function runs when the user clicks on the rotton tomatoes logo
    //Open the rotten tomatoe site
    $("#rottonLogo").click(function () {
        var str = movieObj[0].Title;
        str = str.replace(/\s+/g, '_').toLowerCase();
        str = str.replace(/'/g, '');
        window.open("https://www.rottentomatoes.com/m/" + str + "_" + movieObj[0].Year, "_blank");
    });

    //This function is called when user hovers over imbd logo
    //Show imbd logo
    //Gray out other logos
    $("#imbdLogo").hover(function () {
        findImages("Internet Movie Database");
        $("#movieInfo").show();
        $("#metaCriticLogo").css("filter", "grayscale(100%)");
        $("#rottonLogo").css("filter", "grayscale(100%)");

        //This function is called when the user navigates away from the imbd logo
    }, function () {
        $("#movieInfo").hide();
        $("#metaCriticLogo").css("filter", "grayscale(0%)");
        $("#rottonLogo").css("filter", "grayscale(0%)");
    });

    //This function is called when user hovers over metacritic logo
    //Show movie info
    //Gray out other logos
    $("#metaCriticLogo").hover(function () {

        findImages("Metacritic");
        $("#movieInfo").show();
        $("#imbdLogo").css("filter", "grayscale(100%)");
        $("#rottonLogo").css("filter", "grayscale(100%)");

        //This function is called when the user navigates away from the metacritic logo
        //Hide movie info
        //Remove the gray scale from other logos
    }, function () {
        $("#movieInfo").hide();
        $("#imbdLogo").css("filter", "grayscale(0%)");
        $("#rottonLogo").css("filter", "grayscale(0%)");
    });

    //This function is called when user hovers over rotten tomatoes logo
    //Show movie info
    //Hide other logos
    $("#rottonLogo").hover(function () {

        findImages("Rotten Tomatoes");
        $("#movieInfo").show();
        $("#imbdLogo").css("filter", "grayscale(100%)");
        $("#metaCriticLogo").css("filter", "grayscale(100%)");

        //This function is called when the user navigates away from the rotten tomatoes logo
        //Hide movie info
        //Remove the gray scale from other logos
    }, function () {
        $("#movieInfo").hide();
        $("#imbdLogo").css("filter", "grayscale(0%)");
        $("#metaCriticLogo").css("filter", "grayscale(0%)");
    });

    /* This function receives the table data. If there's a movie found then we'll add it to the html.
        If there's no data, then we'll alert the user and hide the content table
    */
    function outputTable(tableData) {

        //Creating and intializing variables for this function
        movieObj = tableData;

        //Movie title is null, alert user, and hide content section
        if (movieObj[0].Title == null) {
            alert("No movies returned. Please try again.")
            $("#content").hide();
        } else {
            var tableContent;

            //vratings = ;

            //If we made it here that means we returned a movie title
            //Add the data to the html
            if (movieObj[0].Poster == 'N/A') {
                $("#posterContent").html("<h3>Poster Not Available</h3>");
                $("#movieSites").hide();
            } else {
                $("#movieSites").show();
                $("#posterContent").html("<img style=\"text-align: center;\" src=\"" + movieObj[0].Poster + "\"" + ">");
            }

            //Creating content to place in the deatils table
            tableContent = "<tr><th>Title</th><td>" + movieObj[0].Title + "</td></tr>"
                + "<tr><th>Year</th><td>" + movieObj[0].Year + "</td></tr>"
                + "<tr><th>Rated</th><td>" + movieObj[0].Rated + "</td></tr>"
                + "<tr><th>Released</th><td>" + movieObj[0].Released + "</td></tr>"
                + "<tr><th>Runtime</th><td>" + movieObj[0].Runtime + "</td></tr>"
                + "<tr><th>Genre</th><td>" + movieObj[0].Genre + "</td></tr>"
                + "<tr><th>Director</th><td>" + movieObj[0].Director + "</td></tr>"
                + "<tr><th>Writer</th><td>" + movieObj[0].Writer + "</td></tr>"
                + "<tr><th>Actors</th><td>" + movieObj[0].Actors + "</td></tr>"
                + "<tr><th>Plot</th><td>" + movieObj[0].Plot + "</td></tr>"
                + "<tr><th>Awards</th><td>" + movieObj[0].Awards + "</td></tr>"
                + "<tr><th>Type</th><td>" + movieObj[0].Type + "</td></tr>"
                + "<tr><th>Box Office</th><td>" + movieObj[0].BoxOffice + "</td></tr>"
                + "<tr><th>Production</th><td>" + movieObj[0].Production + "</td></tr>";

            //Adding the content to the details table
            $("#detailsTable").html(tableContent);

            filterImages();
        }
    }

    //This function determines which logos to show and hide on initial page load
    function filterImages() {

        //Lets hide the logos right away
        $("#imbdLogo").hide();
        $("#metaCriticLogo").hide();
        $("#rottonLogo").hide();

        //Getting all ratings for the current movie
        var ratings = movieObj[0].Ratings;

        //Looping through the ratings
        //If we find a source, then show that logo
        for (var i = 0; i < ratings.length; i++) {

            if (ratings[i].Source == "Internet Movie Database") {
                $("#imbdLogo").show();
            } else if (ratings[i].Source == "Rotten Tomatoes") {
                $("#metaCriticLogo").show();
            } else if (ratings[i].Source == "Metacritic") {
                $("#rottonLogo").show();
            }
        }
    }

    //This function gets the movie ratings
    //After we determine which movie source is passed in, then we'll find the proper content for that movie
    function findImages(sourceValue) {

        //Creating the html output
        var htmlOutput = "<h6 style=\"text-align: center;\">";

        //Getting the ratings for the current movie
        var ratings = movieObj[0].Ratings;

        //Looping through the ratings, to find the related source content
        for (var i = 0; i < ratings.length; i++) {

            if (ratings[i].Source == sourceValue && sourceValue == "Rotten Tomatoes") {
                htmlOutput += ratings[i].Source + "</h6><p style=\"text-align: center;\"><img style=\"width: 30px; height: 30px;\" src=\"" + findRatingImage(ratings[i].Source, ratings[i].Value) + "\" />" + ratings[i].Value + "</p>";
            } else if (ratings[i].Source == sourceValue && sourceValue == "Internet Movie Database") {
                htmlOutput += ratings[i].Source + "</h6><p style=\"text-align: center;\">" + findRatingImage(ratings[i].Source, ratings[i].Value) + '' + ratings[i].Value + "</p>";
            } else if (ratings[i].Source == sourceValue && sourceValue == "Metacritic") {
                htmlOutput += ratings[i].Source + "</h6><p style=\"text-align: center; color: " + findRatingImage(ratings[i].Source, ratings[i].Value) + "\">" + ratings[i].Value + "</p>";
            }
        }

        //Add the html content to the movie info div
        $("#movieInfo").html(htmlOutput);
    }

    function findRatingImage(ratingImageSource, ratingImageValue) {

        //If source is imbd
        if (ratingImageSource == "Internet Movie Database") {

            //Splitting the text on the .
            var ratingArray = ratingImageValue.split(".");
            var spanOutput = '';

            //Finding the difference betwen the score and 10
            var ratingDifference = 10 - parseInt(ratingArray[0]);

            //Looping until we hit the scorce
            //Creating a highlighted star
            for (var i = 0; i < parseInt(ratingArray[0]); i++) {
                spanOutput += "<span class=\"fa fa-star checked\"></span>";
            }

            //Looping until we hit the difference
            //Creating a grey out star
            for (var i = 0; i < ratingDifference; i++) {
                spanOutput += "<span class=\"fa fa-star\"></span>";
            }

            //Return the output
            return spanOutput;

            //Source is Rotten Tomatoes
        } else if (ratingImageSource == "Rotten Tomatoes") {

            //Removing the percent sign from the value
            var imagePath;
            var rValue = ratingImageValue.replace("%", "");

            //If the value is less than 60, then display the rotten tomato image
            if (parseInt(rValue) < 60) {
                imagePath = "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg";

                //Otherwise display the fresh tomatoe
            } else {
                imagePath = "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg";
            }

            //Return the image path
            return imagePath;

            //Source is metacritic
        } else if (ratingImageSource == "Metacritic") {

            //Split on the forward slash
            var mValue = ratingImageValue.split("/");
            var color;

            //Making the first position an int
            var mValueInt = parseInt(mValue[0]);

            //If the value is less than 40
            //Make color red
            if (mValueInt < 40) {
                color = "red";

                //If the value is between 40 and 69
                //Make color yellow
            } else if (mValueInt >= 40 && mValueInt < 70) {
                color = "yellow";

                //If the value is greater than 70
                //Make color green
            } else if (mValueInt > 70) {
                color = "green";
            }

            //Return the color
            return color;
        }
    }
});

//This method runs when the page is loaded.
$(document).ready(function () {

    //Hiding the content section
    $("#content").hide();
    $("#movieInfo").hide();
    $(".loader").hide();
});

