/* This file gets the user inputed value from the index.html page.
    If the input is valid then we'll send the data to index.php to search for related countries.
    If countries are returned, we'll display the results in on the html page.

    @author: Adam Ely
    @date: 02/29/2020
*/
$(document).ready(function () {

    //This function fires when the user clicks the submit button
    $("#submitButton").click(function () {
        
        //Getting the user input
        var textValue = $("#userInput").val();

        //If the user input is null, alert the user to enter a value.
        if (textValue == '') {
            alert("Please enter a value");
            $("#content").css("display", "none");
            $(".navLinks").css("display", "none");
        } else {
            $(".loader").css("display", "block");
            $.ajax({
                type: "GET",
                url: 'http://localhost:8888/fullstack-template-master/webroot/api/index.php',
                data: ({ userInput: textValue }),
                dataType: "json",

                /*Run this function if data was returned from the index.php file
                    Display the content dislay the content div and pass the data to the outputTable function.
                */
                success: function (data) {
                    $("#content").css("display", "block");
                    outputTable(data);
                },

                /*Run this function if no data was returned from the index.php file.
                    Hide the content dive, and alert the user that information was not found.
                */
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#content").css("display", "none");
                    $(".loader").css("display", "none");
                    $(".navLinks").css("display", "none");
                    $('#userInput').val('');
                    alert("We could not find what you were looking for.  Please try again.");
                }
            });
        }
        return false;
    });

    /* This function receives the table data. We'll loop through each country and display related data.
        After looping through each item, we'll add the data to the appropiate div.
    */
    function outputTable(tableData) {

        //Creating and intializing variables for this function
        let regions = new Map();
        let subRegions = new Map();
        var countryObj = JSON.parse(tableData);

        var countryRow = '';
        var regionRow = '';
        var subRegionRow = '';
        var count;
        var subCount;
        var regionName;
        var subRegionName;
        var region;
        var subRegion;

        //Looping through each item in the countryObj
        for (i = 0; i < countryObj.length; i++) {

            //Getting the this region and subregion
            region = countryObj[i].region;
            subRegion = countryObj[i].subregion;

            //Adding data to the country row
            countryRow += "<tr><td>" + countryObj[i].name + "</td><td>"
                + countryObj[i].alpha2Code + "</td><td>"
                + countryObj[i].alpha3Code + "</td><td>"
                + "<img style=\"width: 100px;\" src=\"" + countryObj[i].flag + "\"" + "></td><td>"
                + countryObj[i].region + "</td><td>"
                + countryObj[i].subregion + "</td><td>"
                + countryObj[i].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td><td>";

            //Getting count of occurences for this region
            count = regions.get(region);

            //If there's a count for this region, then add 1 to the count, and add the results to the regions map
            if (count != null || count > 0) {
                count += 1;
                regions.set(region, count);
            } else {

                //If we made it here that means this is the regions first occurence.  Add the region and 1 to the regions map
                regions.set(region, 1);
            }

            //Getting count of occurences for this subregion
            subCount = subRegions.get(subRegion);

            //If there's a count for this subregion, then add 1 to the count, and add the results to the subRegions map
            if (subCount != null || subCount > 0) {
                subCount += 1;
                subRegions.set(subRegion, subCount);
            } else {

                //If we made it here that means this is the sub regions first occurence.  Add the subregion and 1 to the subRegions map
                subRegions.set(subRegion, 1);
            }

            //Getting all languages for this country
            var languages = countryObj[i].languages;

            //Looping through the languages for this country, and adding the data to a table column
            for (let lang in languages) {
                countryRow += languages[lang].name + "<br />";
            }

            //Closing out the country country row
            countryRow += "</td></tr>";
        }

        //Looping through the regions map, and adding the data to a table row for each item
        for (let reg of regions) {
            regionName = (reg[0] == '') ? 'Unknown' : reg[0];

            regionRow += "<tr><td>" + regionName + "</td><td>" + reg[1] + "</td></tr>";
        }

        //Looping through the subRegions map, and adding the data to a table row for each item
        for (let sub of subRegions) {
            subRegionName = (sub[0] == '') ? 'Unknown' : sub[0];

            subRegionRow += "<tr><td>" + subRegionName + "</td><td>" + sub[1] + "</td></tr>";
        }

        //Add html to the results sections
        $("#countryTable").html(countryRow);
        $("#countryCount").html(countryObj.length);
        $("#regionResults").html(regionRow);
        $("#subRegionResults").html(subRegionRow);

        //Display navigation links if page is scrollable
        if ($("body").height() > $(window).height()) {
            $(".navLinks").css("display", "block");
        } else {

            //If the page is not scrollable, then remove links
            $(".navLinks").css("display", "none");
        }

        //Lastly remove the loading image
        $(".loader").css("display", "none");
    }
});

//This method runs when the page is loaded.
$(document).ready(function () {

    //Hide the content div. Remove the navigation links and loader image
    $("#content").css("display", "none");
    $(".navLinks").css("display", "none");
    $(".loader").css("display", "none");
});

