<template>
  <header>
    <h4>Filters</h4>
    <select @change="handleFilterChange" v-model="genreFilter" class="filter" multiple>
      <option :value="genre" v-for="genre in $store.getters.getGenres">{{genre.name}}</option>
    </select>
    <select @change="handleFilterChange" v-model="likeFilter">
      <option :value="null">Filter by</option>
      <option value="1">Likes</option>
      <option value="0">Dislikes</option>
    </select>
  </header>
  <main v-if="$store.getters.getMovies">
    {{!$store.getters.getMovies ? 'There is no movies in database' : ''}}
    <Movie :movie-data="$store.getters.getFeaturedMovie" class="featured" />

    <h1 style="margin-top: 5rem;">Movies</h1>
    <div class="row" v-if="$store.state.movies.data">
      <Movie v-for="(movie, index) in $store.getters.getMovies" :key="index" :movie-data="movie" :v-if="index > 0" />
    </div>
    <div class="pagination">
      <span :class="$store.getters.getCurrentPage === i ? 'active' : ''" v-for="i in $store.getters.getTotalPages" @click="changePagination(i)">{{i}}</span>
    </div>
  </main>
</template>

<script>
import Movie from '../components/Movie.vue'
import store from "../store";

export default {
  data() {

    return {
      genreFilter: [],
      likeFilter: false
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
      store.dispatch('fetchMovies', {page: store.getters.getCurrentPage, genres: this.genreFilter, likeFilter: this.likeFilter})
    }
  },
  components: {
    Movie
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