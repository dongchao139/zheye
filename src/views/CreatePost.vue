<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input place-holder="请输入文章标题" type="text"
         :rules="titleRules" v-model="titleValue"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input placeholder="请输入文章详情" type="textarea"
         :rules="contentRules" v-model="contentValue"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large w-100" :style="{lineHeight: '2em'}">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import {defineComponent,ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useStore} from'vuex';
import ValidateForm from "@/components/forms/ValidateForm.vue";
import ValidateInput, {RulesProp} from "@/components/forms/ValidateInput.vue";

export default defineComponent({
  name: "CreatePost",
  components: {
    ValidateForm,
    ValidateInput
  },
  setup() {
    // useRoute获取路由信息
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const columnId = +route.params.id;
    const titleValue = ref<string>();
    const contentValue = ref<string>();
    const titleRules: RulesProp = [{type:"required",message: "标题不能为空"}];
    const contentRules: RulesProp = [{type:"required",message: "内容不能为空"}];
    const onFormSubmit = function (result: Array<any>) {
      const newPost = {id: Math.random(), title: result[0].value, content: result[1].value, createdAt: new Date(), columnId: columnId};
      console.log(newPost);
      store.commit('addPost', newPost);
      router.push({name: 'column', params: {id: columnId}});
    }
    return {
      titleValue,
      contentValue,
      titleRules,
      contentRules,
      onFormSubmit
    }
  }
})
</script>

<style scoped>

</style>