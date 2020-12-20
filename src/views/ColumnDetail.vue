<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle border"/>
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import {useRoute} from 'vue-router';
import PostList from "@/views/PostList.vue";
import {useStore} from 'vuex';
import {GlobalDataProps} from "@/store";
export default defineComponent({
  name: "ColumnDetail",
  components: {
    PostList
  },
  setup() {
    // useRoute获取路由信息
    const route = useRoute();
    const currentId = +route.params.id;
    // 从store中找当前的数据
    const store = useStore<GlobalDataProps>();
    // const column = computed(() => {
    //   return store.state.columns.find(c => c.id === currentId);
    // });
    // const list = computed(() => {
    //   return store.state.posts.filter(post => post.columnId === currentId);
    // })
    const column = computed(() => {
      return store.getters.getColumnById(currentId);
    });
    const list  = computed(() => {
      return store.getters.getPostByCid(currentId);
    });
    return {
      column,
      list
    }
  }
});

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
</script>

<style scoped>

</style>