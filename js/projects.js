/** 
  * This class is used to interact with the portfolio-item.html page
  * 
  * Author: Adam Ely
  * Date: 01/03/2021
*/
$(document).ready(function () {
    var myObj;

    //Making an ajax request to get project infomation
    $.ajax ({
        type: "GET",
        url: "./json/projects.json",
        dataType: "json",

        //If the request was a success
        success: function (pros) { 
            myObj = pros;
            console.log(pros);

            //Creating variables to hold information that was returned from the ajax request
            let url = new URL(window.location.href);
            let params = new URLSearchParams(url.search);
            let q = params.get('project') // 'mdn query string'
        
            //Getting a list of projects from the request.
            var projects = myObj.project;
            var projectFound = false;
        
            //Looping through each project
            for (var i = 0; i < projects.length; i++) {
        
                //If there was a project id found
                if (q == projects[i].id) {
                    projectFound = true;
                    $("#projectTitle").html(myObj.project[i].name);
                    $("#description1").html(myObj.project[i].description1);
                    $("#subTitle").html(myObj.project[i].subName);
                    $("#intro").append('<img src="' + myObj.project[i].image1 + '" width="100%" height="100%" alt="" class="intro__img">');
                    $("video").append('<source src="' + myObj.project[i].video + '" type="video/mp4">Your browser does not support the video tag.');
                    $("#description2").html(myObj.project[i].description2);
                    $("#lastUpdated").html(myObj.project[i].lastUpdated);
                    
                    //If the project has a github link
                    if(myObj.project[i].gitHub.length > 1) {
                        $("#description2").append('<p>Please click <a href="' + myObj.project[i].gitHub + '" target="_blank">this link</a> to view the source code for this project.</p>');
                    }

                    //If the project has page to display
                    if(myObj.project[i].iframePath.length > 1 && myObj.project[i].video.length < 1) {
                        $("#description1").append("<br /><a href='" + myObj.project[i].iframePath + "' target='_blank'>Click Here For Full Page View</a>");
                        $("#description1").append("<br /><iframe src='" + myObj.project[i].iframePath + "' height='500' width='800'></iframe>");
                    }

                    //If the project has a video instead of an iframe
                    if(myObj.project[i].video.length < 1) {
                        $("#videoP").css("display", "none");
                    } else {
                        $("#videoP").css("display", "block");
                    }
                }
            }

            //If the a project was found
            if (projectFound) {
                $("#projectFound").css("display", "block");
                $("#projectNotFound").css("display", "none");
            } else {
                $("#projectFound").css("display", "none");
                $("#projectNotFound").css("display", "block");
            }
        }  
    });
    
});