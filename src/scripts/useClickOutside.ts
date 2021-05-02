import { ref, onMounted, onUnmounted, Ref, WatchCallback } from 'vue';

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickedOutside = ref(false);
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      isClickedOutside.value = !elementRef.value.contains(e.target as HTMLElement);
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler);
  });
  onUnmounted(() => {
    document.removeEventListener('click', handler);
  });
  return isClickedOutside;
}

export const useClickOutside1 = (elementRef: Ref<null | HTMLElement>,
                                 handlerFun: (isClickedOutside: boolean) => void) => {
  const handler = (e: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(e.target as HTMLElement)) {
      handlerFun(true);
    } else {
      handlerFun(false);
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler);
  });
  onUnmounted(() => {
    document.removeEventListener('click', handler);
  });
}

export default useClickOutside;