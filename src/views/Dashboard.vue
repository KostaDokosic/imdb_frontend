<template>
  <header>
    <Multiselect v-model="genreFilter.value" v-bind="genreFilter" @select="handleFilterChange" @deselect="handleFilterChange" @clear="clearGenres" placeholder="Genre Filter" />
    <Multiselect v-model="likeFilter.value" v-bind="likeFilter" @select="handleFilterChange" @deselect="handleFilterChange" @clear="clearLikes" placeholder="Like Filter" />
  </header>
  <main v-if="getMovies">
    {{!getMovies ? 'There is no movies in database' : ''}}
    <MovieSlider />
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
import Multiselect from '@vueform/multiselect';
import MovieSlider from '../components/MovieSlider.vue';

export default {
  data() {

    return {
      genreFilter: {
        mode: 'tags',
        value: [],
        closeOnSelect: false,
        options: async () => {
          return await store.getters.getFormattedGenres
        },
        searchable: true,
      },
      likeFilter: {
        value: -1,
        closeOnSelect: true,
        options: [
          {label: 'Like', value: 1},
          {label: 'Dislike', value: 0},
        ]
      },
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
      console.log(this.likeFilter.value)
      store.dispatch('fetchMovies', {page: store.getters.getCurrentPage, genres: this.genreFilter.value.map(g => g), likeFilter: this.likeFilter.value})
    },
    clearGenres() {
      this.genreFilter.value = [];
      this.handleFilterChange();
    },
    clearLikes() {
      this.likeFilter.value = -1;
      this.handleFilterChange();
    }
  },
  components: {
    Movie,
    Multiselect,
    MovieSlider
  },
  computed: {
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
:root {
  --ms-tag-bg: #07393C;
  --ms-tag-color: white;
  --ms-tag-font-weight: 500;
  --ms-bg: #111014;
  --ms-ring-color: #111014;
  --ms-dropdown-bg: #111014;
  --ms-border-color: #111014;
  --ms-dropdown-border-color: #111014;
  --ms-empty-color: #111014;
  --ms-option-bg-pointed: #07393C;
  --ms-option-color-pointed: #07393C;
}
@import '@vueform/multiselect/themes/default.css';
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

.multiselect-tags-search {
  background: #111014;
}

header {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>