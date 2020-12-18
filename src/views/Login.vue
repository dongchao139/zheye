<template>
  <h2>LOGIN</h2>
  <button @click="handleClick" class="btn btn-outline-dark">column 3</button>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useRouter} from 'vue-router'

export default defineComponent({
  name: "Login",
  setup() {
    // useRouter路由跳转
    const router = useRouter();
    const handleClick = function () {
      router.push({name: 'column', params: {id: 3}})
    };
    return {
      handleClick
    }
  }
})
</script>

<style scoped>

</style>