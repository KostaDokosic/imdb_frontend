<template>
  <main v-if="getMovieData">

    <div class="movie">
      <div class="movie__image">
        <img :src="getCoverImage" @error="replaceImg" alt="Cover">
      </div>
      <div class="movie__content">
        <div class="movie__content_info">
          <h1>{{ getMovieData.title }}</h1>
          <ul>
            <li v-for="genre in getMovieData.genres" :key="genre">
              {{ $store.getters.getGenreName(genre) }}
            </li>
          </ul>
          <p>{{ getMovieData.description }}</p>
          <button type="button" @click="deleteMovie" v-if="$store.getters.isEditor">Delete Movie</button>
        </div>

        <form @submit.prevent="postComment" class="comment_post">
          <label>Comment</label>
          <textarea rows="10" placeholder="Post your comment" @change="textChange" required></textarea>
          <button type="submit">Post Comment</button>
        </form>

        <div class="comments">
          <h1 v-if="comments.length">Comments</h1>
          <small v-if="!comment.length">There is no comments for this movie.</small>
          <p v-if="errorMessage.length">{{errorMessage}}</p>
          <div class="comment" v-for="(commentData, index) in comments" :key="index">
            <h2>{{ commentData.username }}</h2>
            <p>{{ commentData.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Modal from '../components/Modal.vue';
import store from "../store";
import { ref } from 'vue';
export default {
  data() {
    return {
      comment: '',
      comments: [],
      errorMessage: [],
      modalOpen: {
        open: ref(false),
        title: '',
        text: ''
      }
    }
  },
  components: {
    Modal
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
    postComment() {
      store.dispatch('postComment', {movie_id: this.getMovieData.id, text: this.comment})
          .then(response => {
            this.comments.push(response.data);
            window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
          })
          .catch(error => {
            this.errorMessage = 'Error occurred while creating comment. Please try again.'
          })
    },
    textChange(e) {
      this.comment = e.target.value;
    },
    replaceImg(e) {
      e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png';
    },
    deleteMovie() {

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

.movie {
  display: flex;
  justify-content: space-between;
  gap: 5rem;
  align-items: flex-start;
  margin-top: 5rem;

  &__image {
    img {
      width: 100%;
      height: auto;
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 1rem;

    &_info {
      h1 {
        font-size: 3rem;
        font-weight: 900;
        margin: 0;
        padding: 0;
      }

      ul {
        list-style-type: none;
        display: flex;
        gap: 1rem;
        flex-direction: row;
        padding: 0;

        li {
          background: #07393C;
          padding: .5rem 1rem;
        }
      }
    }


    .comment_post {
      width: 100%;
      margin: 5rem auto;
      textarea {
        width: 100%;
        outline: none;
        border: 1px solid black;
        padding: .5rem 1rem;
        background-color: #111014 !important;
        color: white;
      }
    }

    button {
      box-shadow: none;
      background: #111014;
      outline: none;
      border: 1px solid black;
      color: white;
      padding: .5rem 1rem;
      font-weight: 900;
      text-transform: uppercase;
      font-size: 1.25rem;
      transition: all .25s ease-in-out;

      &:hover {
        background: #07393C;
        cursor: pointer;
      }
    }
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