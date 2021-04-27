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

</script>

<style scoped>

</style>