<template>
  <div>
    <router-link class="movie" :to="{ name: 'Movie', params: { title: movieData.title } }">
      <img :src="movieData.coverImage" alt="Cover">
      <div class="movie__content">
        <h1>{{ movieData.title }}</h1>
        <ul>
          <li v-for="genre in movieData.genres" :key="genre">
            {{ getGenreName(genre) }}
          </li>
        </ul>
        <p>{{ movieData.description.substring(0, 70) + '...' }}</p>
      </div>
    </router-link>
    <p>Likes: {{movieData.totalLikes}}</p>
    <div class="btn_group">
      <button type="button" :class="movieData.userLike === 1 ? 'active' : ''" @click="onLike(true)" :disabled="movieData.userLike === 1">Like</button>
      <button type="button" :class="movieData.userLike === 0 ? 'active' : ''" @click="onLike(false)" :disabled="movieData.userLike === 0">Dislike</button>
    </div>
    <p v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script>
import store from "../store";
export default {
  props: ['movieData'],
  data() {

    return {
      errorMessage: ''
    }
  },
  methods: {
    onLike(state) {
      store.dispatch('onLike', {movie_id: this.movieData.id, like: state === true ? 1 : 0})
          .then(response => {
            this.movieData.userLike = response.data[0].like;
          })
          .catch(error => {
            this.errorMessage = 'Error. Please try again';
          })
    }
  },
  computed: {
    getGenreName(genre) {
      return store.getters.getGenreName;
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  background: skyblue;
}

button {
  outline: none;
  box-shadow: none;
  border: 1px solid gray;

  &:hover {
      background: lightgreen;
   }
}

.btn_group {
  display: flex;
  gap: 1rem;
}
</style>