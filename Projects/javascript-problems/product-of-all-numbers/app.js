$(document).ready(function () {

    $("#submitButton").click(function () {

        //Getting input from html
        var numbArray = $("#numArray").val();

        //Splitting the array on each comman
        var formatArray = numbArray.split(",");

        //Checking to see if each element in the array has a number
        let result = formatArray.every(function (e) {
            return e > 0;
        });

        //Verifying that the length is correct
        if(formatArray.length <= 2) {
            alert('Length of array must be at least 3.');

        //Verifying that the array is a numeric array
        } else if(!result) {
            alert('Array must be numeric and greater than 0');
        } else {

            var finishedArray = [];
            var copyArray = [];
            var returnVal = 1;

            //Looping through each element in the array
            for (var i = 0; i < formatArray.length; i++) {

                //Making a copy of the array
                copyArray = numbArray.split(",");
                
                //Removing the current index from the array
                copyArray.splice(i, 1);

                //Looping through the copy array
                for (var j = 0; j < copyArray.length; j++) {

                    //Calculating current index in the array
                    returnVal = returnVal * parseInt(copyArray[j]);
                }

                //Pushing the result to a completed array
                finishedArray.push(returnVal);

                //Resetting the return value
                returnVal = 1;
            }
    
            alert('Result: ' + finishedArray);
            
        }
        return false;
    });
});