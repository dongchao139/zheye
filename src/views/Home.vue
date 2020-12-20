<template>
  <h2>HOME</h2>
<!--  <router-link :to="{name: 'column', params: {id: 1}}">detail 1</router-link>&nbsp;-->
<!--  <router-link :to="`/column/${2}`">detail 2</router-link>-->
  <column-list :list="testData"></column-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ColumnList from '../components/ColumnList.vue';
import {testData} from "@/testData";

export default defineComponent({
  components: {ColumnList},
  name: "Home",
  setup() {
    return {
      testData
    }
  }
})
</script>

<style scoped>

</style>