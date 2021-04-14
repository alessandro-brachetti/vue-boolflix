Vue.config.devtools = true;

var app = new Vue({
  el: '#root',
  data: {
    uri: 'https://api.themoviedb.org/3',
    apiKey:'29e84b564b7c90c52ba93dc6436ea2c6',
    lang: '',
    queryInput: '',
    movies: [],
    errorMessage: false,
  },
  methods: {
    // AXIOS CALL TO SEARCH A MOVIE AND TVSHOW
    search: function() {
      this.movies = '';
      axios.get(`${this.uri}/search/movie?api_key=${this.apiKey}&language=${this.lang}&page=1&include_adult=false&query=${this.queryInput}`)
        .then((response) => {
          console.log(response);
          this.movies = [...this.movies, ...response.data.results];
        })
      axios.get(`${this.uri}/search/tv?api_key=${this.apiKey}&language=${this.lang}&page=1&include_adult=false&query=${this.queryInput}`)
        .then((response) => {
          console.log(response);
          this.movies = [...this.movies, ...response.data.results];
        })
      this.queryInput = '';

    },
    // GET MOVIE POSTERS OR IMG NOT AVAILABLE
    getPoster: function (obj) {
      if (obj.poster_path) {
        return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${obj.poster_path}`;
      } else {
        return 'assets/img/not-img.jpg'
      }
    },
    // GET TITLE OF MOVIES AND TVSHOWS
    getTitle: function(obj) {
      if (obj.title) {
        return obj.title;
      } else {
        return obj.name;
      }
    },
    // GET ORIGINAL TITLE OF MOVIES AND TV SHOWS
    getOriginalTitle: function(obj) {
      if (obj.original_title) {
        return obj.original_title;
      } else {
        return obj.original_name;
      }
    },
    // TRANSFORM VOTE IN 1/5
    getVote: function(obj) {
      return Math.ceil(obj / 2);
    },
  },
});
