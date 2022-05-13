<template>
  <div class="auth">
    <div class="container">
      <div class="auth__header">
        <h1>Welcome to IMDB</h1>
      </div>
      <div class="auth__content">
        <router-view></router-view>
      </div>
      <div class="auth__footer">
        <span class="infoMessage" v-if="$store.getters.getInfoMessage">{{ $store.getters.getInfoMessage }}</span>
        <p>IMDb is the world's most popular and authoritative source for movie, TV and celebrity content. Find ratings and reviews for the newest movie and TV shows</p>
      </div>
    </div>
  </div>

</template>

<script setup>

</script>

<style lang="scss" scoped>
  .auth {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100vh;

    .container {
      width: 30vw;
    }

    &__header {
      h1 {
        text-transform: uppercase;
        text-align: center;
      }
    }

    &__content {
      padding: 1rem;
      text-align: center;
    }

    &__footer {
      max-width: 80%;
      margin: 0 auto;
      text-align: center;
    }

    .infoMessage {
      background: tomato;
      color: white;
      padding: .85rem 1rem;
    }
  }
</style>