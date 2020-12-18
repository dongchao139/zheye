<template>
  <validate-form action="" @form-submit="onSubmitForm">
    <div class="mb-3">
      <label for="exampleInputEmail" class="form-label">邮箱地址</label>
      <input type="email" class="form-control"
             v-model="emailRef.val"
             @blur="validateEmail"
             id="exampleInputEmail"
      >
      <div class="form-text form-error" v-if="emailRef.error">
        {{emailRef.message}}
      </div>
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
    <div class="mb-3">
      <label class="form-label" for="validateEmail">邮箱地址</label>
      <validate-input
          id="validateEmail"
          type="email"
          name="email"
          placeholder="清输入邮箱"
          :rules="emailRules"
          v-model="eRef"
          ref="inputRef"
      >
      </validate-input>
      {{eRef}}
    </div>
    <template #submit>
      <span class="btn btn-warning">Submit</span>
    </template>
  </validate-form>
</template>

<script lang="ts">
import { defineComponent,reactive,ref } from 'vue'
import ValidateInput from "../components/forms/ValidateInput.vue";
import ValidateForm from "../components/forms/ValidateForm.vue";
import {RulesProp} from "@/components/forms/ValidateInput.vue";
export default defineComponent({
  name: "FormDemo.vue",
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    });
    const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true;
        emailRef.message = 'Can not be empty'
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true;
        emailRef.message = 'Should be valid email'
      } else {
        emailRef.error = false;
      }
    }
    const emailRules: RulesProp = [
      {type: 'required', message:'email can not be empty'},
      {type: 'email', message:'email should be valid format'},
    ]
    const eRef = ref('donnchao@outlook.com');
    const inputRef = ref<any>();
    const onSubmitForm = (result: boolean) => {
      console.log(result);
      // console.log(inputRef.value.validateInput());
    }
    return {
      emailRef,
      validateEmail,
      emailRules,
      eRef,
      onSubmitForm,
      inputRef
    }
  }
})
</script>

<style scoped>

form {
  text-align: left;
}

.form-error {
  color: red;
}
</style>