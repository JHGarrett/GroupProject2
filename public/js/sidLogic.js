$(document).ready(function() {
  // capture value from search
  $("#search-form").on("submit", function(e) {
    let searchText = $("#search-box")
      .val()
      .split(" ");
    let searchArray = searchText.join("+");
    console.log(searchArray);

    // retrieve movies
    getTasteDive(searchArray);

    e.preventDefault();
  });
});

// get movies function
function getTasteDive(searchArray) {
  var apiCall =
    "https://cors-ut-bootcamp.herokuapp.com/https://tastedive.com/api/similar?k=334692-foreel-UBKAMU7G&type=movie&q=";

  console.log(apiCall + searchArray);

  $.get(apiCall + searchArray)
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
      /* $.each(movies, (index, movie) => {
                // $('#movPoster').append('<img src=' + '"https://image.tmdb.org/t/p/w500"' + movie.poster_path + '>');
                // $('#movTitle').append(movie.title);
            }); */
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
        var movImg = "https://image.tmdb.org/t/p/w92";

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
