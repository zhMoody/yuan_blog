<template>
  <div class="monitor">
    <div class="box">
      <div style="color: var(--c-text-666);text-align: center;font-size: 30px">文章</div>
      <div class="countBox">
        <n-statistic label="你一共发布了" tabular-nums>
          <n-number-animation ref="numberAnimationInstRef" :from="0" :to="articleTootal"/>
          <template #suffix>
            篇文章
          </template>
        </n-statistic>
      </div>
    </div>
    <div class="box">
      <div style="color: var(--c-text-666);text-align: center;font-size: 30px">分类</div>
      <div class="countBox">
        <n-statistic label="你一共创建了" tabular-nums>
          <n-number-animation ref="numberAnimationInstRef" :from="0" :to="categoryTootal"/>
          <template #suffix>
            个分类
          </template>
        </n-statistic>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import {NStatistic, NNumberAnimation} from 'naive-ui'
import {onMounted, ref} from "vue";
import {getMonitorData} from "@/api";

const articleTootal = ref<number>(0)
const categoryTootal = ref<number>(0)

onMounted(async () => {
  const res = await getMonitorData()
  articleTootal.value = res.data.articleTootal
  categoryTootal.value = res.data.categoryTootal

  console.log(res)
})
</script>

<style lang="less" scoped>
.monitor {
  display: flex;
  gap: 10px;

  .box {
    width: 252px;
    height: 136px;
    background: var(--c-f9f9f930);

    .countBox {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
}
</style>
