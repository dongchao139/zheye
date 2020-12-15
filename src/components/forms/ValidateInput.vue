<template>
  <div>
    <input
      type="text"
      class="form-control"
      v-model="inputRef.val"
      @blur="validateInput"
      id="id"
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
  },
  setup(props) {
    const inputRef = reactive({
      val: "",
      error: false,
      message: "",
    });
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
    };
  },
});
</script>