<template>
    <nav>
      <div class="topnav">
        <div class="container">
          <div class="nav-grid">
            <div>
              <router-link to="/dashboard" :class="$route.path === '/dashboard' ? 'active' : ''">Dashboard</router-link>
              <router-link to="/addmovie" :class="$route.path === '/addmovie' ? 'active' : ''" v-if="$store.getters.isEditor">Add Movie</router-link>
              <a @click="logout">Logout</a>
            </div>
            <Search />
          </div>
        </div>
      </div>
    </nav>
  <div class="container">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import store from "../store";
import {useRouter} from "vue-router";
import Search from '../components/Search.vue';
const router = useRouter();
function logout() {
  store.dispatch('logout');
  router.push({
    name: 'Login'
  })
}
</script>

<style lang="scss" scoped>
.topnav {
  overflow: hidden;
  background-color: #131217;
  margin-bottom: 2.5rem;
}

.nav-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.topnav a {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #2C666E;
  color: white;
  cursor: pointer;
}

.active {
  background-color: #2C666E;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>