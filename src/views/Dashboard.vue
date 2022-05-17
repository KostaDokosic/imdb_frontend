<template>
  <main>
    {{$store.state.movies.movies.length === 0 ? 'There is no movies in database' : ''}}
    <Movie :movie-data="$store.state.movies.movies[0]" class="featured" v-if="$store.state.movies.movies.length" />

    <h1 style="margin-top: 5rem;" v-if="$store.state.movies.movies.length">Movies</h1>
    <div class="row" v-if="$store.state.movies.movies.length">
      <Movie v-for="(movie, index) in $store.state.movies.movies" :key="index" :movie-data="movie" :v-if="index > 0" />
    </div>
    <div class="pagination">
      <span :class="currentPage === i ? 'active' : 'deactive'" v-for="i in $store.getters.getPageNumber" @click="changePagination(i)">{{i}}</span>
    </div>
  </main>
</template>

<script>
import Movie from '../components/Movie.vue'
import store from "../store";

export default {
  data() {

    return {
      currentPage: 1
    }
  },
  beforeMount() {
    store.dispatch('fetchMovies', this.currentPage - 1);
  },
  methods: {
    changePagination(index) {
      this.currentPage = index;
      store.dispatch('fetchMovies', index - 1);
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
</style>