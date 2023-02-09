import {defineStore} from 'pinia';
import {ref} from "vue"
import {IResult as UaResult} from "ua-parser-js";
import {getUserInfo, onLogin} from "@/api";
import storage from "store";
import {useRouter} from "vue-router";

export interface UserState {
  userInfo: UserInfo;
  ua: UaResult;
}

export interface UserInfo {
  id: string;
  token: string;
  nickname?: string;
  avatar?: string;
  _id?: string
}

const defaultUserInfo = {
  id: '',
  token: '',
  nickname: '',
  avatar: '',
  _id: ''
};
export default defineStore('useUserStore', () => {
  const router = useRouter()
  const userInfo = ref<UserInfo>(defaultUserInfo)
  const login = async (payload) => {
    let data = payload
    try {
      const res = await onLogin(data)
      storage.set('ACCESS_TOKEN', res.data.token)
      const userinfo = await getUserInfo()
      console.log(12333, userinfo.data)
      userInfo.value = {...userInfo.value, id: userinfo.data._id, token: res.data.token, ...userinfo.data}
      delete userInfo.value._id
    } catch (err) {
      console.log(err)
    }
  }
  const logout = () => {
    userInfo.value = defaultUserInfo
    storage.clearAll()
  }

  return {userInfo, login, logout}
}, {
  persist: true
})
