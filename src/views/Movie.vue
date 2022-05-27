<template>
  <main v-if="getMovieData">

    <div class="movie">
      <h1 class="title">{{ getMovieData.title }}</h1>
      <nav>
        <p>{{getMovieData.year}} | {{otherData.Runtime}}</p>
        <p><font-awesome-icon icon="star"  /> {{otherData.imdbRating}}/10  | {{otherData.imdbVotes}} <font-awesome-icon icon="chart-line" /></p>
      </nav>
      <header>
        <div class="movie__image">
          <img :src="getCoverImage" @error="replaceImg" alt="Cover">
        </div>
        <div class="trailer" @click="openTrailerModal">
          <img :src="trailerData.thumbnailUrl" alt="thumbnail" />
          <div class="elements">
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="ipc-icon ipc-icon--play-circle-outline-large-inline ipc-icon--inline ipc-lockup-overlay__icon ipc-lockup-overlay__icon--centered hero-media__slate-play-icon" id="iconContext-play-circle-outline-large-inline" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path></svg>
            <h2>Play Trailer</h2>
          </div>
        </div>
      </header>
      <div class="movie__content">
        <div class="movie__content_info">
          <ul>
            <li v-for="genre in getMovieData.genres" :key="genre">
              {{ $store.getters.getGenreName(genre) }}
            </li>
          </ul>
          <p class="info_group">{{ getMovieData.description }}</p>
          <p class="info_group"><strong>Directors:</strong> {{getMovieData.director}}</p>
          <p class="info_group"><strong>Actors:</strong> {{getMovieData.actors}}</p>
          <p class="info_group"><strong>Awards:</strong> {{otherData.Awards}}</p>
          <p class="info_group"><strong>Metascore:</strong> {{otherData.Metascore}}</p>
          <p class="info_group"><strong>Languages:</strong> {{otherData.Language}}</p>
          <p class="info_group"><strong>Writer:</strong> {{otherData.Writer}}</p>
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
      <teleport to="body">
        <div class="trailerModal" v-if="trailerOpen" @click="closeTrailer">
          <div class="trailerModal_content">
            <iframe :src="trailerData.linkEmbed"></iframe>
          </div>
        </div>
      </teleport>
    </div>
  </main>
</template>

<script>
import Modal from '../components/Modal.vue';
import store from "../store";
import { ref } from 'vue';
import axios from "axios";
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
      },
      otherData: {},
      trailerData: '',
      trailerOpen: false
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
      e.target.src = this.otherData.Poster;
    },
    deleteMovie() {

    },
    fetchOtherData() {
      axios.get(`http://www.omdbapi.com/?apikey=610b7998&t=${this.getMovieData.title.toLowerCase().replaceAll(' ', '+')}`)
          .then(response => {
            this.otherData = response.data
            this.fetchTrailer()
          })
    },
    fetchTrailer() {
      axios.get(`https://imdb-api.com/en/API/Trailer/k_25vs5x8a/${this.otherData?.imdbID}`)
          .then(response => {
            console.log(response.data)
            this.trailerData = response.data;
          })
    },
    openTrailerModal() {
      this.trailerOpen = true;
    },
    closeTrailer() {
      this.trailerOpen = false;
    }
  },
  beforeMount() {
    this.fetchOtherData();
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
  align-items: flex-start;
  flex-direction: column;

  .info_group {
    padding-bottom: 1rem;
  }

  * {
    margin: 0;
  }

  nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
    align-items: center;
    height: 40vh;
    margin-bottom: 3rem;
    margin-top: 1rem;
  }

  .title {
    font-size: 3rem;
  }

  p {
    margin-bottom: 2rem;
  }

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
      p {
        font-size: 1rem;
        margin-bottom: .5rem;
      }
      ul {
        list-style-type: none;
        display: flex;
        gap: 1rem;
        flex-direction: row;
        padding: 0;
        margin-bottom: 2rem;

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
      margin-top: 2rem;

      &:hover {
        background: #07393C;
        cursor: pointer;
      }
    }
  }
}

.trailer {
  width: 100%;
  height: 100%;
  position: relative;
  
  &:hover {
    cursor: pointer;
  }

  &:hover .elements svg {
    fill: #b4b402;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  
  .elements {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 1rem;
    width: 50%;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;

    h2 {
      width: 100%;
      font-size: 2rem;
    }

    svg {
      width: 4rem;
      height: 4rem;
      transition: fill .25s ease-in-out;
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

.trailerModal {
  background: rgba(0, 0, 0, 0.75);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &_content {
    width: 50%;
    height: 50%;

    iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
}
</style>