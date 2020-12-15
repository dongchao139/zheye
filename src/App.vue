<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <!-- <column-list :list="list"></column-list> -->
    <form action="">
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
        <input type="password" class="form-control" id="exampleInputPassword">
      </div>
      <div class="mb-3">
        <label class="form-label" for="validateEmail">邮箱地址</label>
        <validate-input :rules="emailRules" :id="validateEmail"></validate-input>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnList,{ColumnProps} from './components/ColumnList.vue';
import GlobalHeader,{UserProps} from './components/GlobalHeader.vue';
import ValidateInput,{RulesProp} from './components/forms/ValidateInput.vue';
const currentUser: UserProps = {
  isLogin: true,
  name: 'Viking-Ship'
}
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
    {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]

export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader,
    ValidateInput,
  },
  setup(){
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
    return {
      list: testData,
      currentUser: currentUser,
      emailRef,
      validateEmail,
      emailRules
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
form{
  text-align: left;
}
.form-error{
  color: red;
}
</style>
