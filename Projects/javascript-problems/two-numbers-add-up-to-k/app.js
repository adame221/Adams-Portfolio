$(document).ready(function () {

    $("#submitButton").click(function () {


        var numbArray = $("#numArray").val();
        var kVal = parseInt($("#kVar").val());

        var formatArray = numbArray.split(",");

        formatArray.sort();
        
        for (var i = 0, j = formatArray.length - 1; i < j;) {
            var sum = parseInt(formatArray[i]) + parseInt(formatArray[j]);

            if (sum < kVal) {
                i++;
            }
                
            else if (sum > kVal) {
                j--;
            }
            else {
                alert(formatArray[i] + ' and ' + formatArray[j] + ' are a sum of ' + kVal);
                return true;
            }
        }

        alert('Nothing in the number array are a sum of ' + kVal);
        return false;
    });
});