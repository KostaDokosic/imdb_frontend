<template>
  <header>
    <h4>Filters</h4>
    <select @change="handleFilterChange" v-model="genreFilter" class="filter" multiple>
      <option :value="genre" v-for="genre in getGenres">{{genre.name}}</option>
    </select>
  </header>
  <main v-if="getMovies">
    {{!getMovies ? 'There is no movies in database' : ''}}
    <Movie :movie-data="getFeaturedMovie" class="featured" />

    <h1 style="margin-top: 5rem;">Movies</h1>
    <div class="row" v-if="$store.state.movies.data">
      <Movie v-for="(movie, index) in getMovies" :key="index" :movie-data="movie" :v-if="index > 0" />
    </div>
    <div class="pagination">
      <span :class="getCurrentPage === i ? 'active' : ''" v-for="i in getTotalPages" @click="changePagination(i)">{{i}}</span>
    </div>
  </main>
</template>

<script>
import Movie from '../components/Movie.vue'
import store from "../store";

export default {
  data() {

    return {
      genreFilter: []
    }
  },
  beforeMount() {
    store.dispatch('fetchMovies', {page: 1});
    store.dispatch('fetchGenres');
  },
  methods: {
    changePagination(index) {
      store.dispatch('fetchMovies', {page: index});
    },
    handleFilterChange() {
      store.dispatch('fetchMovies', {page: store.getters.getCurrentPage, genres: this.genreFilter})
    }
  },
  components: {
    Movie
  },
  computed: {
    getFeaturedMovie() {
      return store.getters.getFeaturedMovie;
    },
    getCurrentPage() {
      return store.getters.getCurrentPage;
    },
    getTotalPages() {
      return store.getters.getTotalPages;
    },
    getMovies() {
      return store.getters.getMovies;
    },
    getGenres() {
      return store.getters.getGenres;
    }
  }
}

</script>

<style lang="scss">
.featured {

  img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
  }
}
.row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  .movie {

    img {
      width: 100%;
    }

  }
}

.pagination {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  max-width: 30vw;
  margin: 4rem auto;

  .active {
    color: lightgreen !important;
  }

  span {
    font-size: 1.5rem;
    &:hover {
      cursor: pointer;
      color: skyblue;
    }
  }
}

.filter {
  width: 20rem;
  margin: 1rem auto;
}
</style>