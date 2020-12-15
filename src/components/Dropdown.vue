<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      class="btn btn-outline-light my-2 dropdown-toggle" href="#"
      @click.prevent="toggleOpen"
      >{{ title }}</a
    >
    <ul class="dropdown-menu" 
      :style="{ display: 'block' }" 
      v-if="isOpen"
      >
      <slot></slot>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref,onMounted, onUnmounted,watch } from "vue";
import useClickOutside from '../scripts/useClickOutside';
export default defineComponent({
  name: "Dropdown",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    const dropdownRef = ref<null | HTMLElement>(null);
    const isClickedOutside = useClickOutside(dropdownRef);
    watch(isClickedOutside, () => {
      if (isOpen.value && isClickedOutside.value) {
        isOpen.value = false;
      }
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    };
  },
});
</script>