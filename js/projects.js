$(document).ready(function(){
            var myObj = JSON.parse('{"project":[{"id":"RandomMovieGenerator", "gitHub": "https://github.com/adame221/Movie-Generator", "video":"videos/RandomMovieVideo.mov", "image1":"img/movie.png", "name":"Random Movie Generator", "subName":"Searches an api for a random movie", "image": "test", "description1":"This project allows a user to search by movie title.  The user inputted text sent as a parameter to the a movie rest api.  If there was movie that matched the input, then the movie details are displayed in the HTML.  If there is no movie found, then an error message is displayed.  A user can user search on a random movie in the api.", "description2":"The cool features within this app is that once a movie is returned, the user can over Metacritic, Rotten Tomato’s, and Imbd logos to find the corresponding ratings for the selected movie.  If the user clicks on the one of the rating logos, then they’ll be directed to that site with the movie prepopulated."}]}');

            let url = new URL(window.location.href);
            let params = new URLSearchParams(url.search);
            let q = params.get('project') // 'mdn query string'

            var projects = myObj.project;

            console.log(projects.length);

            for(var i = 0; i < projects.length; i++) {

                if(q == projects[i].id) {

                    if(projects[i].name != null) {
                        $("#projectFound").css("visibility", "visible");
                        $("#projectNotFound").css("visibility", "hidden");
                    } else {
                        $("#projectFound").css("visibility", "hidden");
                        $("#projectNotFound").css("visibility", "visible");
                    }
                    
                    $("#projectTitle").html(myObj.project[i].name);
                    $("#description1").html(myObj.project[i].description1);
                    $("#subTitle").html(myObj.project[i].subName);
                    $("#intro").append('<img src="' + myObj.project[i].image1 + '" width="100%" height="100%" alt="" class="intro__img">');
                    $("video").append('<source src="' + myObj.project[i].video  + '" type="video/mp4">Your browser does not support the video tag.');
                    $("#description2").html(myObj.project[i].description2);
                    $("#description2").append('<p>Please click <a href="' + myObj.project[i].gitHub + '" target="_blank">this link</a> to view the source code for this project.</p>');
                }
            }
  });