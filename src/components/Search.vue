<template>
  <div class="search">
    <main>
      <input type="text" placeholder="Search Movie" class="search_input" @focus="onInputFocus" @blur="onInputFocusOut" v-debounce.200ms="searchMovies">
      <font-awesome-icon icon="magnifying-glass" class="search_icon" />
    </main>
    <div v-if="visible" class="search_results">
      <div class="search_results__result" v-for="movie in getSearchedMovies" :key="movie.id" v-if="getSearchedMovies.length > 0">
        <span>{{movie.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import {vue3Debounce} from 'vue-debounce';
export default {
  name: "Search",
  data() {
    return {
      visible: false,
      searched: []
    }
  },
  directives: {
    debounce: vue3Debounce({lock: true})
  },
  computed: {
    getSearchedMovies() {
      return this.searched;
    }
  },
  methods: {
    searchMovies(val, e) {
      if(val <= 2) return this.searched = [];

      store.dispatch('searchMovie', val)
          .then(result => {
              this.searched = result.data;
          })
    },
    onInputFocus() {
      this.visible = true;
    },
    onInputFocusOut() {
      this.visible = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: absolute;
  width: 30%;
  overflow: hidden;
  right: 0;
  top: .5rem;
  height: 20rem;

  main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &_input {
    background: #0A090C;
    color: #F0EDEE;
    outline: none;
    border: 0;
    width: 100%;
    margin: 0;
    padding: .85rem 1rem;
  }

  &_icon {
    position: absolute;
    right: .85rem;
    opacity: .75;
  }

  &_results {
    display: flex;
    flex-direction: column;
    height: auto;
    max-height: 100%;
    background: white;
    gap: 1rem;
    position: fixed;
    overflow: hidden;
    width: 20rem;

    &__result {
      padding: .5rem 1rem;
      text-align: left;
      transition: background-color .2s ease-in-out;


      &:hover {
        background: gray;
        cursor: pointer;

        span {
          color: #F0EDEE;
        }
      }

      span {
        color: black;
        transition: color .2s ease-in-out;
      }
    }
  }
}

input:focus + .search_icon {
  opacity: 1;
}
</style>