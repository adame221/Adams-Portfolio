<?php
/*
    The purpose of this file is to get a value from the the app.js class.
    We then will decide which api we should make based on the length of the string.
    If we get results from the api then we'll sort the array by population.
    Finally we'll return the results back to the app.js class.
    @author: Adam Ely
    @date: 02/29/2020
*/

//Creating global variables.
$countryInput = $_GET['userInput'];
$apiString;
$response;
$finalResult;


//This function accepts a variable that will be the response from the api.  We'll sort the json array based on population, then return the response.
function sortArr($sortResponse) {
    $result = json_decode($sortResponse, true);
    $population = array_column($result, 'population');
    $sorted = array_multisort($population, SORT_DESC, $result);
    return json_encode($result);
}

//This function make a call to the api to return the results
function getContents($pString) {
    return file_get_contents($pString);
}

//If the user country input is less than or equal than 3, then we'll assume that it's a country code.  Creatin the string to pass a code.
if (strlen($countryInput) < 4) {
    $apiString = "https://restcountries.eu/rest/v2/alpha/" . $countryInput . "?fields=name;alpha2Code;alpha3Code;population;flag;region;subregion;languages";

    //Adding the start and end brackets since the alpha api call does not include them.
    $response = "[" . getContents($apiString) . "]";
} else {
    //If the string size is greater than 3, then then lets try creating a string to pass a full country name.
    $apiString = "https://restcountries.eu/rest/v2/name/" . $countryInput . "?fullText=true?fields=name;alpha2Code;alpha3Code;population;flag;region;subregion;languages";

    $response = getContents($apiString);
}

//If the response is still null, we'll search by country, then we'll search by name.
if (empty($response)) {
    $apiString = "https://restcountries.eu/rest/v2/name/" . $countryInput . "?fields=name;alpha2Code;alpha3Code;population;flag;region;subregion;languages";
    $response = getContents($apiString);
    //If we found results, then send we'll sort the response
    if (!empty($response)) {
        $finalResult = json_encode(sortArr($response));
    }
} else {
    //If we made it here, then we found a match and we'll sort the response
    $finalResult = json_encode(sortArr($response));
}

//Assigning the sorted response to the final result
$finalResult = json_encode(sortArr($response));

//Send the result back to the JavaScript file.
echo $finalResult;
?> 
