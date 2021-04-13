Vue.config.devtools = true;

var app = new Vue({
  el: '#root',
  data: {
    uri: 'https://api.themoviedb.org/3',
    apiKey:'29e84b564b7c90c52ba93dc6436ea2c6',
    lang: 'it',
    queryInput: '',
    movies: [],
  },
  methods: {
    search: function() {
      axios.get(`${this.uri}/search/movie?api_key=${this.apiKey}&language=${this.lang}&page=1&include_adult=false&query=${this.queryInput}`)
        .then((response) => {
          this.movies = [...this.movies, ...response.data.results];
        })
      axios.get(`${this.uri}/search/tv?api_key=${this.apiKey}&language=${this.lang}&page=1&include_adult=false&query=${this.queryInput}`)
        .then((response) => {
          this.movies = [...this.movies, ...response.data.results];
          this.queryInput = '';
        })
    },
    getPoster: function (obj) {
      if (obj.poster_path) {
        return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${obj.poster_path}`;
      } else {
        return 'assets/img/not-img.jpg'
      }
    },
    getTitle: function(obj) {
      if (obj.title) {
        return obj.title;
      } else {
        return obj.name;
      }
    },
    getOriginalTitle: function(obj) {
      if (obj.original_title) {
        return obj.original_title;
      } else {
        return obj.original_name;
      }
    },
    getVote: function(obj) {
      return Math.ceil(obj / 2);
    }
  },
});
