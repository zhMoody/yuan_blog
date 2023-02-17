import {defineStore} from "pinia";
import {ref} from "vue";

export default defineStore('useShowLoading', () => {
  const onLoading = ref<boolean>(true)
  const setLoading = (payload: boolean): void => {
    onLoading.value = payload
  }
  return {onLoading, setLoading}
})
