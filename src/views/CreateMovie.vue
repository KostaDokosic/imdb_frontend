<template xmlns="http://www.w3.org/1999/html">
  <form @submit.prevent="addMovie">
    <div class="form_group">
      <label for="title">Title</label>
      <input type="text" id="title" placeholder="Movie Title" v-model="movie.title" required />
    </div>
    <div class="form_group">
      <label for="genre">Genres</label>
      <select id="genre" v-model="movie.genre">
        <option v-for="genre in $store.getters.getGenres" :key="genre" :value="genre">{{genre}}</option>
      </select>
    </div>
    <div class="form_group">
      <label for="cover-image">Cover Image</label>
      <input type="text" id="cover-image" placeholder="Movie Title" v-model="movie.coverImage" required />
    </div>
    <div class="form_group">
      <label for="description">Title</label>
      <textarea rows="10" id="description" placeholder="Movie Description" v-model="movie.description"></textarea>
    </div>
    <div class="form_group">
      <button type="submit">Add Movie</button>
    </div>
  </form>
</template>

<script setup>
import store from "../store";
import {onBeforeMount} from "vue";

const movie = {
  title: '',
  genre: store.getters.getGenres[0],
  coverImage: '',
  description: ''
}
function addMovie() {
  store.dispatch('addMovie', movie).then((res) => {
    alert(`${movie.title} has been added added.`);
  }).catch(e => {
    alert('Error while creating movie. Please try again...');
  })
}
</script>

<style scoped>
@import "../assets/forms.scss";
</style>