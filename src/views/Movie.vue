<template>
  <main v-if="getMovieData">
    <img :src="getMovieData.coverImage" alt="Cover">
    <div class="movie__content">
      <h1>{{ getMovieData.title }}</h1>
      <ul>
        <li v-for="genre in getMovieData.genres" :key="genre.id">{{genre.name}}</li>
      </ul>
      <p>{{ getMovieData.description }}</p>
    </div>
    <form @submit="postComment" class="comment">
      <label>Comment</label>
      <textarea rows="10" placeholder="Post your comment" required></textarea>
      <button type="submit">Post Comment</button>
    </form>
  </main>
</template>

<script>

import store from "../store";
export default {
  data() {
    return {
      comment: ''
    }
  },
  computed: {
    getMovieData() {
       return store.state.movies.data.find(movie => movie.title === this.$route.params.title) ?? 0
    }
  },
  methods: {
    postComment() {
      store.dispatch('postComment', this.comment);
    }
  }
}

</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 40rem;
  object-fit: cover;
}

.comment {
  width: 100%;
  margin: 5rem auto;
  textarea {
    width: 100%;
  }
}
</style>