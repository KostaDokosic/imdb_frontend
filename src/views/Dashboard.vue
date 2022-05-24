<template>
<!--  <header>-->
<!--    <h4>Filters</h4>-->
<!--    <select @change="handleFilterChange" v-model="genreFilter" class="filter" multiple>-->
<!--      <option :value="genre" v-for="genre in getGenres">{{genre.name}}</option>-->
<!--    </select>-->
<!--    <select v-model="likeFilter" @change="handleFilterChange">-->
<!--      <option :value="null">Filter by</option>-->
<!--      <option :value="1">Likes</option>-->
<!--      <option :value="0">Dislikes</option>-->
<!--    </select>-->
<!--  </header>-->
  <main v-if="getMovies">
    {{!getMovies ? 'There is no movies in database' : ''}}

    <h1 style="margin-top: 5rem;">Movies</h1>
    <div class="row" v-if="getMovies">
      <Movie v-for="(movie, index) in getMovies" :key="index" :movie-data="movie" />
    </div>
    <div class="pagination">
      <span :class="getCurrentPage === i ? 'active' : ''" v-for="i in getTotalPages" @click="changePagination(i)">{{i}}</span>
    </div>
  </main>
</template>

<script>
import Movie from '../components/Movie.vue'
import store from "../store";

export default {
  data() {

    return {
      genreFilter: [],
      likeFilter: null
    }
  },
  beforeMount() {
    store.dispatch('fetchMovies', {page: 1});
    store.dispatch('fetchGenres');
  },
  methods: {
    changePagination(index) {
      store.dispatch('fetchMovies', {page: index});
    },
    handleFilterChange() {
      store.dispatch('fetchMovies', {page: store.getters.getCurrentPage, genres: this.genreFilter, likeFilter: this.likeFilter})
    }
  },
  components: {
    Movie
  },
  computed: {
    getFeaturedMovie() {
      return store.getters.getFeaturedMovie;
    },
    getCurrentPage() {
      return store.getters.getCurrentPage;
    },
    getTotalPages() {
      return store.getters.getTotalPages;
    },
    getMovies() {
      return store.getters.getMovies;
    },
    getGenres() {
      return store.getters.getGenres;
    }
  }
}

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
  column-gap: 2rem;
  row-gap: 4rem;

  .movie {

    img {
      width: 100%;
    }

  }
}

.pagination {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  max-width: 30vw;
  margin: 4rem auto;

  .active {
    color: #2C666E !important;
  }

  span {
    font-size: 1.5rem;
    font-weight: 800;
    &:hover {
      cursor: pointer;
      color: #2C666E;
    }
  }
}

.filter {
  width: 20rem;
  margin: 1rem auto;
}
</style>