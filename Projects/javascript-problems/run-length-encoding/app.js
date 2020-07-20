$(document).ready(function () {

    //Function that runs when the process button is clicked
    $("#submitButton").click(function () {
        //Getting the prefix value
        var prefix = $("#prefix").val();

        //Checking to make sure value is not blank
        if(prefix.length == 0) {
            alert("You must enter a value");
            return false;
        }

        var letters = /^[A-Za-z]+$/;
        if(!prefix.match(letters)) {
            alert('Input can only contain letters');
            return false;
        }

        //If the format is correct
        alert(areParanthesisBalanced(prefix));
    });

    //Function that determines if string is correctly formatted
    function areParanthesisBalanced(expr) { 

        var finalString = '';
        var captureString = '';

		// Traversing the Expression 
		for (var i = 0; i < expr.length; i++) { 
            
            if((i == 0 || captureString[captureString.length -1].toUpperCase() == expr[i].toUpperCase())) {
                captureString += expr[i].toUpperCase();

                if(i == (expr.length - 1)) {
                    finalString += captureString.length + captureString[captureString.length -1].toUpperCase();
                }

            } else if( captureString[captureString.length -1].toUpperCase() != expr[i].toUpperCase()) {
                finalString += captureString.length + captureString[captureString.length -1].toUpperCase();
                captureString = '';
                captureString += expr[i].toUpperCase();
            }
        }

        //Correct format
        if(finalString.length > 1) {
            return finalString;
        } else {
            return 'String is incorrectly formatted';
        }
	} 
});