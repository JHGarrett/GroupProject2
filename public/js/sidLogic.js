$(document).ready(function() {
  // capture both values on clicking submit button
  $("#submit").click(function() {
    // $(".posters").empty();
    // clearResults();
    $(".content").empty();

    let searchText = $("#search-box")
      .val()
      .split(" ");
    let searchArray = searchText.join("+");

    let searchText2 = $("#search-box-2")
      .val()
      .split(" ");
    let searchArray2 = searchText2.join("+");

    console.log(searchArray);
    console.log(searchArray2);

    getTasteDive(searchArray, searchArray2);
  });

  // get movies function
  function getTasteDive(searchArray) {
    var apiCall =
      "https://cors-ut-bootcamp.herokuapp.com/https://tastedive.com/api/similar?k=334692-foreel-UBKAMU7G&type=movie&q=";

    console.log(apiCall + searchArray + "%2C" + searchArray2);

    var finalSearch = apiCall + searchArray + "%2C" + searchArray2;

    $.get(finalSearch)
      .then(function(response) {
        console.log(response);
        let movies = response.Similar.Results;
        // let posters = response.results.poster_path;
        // let output = '';
        for (i = 0; i < movies.length; i++) {
          console.log(movies[i].Name);
          var movArr = movies[i].Name;
          var movStr = movArr.split(" ");
          var movieTitles = movStr.join("+");
          getMoviePosters(movieTitles);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  // pass movietitles into here
  function getMoviePosters(movieTitles) {
    var omdbCall =
      "https://api.themoviedb.org/3/search/movie?api_key=248209b41efd69e17b54a070f19e9e35&query=";

    // console.log(omdbCall + movieTitles);

    $.get(omdbCall + movieTitles)
      .then(function(response) {
        console.log(response);
        let movies = response.results;

        for (i = 0; i < movies.length; i++) {
          var posterPath = movies[i].poster_path;
          var movImg = "https://image.tmdb.org/t/p/w342";

          // console.log(movImg + posterPath);

          $(".content").append(
            "<img src=" + movImg + posterPath + " id='movieThumbnail'>"
          );
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
