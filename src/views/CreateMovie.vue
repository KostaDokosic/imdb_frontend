<template xmlns="http://www.w3.org/1999/html">
  <form @submit.prevent="addMovie">
    <div class="form_group">
      <label for="title">Title</label>
      <input type="text" id="title" placeholder="Movie Title" v-model="movie.title" required />
    </div>
    <div class="form_group">
      <label for="genre">Genres</label>
      <select id="genre" v-model="movie.genre_ids" multiple required>
        <option v-for="genre in getGenres" :key="genre.id" :value="genre.id">{{genre.name}}</option>
      </select>
    </div>
    <div class="form_group">
      <label for="cover-image">Cover Image</label>
      <input type="file" id="cover-image" placeholder="Cover Image" @change="fileChange" accept="image/png, image/jpg" required />
    </div>
    <div class="form_group">
      <label for="description">Title</label>
      <textarea rows="10" id="description" placeholder="Movie Description" v-model="movie.description"></textarea>
    </div>
    <div class="form_group">
      <button type="submit">Add Movie</button>
    </div>

    <teleport to="body">
      <Modal :title="modal.title" :message="modal.text" @close="modal.open = false" v-if="modal.open" />
    </teleport>
  </form>
</template>

<script>
import store from "../store";
import {useRouter} from "vue-router";
import Modal from '../components/Modal.vue';
const router = useRouter();
import { ref } from 'vue';

export default {

  data() {
    return {
      movie:  {
        title: '',
        genre_ids: [],
        coverImage: {},
        description: '',
      },
      modal: {
        open: ref(false),
        title: '',
        text: ''
      }
    }
  },
  methods: {
    addMovie() {
      store.dispatch('addMovie', this.movie).then((res) => {
        alert(`${this.movie.title} has been added added.`);
      }).catch(e => {
        if(e.response && e.response.data && e.response.data.errors) this.onError(e.response?.data?.errors);
      })
    },
    fileChange(e) {
      this.movie.coverImage = e.target.files.item(0)
    },
    onError(errors) {
      let errorMessage = [];
      Object.keys(errors)?.forEach(key => {
        Object.values(errors[key])?.forEach(e => errorMessage.push(e))
      });
      this.alert('Error', errorMessage);
    },
    alert(title, text) {
      this.modal.text = text;
      this.modal.title = title;
      this.modal.open = true;
    }
  },
  computed: {
    getGenres() {
      return store.getters.getGenres
    }
  },
  components: {
    Modal
  }
}
</script>

<style lang="scss" scoped>
.form_group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;

label {
  text-align: left;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: .25rem;
}

  textarea {
    outline: none;
    border: 1px solid black;
    padding: .5rem 1rem;
    background-color: #111014 !important;
    color: white;
  }

input {
  outline: none;
  border: 1px solid black;
  padding: .5rem 1rem;
  background-color: #111014 !important;
  color: white;
}
  select {
    border: black;
    outline: none;

    &:focus {
      background: #07393C;
    }
    option {
      padding: 1rem;
      background: #111014;

      &:checked, &:focus, &:active, &:hover {
        background: #07393C !important;
      }
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

.errorMessage {
  color: white;
  background: tomato;
  padding: .5rem 1rem;
  text-align: center;
  margin: 2rem auto;
  white-space: pre-line;
  word-break: break-word;
  font-family: inherit;
}
</style>