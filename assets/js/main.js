Vue.config.devtools = true;

var app = new Vue({
  el: '#root',
  data: {
    dataAPI: 'https://api.themoviedb.org/3/search/movie?api_key=29e84b564b7c90c52ba93dc6436ea2c6&query=',
    queryInput: '',
    moviesSearched:[],
  },
  methods: {
    searchMovie: function () {
      axios.get(this.dataAPI + this.queryInput)
        .then((response) => {
          console.log(response);
          this.moviesSearched = response.data.results;
          console.log(this.moviesSearched);
        });
    }
  }
});
