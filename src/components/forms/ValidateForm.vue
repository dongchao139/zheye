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
// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import mitt from 'mitt';
export const emitter = mitt();
export default defineComponent({
  emits: ['form-submit'],
  setup(props, context) {
    const submitForm = () => {
      context.emit('form-submit', true);
    }
    // 使用随机的formName,区分不同的form实例
    // 并通过provide->inject在子组件中获得此formName
    const randomName = uuidv4();
    provide('formName', randomName);
    // 使用全局的emitter对象, 在子组件中初始化时发布事件.
    // 在父组件中监听此事件, 在监听事件拿到子组件的validate函数
    const callback = (test: any) => {
      if (test && test.formName === randomName) {
        console.log("test.value=" + test.value);
      }
    }
    emitter.on('form-item-created', callback);
    onUnmounted(() => {
      emitter.off('form-item-created', callback);
    })
    return {
      submitForm
    }
  }
})
</script>
