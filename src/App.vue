<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <hr/>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue'
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalHeader, {UserProps} from './components/GlobalHeader.vue';

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
  },
  setup() {
    return {
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
