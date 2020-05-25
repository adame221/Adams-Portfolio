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
                    $("#description2").append('<p>Please click <a href="' + myObj.project[i].gitHub + '" target="_blank">this link</a> to view the source code for this project.</p>');

                    if(myObj.project[i].video.length < 1) {
                        $("#videoP").css("visibility", "hidden");
                    } else {
                        $("#videoP").css("visibility", "visible");
                    }
                }
            }

            if (projectFound) {
                $("#projectFound").css("visibility", "visible");
                $("#projectNotFound").css("visibility", "hidden");
            } else {
                $("#projectFound").css("visibility", "hidden");
                $("#projectNotFound").css("visibility", "visible");
            }
        }  
    });
    
});