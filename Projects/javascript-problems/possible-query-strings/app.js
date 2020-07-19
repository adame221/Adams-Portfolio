$(document).ready(function () {

    //This function runs when the Process button is clicked
    $("#submitButton").click(function () {

        //Getting the value that the user entered in the string array
        var stringArray = $("#stringArray").val();

        //If there is nothing entered in the string array
        if(stringArray.length < 1) {
            alert("Please enter an array.");
            return false;
        }

        //If the string array doesn't include a comma
        if(!stringArray.includes(",")) {
            alert("You must add more than one element to the array.");
            return false;
        }

        if(stringArray.endsWith(",")) {
            alert("You must declare a word after a comma");
            return false;
        }

        //Getting the prefix value that the user entered
        var prefix = $("#prefix").val();

        //If there is nothing entered in the prefix textbox
        if(prefix.length < 1) {
            alert("Please enter a prefix.");
            return false;
        }

        //Creating an element for each comma entered in the string array
        var formatArray = stringArray.split(",");

        var finalArray = [];

        //Looping through each element in the format array
        for (var i = 0; i < formatArray.length; i++) {

            //If the format array starts with the prefix
            //Add the current index to the final array
            if(formatArray[i].toLowerCase().trim().startsWith(prefix.toLowerCase())) {
                finalArray.push(formatArray[i]);
            }
        }

        //If the final array has elements
        if(finalArray.length > 1) {
            alert('Words that start with ' + prefix + ': ' + finalArray);
            return true;

        //We couldn't find any words
        } else {
            alert('Could not find a word that started with ' + prefix);
            return false;
        }
    });
});