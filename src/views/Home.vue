<template>
  <h2>HOME</h2>
<!--  <router-link :to="{name: 'column', params: {id: 1}}">detail 1</router-link>&nbsp;-->
<!--  <router-link :to="`/column/${2}`">detail 2</router-link>-->
  <column-list :list="list"></column-list>
</template>

<script lang="ts">
import {defineComponent,computed} from 'vue';
import ColumnList from '../components/ColumnList.vue';
import {useStore} from 'vuex';
import {GlobalDataProps} from "@/store";

export default defineComponent({
  components: {ColumnList},
  name: "Home",
  setup() {
    // 从store中找当前的数据
    const store = useStore<GlobalDataProps>();
    const list = computed(() => {
      return store.state.columns;
    });
    return {
      list
    }
  }
})
</script>

<style scoped>

</style>