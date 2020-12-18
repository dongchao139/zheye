<template>
  <h1><pre>{{route}}}</pre></h1>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useRoute} from 'vue-router';
export default defineComponent({
  name: "ColumnDetail",
  setup() {
/**
{
  "path": "/column/1",
  "name": "column",
  "params": {
    "id": "1"
  },
  "query": {
    "search": "123"
  },
  "hash": "#foo",
  "fullPath": "/column/1?search=123#foo",
  "matched": [
    {
      "path": "/column/:id",
      "name": "column",
      "children": [],
      ...
    }
  ],
  "meta": {}
}} */
    // useRoute获取路由信息
    const route = useRoute();
    return {
      route
    }
  }
})
</script>

<style scoped>

</style>