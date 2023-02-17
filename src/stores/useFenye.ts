import {defineStore} from 'pinia';
import {ref} from "vue"


interface T {
  pagesize: number,
  pagenum: number,
  tootal: number
}

const defaultData = {
  pagesize: 6,
  pagenum: 1,
  tootal: 0
};

export default defineStore('useFenye', () => {
  // @ts-ignore
  const fenye = ref<T>(defaultData)

  const setFenye = (payload) => {
    fenye.value = payload
  }
  return {fenye, setFenye}
}, {
  persist: true
})
