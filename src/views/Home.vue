<template>
  <h2>hello {{biggerColumnLen}}</h2>
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
    const biggerColumnLen = computed(() => store.getters.biggerColumnsLen);
    return {
      list,
      biggerColumnLen
    }
  }
})
</script>

<style scoped>

</style>