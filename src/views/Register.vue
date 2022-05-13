<template>
    <form @submit.prevent="register">
        <div class="form_group">
          <label for="first_name">Name</label>
          <input type="text" id="first_name" placeholder="Enter first name" v-model="userData.first_name" @change="validate" required />
        </div>
      <div class="form_group">
        <label for="last_name">Last Name</label>
        <input type="text" id="last_name" placeholder="Enter your last name" v-model="userData.last_name" @change="validate" required />
      </div>
        <div class="form_group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" v-model="userData.email" required />
        </div>
        <div class="form_group">
          <label for="name">Password</label>
          <input type="password" id="password" placeholder="Enter password" v-model="userData.password" @change="validate" required />
        </div>
        <div class="form_group">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" placeholder="Confirm password" v-model="userData.repassword" @change="validate" required />
        </div>
      <div class="form_group">
        <button type="submit">Register</button>
      </div>
    </form>
</template>

<script setup>
import store from "../store";
import router from "../router";

  const userData = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    repassword: ''
  }
  function register() {
    store.dispatch('registerUser', userData)
        .then(() => {
          router.push({'name': 'Dashboard'})
        })
  }

  function validate() {
    if (/[^a-zA-Z]/.test(userData.first_name)) {
      store.commit('setInfoMessage', 'Invalid first name!')
    }
    else if (/[^a-zA-Z]/.test(userData.last_name)) {
      store.commit('setInfoMessage', 'Invalid last name!')
    }
    else if(userData.password.length < 5 && userData.password.length > 0) {
      store.commit('setInfoMessage', 'Password is too short!')
    }
    else if(userData.password.localeCompare(userData.repassword) !== 0) {
      store.commit('setInfoMessage', 'Passwords dont match!')
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
    }

    input {
      outline: none;
      border: 1px solid gray;
      padding: .5rem 1rem;
    }

    button {
      box-shadow: none;
      background: skyblue;
      outline: none;
      border: 1px solid gray;
      color: white;
      padding: .5rem 1rem;

      &:hover {
        background: lightblue;
        cursor: pointer;
      }
    }
  }
</style>