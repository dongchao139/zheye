<template>
  <div>
    <input
      type="text" class="form-control" id="id"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      :class="{ 'is-valid': !inputRef.error,'is-invalid':inputRef.error }"
    />
    <span v-if="inputRef.error" class="invalid-feedback">
      {{inputRef.message}}
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType } from "vue";
const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
interface RuleProp {
  type: "required" | "email";
  message: string;
}
export type RulesProp = RuleProp[];
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    id: String,
    modelValue: String
  },
  setup(props,context) {
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
          }
          if (!passed) {
            inputRef.message = rule.message;
          }
          return passed;
        });
        inputRef.error = !valid;
      }
    };
    return {
      inputRef,
      validateInput,
      updateValue,
    };
  },
});
</script>