<template>
  <router-link class="movie" :to="{ name: 'Movie', params: { title: movieData.title } }">
    <img :src="movieData.coverImage" alt="Cover">
    <div class="movie__content">
      <h1>{{ movieData.title }}</h1>
      <ul>
        <li v-for="genre in movieData.genres" :key="genre">
          {{ $store.getters.getGenreName(genre) }}
        </li>
      </ul>
      <p>{{ movieData.description }}</p>
    </div>

  </router-link>
</template>

<script>
export default {
  props: ['movieData']
}
</script>

<style scoped>

</style>