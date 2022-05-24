<template>
  <div class="movie">
    <router-link class="movie_router" :to="{ name: 'Movie', params: { title: movieData.title } }">
      <img :src="getCoverImage" @error="replaceBadImage" class="movie_image">
      <div class="movie_overlay"></div>
      <div class="movie_footer">
        <div class="movie_content">
          <h1>{{ getTitle }}</h1>
          <ul>
            <li v-for="genre in movieData.genres" :key="genre">
              {{ $store.getters.getGenreName(genre) }}
            </li>
          </ul>
          <p>{{ getDesc }}</p>
        </div>
        <div class='movie_likes'>
          <div class="movie_likes__group" @click="onLike(true, $event)">
            <span :class="userLike === 1 ? 'active' : ''">{{ movieData.totalLikes }}</span>
            <font-awesome-icon icon="thumbs-up" />
          </div>
          <div class="movie_likes__group" @click="onLike(false, $event)">
            <span :class="userLike === 0 ? 'active' : ''">{{ movieData.totalDislikes }}</span>
            <font-awesome-icon icon="thumbs-down" />
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import store from "../store";
export default {
  props: ['movieData'],
  methods: {
    onLike(state, event) {
      event.stopPropagation();
      event.preventDefault();

      let likeStatus = state ? 1 : 0;
      likeStatus = likeStatus === this.movieData.userLike ? -1 : likeStatus;
      store.dispatch('onLike', {movie_id: this.movieData.id, like: likeStatus})
    },
    replaceBadImage(e) {
      e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png';
    }
  },
  computed: {
    getDesc() {
      return this.movieData.description.substring(0, 70) + '...'
    },
    getTitle() {
      return this.movieData.title.substring(0, 15)
    },
    userLike() {
      return this.movieData.userLike
    },
    getCoverImage() {
      return this.movieData.coverImage.includes('movie_images') ? `http://localhost:8000/${this.movieData.coverImage}` : this.movieData.coverImage
    }
  },
}
</script>

<style lang="scss" scoped>

.movie {
  position: relative;

  &:hover &_footer {
    display: block;
  }

  &:hover &_overlay {
    opacity: .5;
  }
  
  &_overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: black;
    opacity: .25;
    transition: all .25s ease-in-out;
  }

  &_image {
    filter: saturate(.65);
  }

  &_footer {
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    padding: .5rem 1rem;
    transition: all .25s ease-in-out;

    * {
      color: #F0EDEE;
    }

    h1 {
      text-transform: uppercase;
      font-weight: 900;
      text-align: center;
    }

    p {
      text-align: center;
    }
  }

  &_likes {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    width: 50%;
    margin: 1rem auto;
    font-size: 1rem;

    &__group {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: .5rem;

      &:hover * {
        color: #2C666E;
      }

      .active {
        color: sandybrown !important;
      }
    }

  }

  ul {
    list-style-type: none;
    display: flex;
    gap: 1rem;
    justify-content: space-evenly;
    align-items: center;
    text-align: left;
    margin: 0;
    padding: 0;

    li {
      background: #07393C;
      padding: .25rem .5rem;
    }
  }
}
</style>