<template>
  <h2>HOME</h2>
  <router-link :to="{name: 'column', params: {id: 1}}">detail 1</router-link><br>
  <router-link :to="`/column/${2}`">detail 2</router-link>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: "Home"
})
</script>

<style scoped>

</style>