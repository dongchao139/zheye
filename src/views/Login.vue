<template>
<!--  <h2>LOGIN</h2>-->
<!--  <button @click="handleClick" class="btn btn-outline-dark">column 3</button>-->
  <validate-form action="" @form-submit="onSubmitForm">
    <div class="mb-3">
      <label class="form-label" for="validateEmail">邮箱地址</label>
      <validate-input
          id="validateEmail"
          type="email"
          name="email"
          placeholder="清输入邮箱"
          :rules="emailRules"
          v-model="eRef"
      >
      </validate-input>
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
    // const handleClick = function () {
    //   router.push({name: 'column', params: {id: 3}, query: {a: 1}})
    // };
    // v-model绑定默认值
    const eRef = ref('donnchao@outlook.com');
    // 指定验证规则
    const emailRules: RulesProp = [
      {type: 'required', message:'email can not be empty'},
      {type: 'email', message:'email should be valid format'},
    ]
    // 提交时获取信息
    const onSubmitForm = (result: boolean) => {
      console.log(result);
      router.push({name: 'column', params: {id: 3}, query: {a: 1}})
    }
    return {
      // handleClick,
      eRef,
      emailRules,
      onSubmitForm
    }
  }
})
</script>

<style scoped>

</style>