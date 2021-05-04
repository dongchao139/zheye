<template>
  <validate-form action="" @form-submit="onSubmitForm" ref="formRef">
    <div class="mb-3">
      <label class="form-label" for="validateEmail">邮箱地址</label>
      <validate-input
          id="validateEmail"
          type="email"
          name="email"
          placeholder="清输入邮箱"
          :rules="emailRules"
          v-model="eRef"
      ></validate-input>
      {{eRef}}
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword" class="form-label">密码</label>
      <validate-input
          type="password"
          name="password"
          class="form-control"
          id="exampleInputPassword"
          placeholder="清输入密码"
      ></validate-input>
    </div>
    <template #submit>
      <span class="btn btn-warning">Submit</span>
    </template>
  </validate-form>
</template>

<script lang="ts">
import {defineComponent,ref} from 'vue';
import {useRouter} from 'vue-router'
import {useStore} from 'vuex';
import ValidateInput, {RulesProp} from "@/components/forms/ValidateInput.vue";
import ValidateForm from "@/components/forms/ValidateForm.vue";

export default defineComponent({
  name: "Login",
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    // useRouter路由跳转
    const router = useRouter();
    const store = useStore();
    // v-model绑定默认值
    const eRef = ref('donnchao@outlook.com');
    const formRef = ref();
    // 指定验证规则
    const emailRules: RulesProp = [
      {type: 'required', message:'email can not be empty'},
      {type: 'email', message:'email should be valid format'},
    ]
    // 提交时获取信息
    const onSubmitForm = (result: Array<any>) => {
      console.log(result);
      // router.push({name: 'column', params: {id: 3}, query: {a: 1}})
      if (result.every(r => r.valid)) {
        router.push("/")
      } else {
        formRef.value.clearInputs();
      }
      store.commit('login');
    }
    return {
      // handleClick,
      eRef,
      formRef,
      emailRules,
      onSubmitForm
    }
  }
})
</script>

<style scoped>

</style>