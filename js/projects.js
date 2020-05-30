$(document).ready(function () {
    var myObj;

    $.ajax ({
        type: "GET",
        url: "./json/projects.json",
        dataType: "json",
        success: function (pros) { 
            myObj = pros;
            console.log(pros);

            let url = new URL(window.location.href);
            let params = new URLSearchParams(url.search);
            let q = params.get('project') // 'mdn query string'
        
            var projects = myObj.project;
            var projectFound = false;
        
            for (var i = 0; i < projects.length; i++) {
        
                if (q == projects[i].id) {
                    projectFound = true;
                    $("#projectTitle").html(myObj.project[i].name);
                    $("#description1").html(myObj.project[i].description1);
                    $("#subTitle").html(myObj.project[i].subName);
                    $("#intro").append('<img src="' + myObj.project[i].image1 + '" width="100%" height="100%" alt="" class="intro__img">');
                    $("video").append('<source src="' + myObj.project[i].video + '" type="video/mp4">Your browser does not support the video tag.');
                    $("#description2").html(myObj.project[i].description2);
                    $("#lastUpdated").html(myObj.project[i].lastUpdated);
                    $("#description2").append('<p>Please click <a href="' + myObj.project[i].gitHub + '" target="_blank">this link</a> to view the source code for this project.</p>');

                    if(myObj.project[i].iframePath.length > 1) {
                        $("#description1").append("<br /><iframe src='" + myObj.project[i].iframePath + "' height='500' width='800'></iframe>");
                    }

                    if(myObj.project[i].video.length < 1) {
                        $("#videoP").css("display", "none");
                    } else {
                        $("#videoP").css("display", "block");
                    }
                }
            }

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