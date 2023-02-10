<template>
  <div class="articleDetail">
    <div class="title">

      <h1 class="title-h1"> {{ articleData.detail.articleDetail?.title }}</h1>
      <div class="info">
        <!--            HappyOutline-->
        <div class="name">
          <Icon size="16">
            <PersonOutline></PersonOutline>
          </Icon>
          {{ articleData.detail.articleDetail?.author }}
        </div>
        <div class="time">
          <Icon size="16">
            <TimeOutline></TimeOutline>
          </Icon>
          {{ formatTime(articleData.detail.articleDetail?.created) }}
        </div>
        <div class="see">
          <Icon size="16">
            <EyeOutline></EyeOutline>
          </Icon>
          {{ articleData.detail.articleDetail?.browse }}
        </div>
      </div>
    </div>
    <div class="content">
      <md-editor
        v-model="content"
        class="hText"
        prettier
        preview-only
        :on-get-catalog="getCatalog"
        themes
      ></md-editor>
    </div>
  </div>
</template>
<script setup lang='ts'>
import {computed, onMounted, reactive, ref} from "vue";
import {PersonOutline, TimeOutline, EyeOutline} from '@vicons/ionicons5'
import {Icon} from "@vicons/utils/lib";
import {useRoute} from "vue-router";
import {getArticleDetail} from "@/api/article";
import MdEditor from 'md-editor-v3';
import dayjs from "dayjs";

const route = useRoute()
const articleData = reactive<any>({
  detail: {}
})
const titleList = ref('Hello Editor!')
const content = ref<string>('')
const formatTime = computed((item) => () => {
  return dayjs(item).format('YYYY-MM-DD')
})
const getCatalog = (list) => {
  console.log(list);
  titleList.value = list;
};
onMounted(async () => {
  const res = await getArticleDetail(route.params.id)
  content.value = res.data.articleDetail.content
  articleData.detail = res.data
  console.log('文章详情', res)
  document.documentElement.scrollTop = 0
})
</script>

<style scoped lang="less">
.articleDetail {
  backdrop-filter: var(--c-base-blur);
  min-height: calc(100vh - 120px);
  box-shadow: rgba(182, 182, 186, 0.25) 0px 50px 100px -20px, rgba(197, 192, 192, 0.3) 0px 30px 60px -30px, rgba(155, 159, 164, 0.35) 0px -2px 6px 0px inset;
}

.title {
  min-height: 120px;
}

.hText {
  background: transparent;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: auto;
  padding: 20px;

}

:deep(pre) {
  white-space: break-spaces;
}

.title {
  padding: 20px;

}

.title-h1 {
  text-align: center;
}

.info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  .name, .time, .see {
    padding-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: var(--c-text-666);
  }
}
</style>
