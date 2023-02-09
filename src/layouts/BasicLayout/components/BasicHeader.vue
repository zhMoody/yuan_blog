<template>
  <header class="header">
    <div class="blog-left">
      <Icon size='22'>
        <HomeOutline tag="span"/>
      </Icon>
      <span>烟花春晓</span>
    </div>
    <div class="blog-center">
      <div class="blog-center-search">
        <div class="search">
          <input type="text" class="ipt" placeholder="输入关键字搜索。。。">
          <button class="btn">
            <Icon size='16' color="#666">
              <Search tag="span"></Search>
            </Icon>
          </button>
        </div>
      </div>
    </div>
    <div class="blog-right">
      <MusicPlayer :showMusicBox="showMusicBox" @getValue="showBox"></MusicPlayer>
      <div class="login-container" @click.self="showBox('login')">
        <Icon v-if="!store.userInfo.token" size="24" color="#666" @click="showBox('login')">
          <PersonCircleOutline></PersonCircleOutline>
        </Icon>
        <span style="margin-right: 5px;font-size: 16px;color: #666" @click="showBox('login')">{{
            store.userInfo.nickname
          }}</span>
        <Icon size="12" color="#666" @click="showBox('login')">
          <CaretDown tag="span"></CaretDown>
        </Icon>
        <div class="avatar">
          <NAvatar
            @click="showBox('login')"
            v-if="store.userInfo.token"
            round
            :size="40"
            :src="store.userInfo.avatar"
            fallback-src="https://s1.ax1x.com/2020/07/25/UzAaMq.jpg"
          />
          <span v-if="store.userInfo.token" class="spa"></span>
        </div>
        <div v-if="showLoginInputBox" class="login-posa wow animate__animated animate__fadeIn">
          <n-form
            ref="formRef"
            :model="formValue"
            :rules="rules"
            v-if="!store.userInfo.token"
          >
            <n-form-item label="用户名" path="user.nickname">
              <n-input v-model:value="formValue.nickname" placeholder="用户名"/>
            </n-form-item>
            <n-form-item label="密码" path="user.password" style="margin-bottom: 10px">
              <n-input v-model:value="formValue.password" placeholder="密码"/>
            </n-form-item>
            <n-button block type="info" @click="handleValidateClick">
              登录
            </n-button>
          </n-form>
          <div v-if="store.userInfo.token" @click.self="logoutBlog">退出登录</div>
        </div>
      </div>

    </div>
  </header>

</template>
<script setup lang='ts'>
import {onMounted, ref} from "vue";
import {NInput, FormInst, useMessage, NForm, NFormItem, NButton, NAvatar} from 'naive-ui'
import MusicPlayer from '@/components/musicPlay/index.vue'
import {HomeOutline, Search, PersonCircleOutline, CaretDown} from '@vicons/ionicons5'
import useUserStore from "@/stores/useUser";
import {Icon} from '@vicons/utils'
import WOW from "wow.js";

const store = useUserStore()
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const showLoginInputBox = ref<boolean>(false)
const showMusicBox = ref<boolean>(false)
const formValue = ref<{ nickname: string, password: string }>({
  nickname: 'admin',
  password: 'Aa2597758'
})
let rules = {
  nickname: {
    required: true,
    message: '请输入姓名',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入年龄',
    trigger: ['input', 'blur']
  }
}
const logoutBlog = () => {
  store.logout()
}
const showBox = (keyword: string) => {
  console.log(showLoginInputBox.value, showMusicBox.value)
  switch (keyword) {
    case 'login':
      showMusicBox.value = false
      return showLoginInputBox.value = !showLoginInputBox.value
    case 'music':
      showLoginInputBox.value = false
      return showMusicBox.value = !showMusicBox.value
    default:
      return false
  }
}
const handleValidateClick = () => {
  if (!formValue.value.nickname.trim()) {
    message.warning('必须填写用户名')
  } else if (!formValue.value.password.trim()) {
    message.warning('必须填写密码')
  } else {
    store.login(formValue.value)
    showLoginInputBox.value = false
  }
}

onMounted(() => {
  console.log(store.userInfo)

  let wow = new WOW({
    boxClass: "wow",
    animateClass: "animated",
    offset: 0,
    mobile: true,
    live: true,
    callback: function (box) {
    },
    scrollContainer: null,
    resetAnimation: true,
  })
  wow.init()
})
</script>

<style scoped lang="less">


:deep(.n-form-item .n-form-item-feedback-wrapper) {
  min-height: 10px !important;
}

.header {
  width: 100%;
  height: 50px;
  background-color: #F9F9F930;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  position: sticky;
  top: 0;
  z-index: 990;
  backdrop-filter: blur(50px);
  display: flex;
  justify-content: space-between;
  padding: 0;
  border-radius: 0 0 4px 4px;

  .blog-left {
    //background-color: #000000;
    display: inline-block;
    height: 40px;
    margin-top: 10px;
    line-height: 40px;
    border-radius: 50px;
    padding: 0 20px;
    user-select: none;
    transition: all .3s;
    cursor: url('../../../assets/link.cur'), pointer;

    span {
      font-size: 24px;
      text-align: center;
      transition: all .3s;
      color: #666;
    }

  }

  .blog-center {
    flex: 1;
    margin-left: 120px;
    padding-top: 10px;

    .search {
      width: 200px;
      height: 30px;
      border-radius: 50px;
      overflow: hidden;
      display: flex;
      box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    }

    .ipt {
      width: 160px;
      height: 100%;
      font-size: 14px;
      padding-left: 10px;
      background-color: transparent;
      color: #666;
      transition: background-color .2s;
      border: 1px solid transparent;

      &:hover {
        background-color: #e0e6ed;
      }
    }

    .ipt:focus {
      outline: none;
      border-radius: 50px 0 0 50px;
      box-shadow: #cad6f2 0px 1px 0px, #cad6f2 0px 8px 24px, #cad6f2 0px 16px 48px;
      border: 1px solid #cad6f2;
      background-color: #fff;
    }


    .btn {
      padding: 0 10px;
      flex: 1;
      height: 100%;
      background-color: transparent;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
      line-height: 36px;
      cursor: url('../../../assets/link.cur'), pointer;
      border: 1px solid transparent;

      &:hover {
        background-color: #e0e6ed;
        border-radius: 0 50px 50px 0;
        box-shadow: #cad6f2 0px 3px 3px 0px;
        border: 1px solid #cad6f2;
      }
    }
  }

  .blog-right {
    height: 100%;
    display: flex;
    align-items: center;

    .login-container {
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      user-select: none;
      position: relative;

      .avatar {
        margin-left: 5px;
        transition: all 1s;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        &:hover {
          transform: rotate(360deg);
        }

        .spa {
          position: absolute;
          bottom: 2px;
          right: 1px;
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #12e612;
          border: 2px solid #ffffff;
        }
      }

      .login-posa {
        position: absolute;
        top: 50px;
        right: 0;
        width: 280px;
        height: 210px;
        padding: 15px;
        background-color: var(--80background-color);
        box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
        border-radius: 5px;
      }

      &:hover {
        background-color: rgba(0, 0, 0, .05);
      }
    }

  }

}


</style>
