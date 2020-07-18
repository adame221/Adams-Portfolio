$(document).ready(function () {

    //Function that runs when the process button is clicked
    $("#submitButton").click(function () {
        //Getting the prefix value
        var prefix = $("#prefix").val();

        //Checking the string is not empty
        if(prefix.length == 0) {
            alert("You must enter a value");
            return false;
        }

        //Checking if the string starts with 0
        if(prefix.startsWith('0')) {
            alert('String cannot start with 0');
            return false;
        }

        var prefixArray = [];

        //Looping through string
        //Creating array
        for (var i = 0; i < prefix.length; i++) { 
            prefixArray.push(prefix[i]);
        }

        //Checking to see if each element in the array has a number
        let result = prefixArray.every(function (e) {
            return parseInt(e) >= 0;
        });

        //Verifying that the array is a numeric array
        if(!result) {
            alert('Array must be numeric and greater than 0');
            return false;
        } else {
            alert('Number of options: ' + findOptions(prefix));
        }
    });

    //Functions the number of encoding options
    function findOptions(expr) { 

        //Declaring the final array
        var finalArray = [];

		// Traversing the Expression 
		for (var i = 0; i < expr.length; i++) { 

            //If the final array does not include the current index value
            //Push it to the final array
            if(!finalArray.includes(expr[i])) {
                finalArray.push(expr[i]);
            }

            //Reversing the array
            for (var j = expr.length - 1; j > 0; j--) { 

                //Creating a combo
                var currentValue = expr[i] + expr[j];

                //Counting the number of times the current value exists in the final array
                var numOfTrue = finalArray.filter(function(x){ return x === currentValue; }).length;

                //If the number of times is less than 2 and the current value is less than 26
                //Push to final array
                if(numOfTrue < 2 && parseInt(currentValue) <= 26) {
                    finalArray.push(currentValue);
                }
            }
        }

        //Return the length
        return finalArray.length;
	} 
});