<template>
  <main v-if="getMovieData">
    <img :src="getCoverImage" alt="Cover">
    <div class="movie__content">
      <h1>{{ getMovieData.title }}</h1>
      <ul>
        <li v-for="genre in getMovieData.genres" :key="genre">
          {{ $store.getters.getGenreName(genre) }}
        </li>
      </ul>
      <p>{{ getMovieData.description }}</p>
    </div>
    <form @submit.prevent="postComment" class="comment_post">
      <label>Comment</label>
      <textarea rows="10" placeholder="Post your comment" required></textarea>
      <button type="submit">Post Comment</button>
    </form>

    <div class="comments">
      <h1>Comments</h1>
      <p v-if="errorMessage.length">{{errorMessage}}</p>
      <div class="comment" v-for="(commentData, index) in comments" :key="index">
        <h2>{{ commentData.username }}</h2>
        <p>{{ commentData.comment }}</p>
      </div>
    </div>
  </main>
</template>

<script>

import store from "../store";
export default {
  data() {
    return {
      comment: '',
      comments: [],
      errorMessage: []
    }
  },
  computed: {
    getMovieData() {
       return store.state.movies.data.find(movie => movie.title === this.$route.params.title) ?? 0
    },
    getCoverImage() {
      return this.getMovieData.coverImage.includes('movie_images') ? `http://localhost:8000/${this.getMovieData.coverImage}` : this.getMovieData.coverImage
    }
  },
  methods: {
    postComment(e) {
      store.dispatch('postComment', {movie_id: this.getMovieData.id, text: this.comment})
          .then(responseData => {
            this.comments.push(responseData);
          })
          .catch(error => {
            this.errorMessage = 'Error occurred while creating comment. Please try again.'
          })
    }
  },
  beforeMount() {
    store.dispatch('fetchComments', this.getMovieData.id)
        .then(paginatedData => {
            this.comments = paginatedData.data;
        })
        .catch(error => {
          this.errorMessage = 'Error occurred while fetching comments from server.';
        });
  }
}

</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 40rem;
  object-fit: cover;
}

.comment_post {
  width: 100%;
  margin: 5rem auto;
  textarea {
    width: 100%;
  }
}

.comments {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 4rem;

  .comment {
    border: 1px solid gray;
    padding: 2rem 4rem;
    width: 100%;
  }
}
</style>