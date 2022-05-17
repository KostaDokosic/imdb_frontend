<template>
  <main v-if="$store.getters.getMovies">
    {{$store.getters.getMovies.length === 0 ? 'There is no movies in database' : ''}}
    <Movie :movie-data="$store.getters.getMovies[0]" class="featured" />

    <h1 style="margin-top: 5rem;">Movies</h1>
    <div class="row">
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
    }
  },
  beforeMount() {
    store.dispatch('fetchMovies', 1);
  },
  methods: {
    changePagination(index) {
      store.dispatch('fetchMovies', index);
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