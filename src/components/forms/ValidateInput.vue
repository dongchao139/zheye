<template>
  <div>
    <!--v-bind="$attrs" 将组件的attributes绑定到input中-->
    <input
      class="form-control"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
      :class="{ 'is-valid': !inputRef.error,'is-invalid':inputRef.error }"
    />
    <span v-if="inputRef.error" class="invalid-feedback">
      {{inputRef.message}}
    </span>
  </div>
</template>
<script lang="ts">
import {defineComponent, inject, onMounted, PropType, reactive} from "vue";
import {emitter} from './ValidateForm.vue';

const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
interface RuleProp {
  type: "required" | "email" | "range";
  message: string;
  min?: number;
  max?: number;
}
export type RulesProp = RuleProp[];
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String
  },
  // 禁用根元素继承attribute.
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || "",
      error: false,
      message: "",
    });
    // 自定义组件中，Vue3使用modelValue属性和update:modelValue事件实现v-model功能
    // vue2的自定义组件中，input[type=text]使用的是:value属性@input事件
      // input[type=checkbox]使用的是:checked属性和@change事件
    const updateValue = (event: KeyboardEvent) => {
      const targetValue = (event.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      context.emit('update:modelValue',targetValue);
    }
    const validateInput = () => {
      if (props.rules) {
        const valid = props.rules.every((rule) => {
          let passed = true;
          if (rule.type === "required") {
            passed = inputRef.val.trim() !== "";
          } else if (rule.type === "email") {
            passed = emailReg.test(inputRef.val);
          } else if (rule.type === "range") {
            if (rule.min) {
              passed = inputRef.val.length >= rule.min;
            }
            if (rule.max) {
              passed = inputRef.val.length <= rule.max;
            }
          }
          if (!passed) {
            inputRef.message = rule.message;
          }
          return passed;
        });
        inputRef.error = !valid;
        return {valid, name: context.attrs.name, value: inputRef.val};
      }
      return {valid:true, name: context.attrs.name, value: inputRef.val};
    };
    validateInput.clearValue = () => {
      inputRef.val = '';
    };
    // 使用全局的emitter对象, 在子组件中初始化时发布事件.
    // 在父组件中监听此事件, 在监听事件拿到子组件的validate函数
    onMounted(() => {
      // 使用随机的formName,区分不同的form实例
      // 并通过provide->inject在子组件中获得此formName
      emitter.emit('form-item-created', {
        value: validateInput,
        formName: inject('formName')
      });
    })
    return {
      inputRef,
      validateInput,
      updateValue,
    };
  },
});
</script>