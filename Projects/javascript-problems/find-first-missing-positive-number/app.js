$(document).ready(function () {

    $("#submitButton").click(function () {

        //Getting input from html
        var numbArray = $("#numArray").val();

        //Splitting the array on each comman
        var formatArray = numbArray.split(",");

        //Checking to see if each element in the array has a number
        let result = formatArray.every(function (e) {
            return e >= 0 || e <= 0;
        });

        //Verifying that the length is correct
        if(formatArray.length <= 1) {
            alert('Length of array must be at least 2.');

        //Verifying that the array is a numeric array
        } else if(!result) {
            alert('Array must be numeric and greater than 0');
        } else {

            //Sorting the array
            formatArray.sort();
            
            var placeHolder = 0;
            var currentVal = 0;
            var finalResult = 0;

            for(var i = 0; i < formatArray.length; i++) {

                //Conveting the current value to an int
                currentVal = parseInt(formatArray[i]);

                //Found the first missing positive integer
                if(currentVal > 0 && placeHolder != 0 && placeHolder + 1 != currentVal) {

                    result = placeHolder + 1;

                    alert('The first missing possitive integer is: ' + result);
                    return false;

                //Made it to the end of the array, add 1 to value
                } else if(i == (formatArray.length - 1)) {

                    finalResult = currentVal + 1;

                    alert('The first missing possitive integer is: ' + finalResult);
                }

                //Increment the placeholder value

                if(currentVal >= 0) {
                    placeHolder ++;
                }
            }
            
        }
        return false;
    });
});