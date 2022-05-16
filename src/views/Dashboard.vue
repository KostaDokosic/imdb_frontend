<template>
    {{$store.state.movies.length === 0 ? 'There is no movies in database' : ''}}
    <Movie :movie-data="$store.state.movies[0]" class="featured" v-if="$store.state.movies.length" />

    <h1 style="margin-top: 5rem;" v-if="$store.state.movies.length">Movies</h1>
    <div class="row" v-if="$store.state.movies.length">
      <Movie v-for="(movie, index) in $store.state.movies" :key="index" :movie-data="movie" :v-if="index > 0" />
    </div>
</template>

<script setup>
import Movie from '../components/Movie.vue'
import {onBeforeMount} from "vue";
import store from "../store";

onBeforeMount(() => {
  store.dispatch('fetchMovies');
});

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
</style>