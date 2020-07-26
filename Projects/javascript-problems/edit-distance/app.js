$(document).ready(function () {

    //Function that runs when the process button is clicked
    $("#submitButton").click(function () {
        //Getting the prefix value
        var string1 = $("#string1").val();
        var string2 = $("#string2").val();

        //Checking to make sure value is not blank
        if (string1.length == 0) {
            alert("You must enter a value for first string");
            return false;
        }

        var letters = /^[A-Za-z]+$/;
        if (!string1.match(letters)) {
            alert('First string can only contain letters');
            return false;
        }

        //Checking to make sure value is not blank
        if (string2.length == 0) {
            alert("You must enter a value for second string");
            return false;
        }

        var letters = /^[A-Za-z]+$/;
        if (!string2.match(letters)) {
            alert('Second string can only contain letters');
            return false;
        }

        //If the format is correct
        alert("Distance is: " + findDistance(string1, string2));
    });

    //Function that determines if string is correctly formatted
    function findDistance(pstring1, pstring2) {

        var difference = 0;

        if(pstring1.length > pstring2.length) {
            difference = pstring1.length - pstring2.length;
        } else if(pstring2.length > pstring1.length) {
            difference = pstring2.length - pstring1.length;
        }

        for(var i = 0; i < pstring1.length; i++) {
            if(pstring1[i] != pstring2[i]) {
                difference += 1
            }
        }
        return difference
    }
});