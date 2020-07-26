$(document).ready(function () {

    //Function that runs when the process button is clicked
    $("#submitButton").click(function () {
        //Getting the prefix value
        var string1 = $("#string1").val();

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

        //If the format is correct
        alert("Palindrome found: " + findDistance(string1));
    });

    //Function that determines if string is correctly formatted
    function findDistance(pstring1) {

        var placeholder = pstring1;
        var finalString = '';

        for(var i = 0, j= pstring1.length -1; j > 0; i++, j--) {

            placeholder = placeholder.substr(0, i) + pstring1[j] + placeholder.substr(i, pstring1.length);

            finalString = placeholder.substr(0, pstring1.length).split('').reverse().join('');

            if(finalString == pstring1) {
                return placeholder;
            }
        }
        return "Could not find a palindrome."
    }
});