$(document).ready(function () {

    //Function that runs when the process button is clicked
    $("#submitButton").click(function () {
        //Getting the prefix value
        var prefix = $("#prefix").val();

        //Checking to make sure value is not blank
        if(prefix.length == 0) {
            alert("You must enter a value")
        }

        //If the format is correct
        if (areParanthesisBalanced(prefix)) {
            alert("Balanced "); 
            return true;

        //Format is not correct
        } else {
            alert("Not Balanced "); 
            return false;
        }
    });

    //Function that determines if string is correctly formatted
    function areParanthesisBalanced(expr) { 

		// Traversing the Expression 
		for (var i = 0; i < expr.length; i++) { 

            //Seeing if index is the last index
            var notLastIndex = i != (expr.length - 1);

            //If the index is not the last index and doesn't follow correct format
            if(notLastIndex && ((expr[i] == '{' && (expr[i + 1] != '}'))  
                || (expr[i] == '}' 
                    && expr[i + 1] != '{' && expr[i + 1] != ']' && expr[i + 1] != ')'
                )
                || (expr[i] == '[' 
                    && expr[i + 1] != '{' && expr[i + 1] != ']'
                )
                || (expr[i] == '(' 
                    && expr[i + 1] != '{' && expr[i + 1] != '[' && expr[i + 1] != ')'
                )
            ) ) {
                return false;
            }
        }

        //Correct format
        return true;
	} 
});