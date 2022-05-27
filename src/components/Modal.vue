<template>
  <div class="modal">
    <div class="modal_content">
      <h1>{{ title }}</h1>
      <p>{{ message }}</p>
      <button class="modal_button" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";

defineProps({
  title: String,
  message: String
})

defineEmits('close')
</script>

<style lang="scss" scoped>
.modal {
  width: 100vw;
  height: 100vh;
  background: rgba(50, 50, 50, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &_content {
    background: #F0EDEE;
    width: 30rem;
    text-align: center;
    padding: 2rem 1rem;
    border-radius: 5px;

    * {
      color: black;
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
    margin-top: 1rem;

    &:hover {
      background: #07393C;
      cursor: pointer;
    }
  }
}

</style>