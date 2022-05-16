<template>
  <main v-if="getMovieData">
    <img :src="getMovieData.coverImage" alt="Cover">
    <div class="movie__content">
      <h1>{{ getMovieData.title }}</h1>
      <h2>{{ getMovieData.genre }}</h2>
      <p>{{ getMovieData.description }}</p>a
    </div>
  </main>
</template>

<script>

import store from "../store";
export default {
  computed: {
    getMovieData() {
       return store.state.movies.find(movie => movie.title === this.$route.params.title)
    }
  }
}

</script>

<style scoped>
img {
  width: 100%;
  height: 40rem;
  object-fit: cover;
}
</style>