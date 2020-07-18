$(document).ready(function () {

    //Function that runs when the process button is clicked
    $("#submitButton").click(function () {

        //Getting the string array that user entered
        var stringArray = $("#stringArray").val();

        //If there is nothing entered in the string array
        if(stringArray.length < 1) {
            alert("Please enter an array.");
            return false;
        }
        
        //The string array does not include a comma
        if(!stringArray.includes(",")) {
            alert("You must add more than one element to the array.");
            return false;
        }

        //Getting the prefix value
        var prefix = $("#prefix").val();

        //If there is nothing entered in the prefix field
        if(prefix.length < 1) {
            alert("Please enter a prefix.");
            return false;
        }

        //Creating a new array element for every comma
        var formatArray = stringArray.split(",");

        //Looping through the format array to remove spaces
        for (var i = 0; i < formatArray.length; i++) {

            formatArray[i] = formatArray[i].trim();
        }

        //Inializing variables
        var finalArray = [];
        var placeHoler = '';

        //Looping through each element in the prefix
        for (var i = 0; i < prefix.length; i++) {

            //Appending the placeholder with the current index value
            placeHoler += prefix[i];

            //If the format array includes the placeholder value
            //Add it to the final array
            //Reset the placeholder
            if(formatArray.includes(placeHoler)) {
                finalArray.push(placeHoler);
                placeHoler = '';
            }
        }

        //If there are elements in the final array
        if(finalArray.length > 1) {
            alert('Words founds within the provided string: ' + finalArray);
            return true;

        //Couldn't find any words in the provided string.
        } else {
            alert('Could not find any words in the provided string');
            return false;
        }
    });
});