<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>
<script lang="ts">
import {defineComponent,onUnmounted,provide} from 'vue';
import {v4 as uuidv4} from 'uuid';
import mitt from 'mitt';
export const emitter = mitt();
interface ValidateFunc {
  (): { valid: boolean; name: string; value: string };
}
interface ClearInput {
  (): void;
}
interface CallbackProps {
  formName: string;
  value: ValidateFunc;
  clear: ClearInput;
}
export default defineComponent({
  emits: ['form-submit'],
  setup(props, context) {
    // 使用随机的formName,区分不同的form实例
    // 并通过provide->inject在子组件中获得此formName
    const randomName = uuidv4();
    provide('formName', randomName);
    let funcArr: Set<ValidateFunc> = new Set<ValidateFunc>(); // 验证函数的数组
    const clearFuncArr: Set<ClearInput> = new Set<ClearInput>();
    // 使用全局的emitter对象, 在子组件中初始化时发布事件.
    // 在父组件中监听此事件, 在监听事件拿到子组件的validate函数
    const callback = (func?: CallbackProps) => {
      if (func && func.formName === randomName) {
        funcArr.add(func.value);
        clearFuncArr.add(func.clear);
      }
    }
    emitter.on('form-item-created', callback);
    onUnmounted(() => {
      emitter.off('form-item-created', callback);
      funcArr = new Set<ValidateFunc>();
    });
    const submitForm = () => {
      const result: Array<any> = [];
      // 通过子组件的validate函数获取验证结果和输入的值
      funcArr.forEach(func => result.push(func()));
      context.emit('form-submit', result);
    };
    const clearInputs = () => {
      clearFuncArr.forEach(cf => cf());
    }
    return {
      submitForm,
      clearInputs
    }
  }
})
</script>
