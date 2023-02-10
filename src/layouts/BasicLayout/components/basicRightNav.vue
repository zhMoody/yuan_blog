<template>
  <div class="right-nav">
    <div class="menu">
      <div class="menu-header">
        <div class="theme-switcher">
          <input type="radio" name="activePage" id="newArticle-page">
          <label for="newArticle-page" @click="getNewPage('newArticle-page')">
            <Icon size="25">
              <HappyOutline></HappyOutline>
            </Icon>
          </label>
          <input type="radio" name="activePage" id="mostViewed-page">
          <label for="mostViewed-page" @click="getNewPage('mostViewed-page')">
            <Icon size="25">
              <HeartOutline></HeartOutline>
            </Icon>
          </label>
          <input type="radio" name="activePage" id="recommend-page">
          <label for="recommend-page" @click="getNewPage('recommend-page')">
            <Icon size="25">
              <GiftOutline></GiftOutline>
            </Icon>
          </label>
          <span class="slider"></span>
        </div>
      </div>
    </div>
    <div class="divider">
      <NDivider></NDivider>
    </div>
    <div>
      <div class="title">{{ res }}</div>
    </div>
  </div>

</template>
<script lang="ts" setup>
import {GiftOutline, HeartOutline, HappyOutline} from '@vicons/ionicons5'
import {Icon} from "@vicons/utils/lib";
import {NDivider} from 'naive-ui'
import {ref, watchEffect} from 'vue'

const res = ref('热门文章')
const nowPage = ref<string>('newArticle-page')
const getNewPage = (key) => {
  nowPage.value = key
}
watchEffect(() => {
  switch (nowPage.value) {
    case 'newArticle-page':
      return res.value = '最新文章'
    case 'mostViewed-page':
      return res.value = '最多浏览'
    case 'recommend-page':
      res.value = '文章推荐'
  }
})
</script>
<style lang="less" scoped>
.right-nav {
  position: relative;
}

.menu {
  border-radius: 15px;
}

.menu-header {
  padding: 1rem;
}


.menu-header .theme-switcher {
  position: relative;
  border-radius: 10px;
  display: flex;
  padding: 0 3px;
}

.theme-switcher input {
  display: none;
}

.theme-switcher label {
  position: relative;
  display: flex;
  z-index: 2;
  padding: 8px 0;
  width: calc(100% / 3);
  color: var(--c-text-secondary);
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
}

.theme-switcher label span {
  display: flex;
  justify-content: center;
  font-weight: 600;
  opacity: 0.8;

}

.theme-switcher .slider {
  position: absolute;
  z-index: 1;
  width: calc((100% - 110px) / 3);
  height: 3px;
  left: 20px;
  bottom: -6px;
  transform: translateX(0);
  border-radius: 8px;
  transition: .3s ease, transform .25s ease-out;
  background: #0acf97;
}

.theme-switcher input:nth-of-type(1):checked ~ .slider {
  transform: translateX(0);
}

.theme-switcher input:nth-of-type(2):checked ~ .slider {
  transform: translateX(190%);
}

.theme-switcher input:nth-of-type(3):checked ~ .slider {
  transform: translateX(380%);
}

.divider {
  padding-bottom: 10px;

  :deep(.n-divider:not(.n-divider--dashed) .n-divider__line) {
    background: var(--c-divider);
  }

  :deep(.n-divider:not(.n-divider--vertical)) {
    margin: 0;
  }
}
</style>
