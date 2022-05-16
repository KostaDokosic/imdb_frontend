<template>
  <form @submit.prevent="login">
    <div class="form_group">
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="Enter your email" v-model="userData.email" required />
    </div>
    <div class="form_group">
      <label for="name">Password</label>
      <input type="password" id="password" placeholder="Enter password" v-model="userData.password" required />
    </div>
    <div class="form_group">
      <button type="submit">Login</button>
    </div>
  </form>
</template>

<script setup>
import store from "../store";
import {useRouter} from "vue-router";
const router = useRouter();

const userData = {
  email: '',
  password: ''
}
function login() {
  store.dispatch('login', userData).then((res) => router.push({
    name: 'Dashboard'
  })).catch(e => store.commit('setInfoMessage', e.response.statusText))
}
</script>

<style lang="scss" scoped>
@import '../assets/forms.scss';
</style>