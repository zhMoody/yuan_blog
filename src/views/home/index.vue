<template>
  <div class="content">
    <div class="empty" v-show="!showPagination">
      <NEmpty size="large" description="还没有文章，去创建属于你的第一篇文章吧！">
      </NEmpty>
    </div>
    <div v-for="item in articleList.list" :key="item._id"
         @click="gotoDetail(item._id)"
         :class="`section wow animate__animated animate__backInUp`"
         data-wow-duration="0.6s" data-wow-offset="1" data-wow-iteration="1">
      <div class="card">
        <div class="card-img">
          <img v-lazy="item.cover"/>
        </div>
        <div class="titleInfo">
          <div class="title">{{ item.title }}</div>
          <div class="description">
            <span>{{ item.description }}</span>
          </div>
          <div class="divider">
            <n-divider/>
          </div>
          <div class="info">
            <!--            HappyOutline-->
            <div class="name">
              <Icon size="16">
                <PersonOutline></PersonOutline>
              </Icon>
              {{ item.author }}
            </div>
            <div class="time">
              <Icon size="16">
                <TimeOutline></TimeOutline>
              </Icon>
              {{ formatTime(item.created) }}
            </div>
            <div class="see">
              <Icon size="16">
                <EyeOutline></EyeOutline>
              </Icon>
              {{ item.browse }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pages" v-if="showPagination">
      <n-pagination :prev="nextPage" v-model:page="pagen" v-model:page-size="pages"
                    :page-count="Math.ceil(tootal/pages)"/>
    </div>
  </div>

</template>
<script lang='ts' setup>
import {NPagination, PaginationInfo, NEmpty, NDivider, NAvatar} from 'naive-ui'
import {PersonOutline, TimeOutline, EyeOutline} from '@vicons/ionicons5'
import {Icon} from "@vicons/utils/lib";
import {onMounted, reactive, ref, computed} from 'vue';
import WOW from "wow.js";
import {getArticleList} from "@/api/article";
import dayjs from 'dayjs'
import {useRouter} from "vue-router";

type Data = {
  pagesize: number
  pagenum: number
}
const router = useRouter()
const articleList = reactive<any>({list: []})
const pages = ref<number>(6)
const pagen = ref<number>(1)
const tootal = ref<number>(0)
const showPagination = ref(false)
const nextPage = (info: PaginationInfo) => {
  let data = {
    pagesize: info.pageSize,
    pagenum: info.page
  }
  getList(data)
}
const gotoDetail = (id) => {
  router.push(`/article/${id}`)
}
const formatTime = computed((item) => () => {
  return dayjs(item).format('YYYY-MM-DD')
})

const getList = async (data: Data) => {
  try {
    const res = await getArticleList(data)
    tootal.value = +res.data.tootal
    pagen.value = +res.data.pagenum
    pages.value = +res.data.pagesize
    console.log(3, tootal.value)
    articleList.list = res.data.result
    if (articleList.list.length) showPagination.value = true
    document.documentElement.scrollTop = 0
  } catch (err) {
    console.log(err)
    showPagination.value = false
  }
}
onMounted(async () => {
  let data = {
    pagenum: pagen.value,
    pagesize: pages.value
  }
  await getList(data)

  let wow = new WOW({
    boxClass: "wow",
    animateClass: "animated",
    offset: 0,
    mobile: true,
    live: true,
    callback: function () {
    },
    scrollContainer: false,
    resetAnimation: true,
  })
  wow.init()
})

</script>
<style scoped lang="less">
:deep(.n-pagination .n-pagination-item.n-pagination-item--button) {
  background: transparent;
  border: #fffccc;
}

.content {
  width: 100%;
  min-height: calc(100vh - 120px);
  overflow: hidden;
  border-radius: 2px;
  backdrop-filter: var(--c-base-blur);
  padding: 20px;
  box-shadow: rgba(182, 182, 186, 0.25) 0px 50px 100px -20px, rgba(197, 192, 192, 0.3) 0px 30px 60px -30px, rgba(155, 159, 164, 0.35) 0px -2px 6px 0px inset;

  .card {
    height: 230px;
    margin-bottom: 20px;
    padding: 3px;
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 10px;
    border-radius: 10px;
    transition: all .5s;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px 0, rgba(0, 0, 0, 0.1) 0 0 1px 0;
    cursor: url('@/assets/link.cur'), pointer;

    &:hover {
      transform: translateY(-10px);
      box-shadow: #87b1ad62 0 5px 15px;
    }


    &:hover img {
      transform: rotate(8deg) scale(1.1);
    }

    .card-img {
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

      img {
        width: 150%;
        height: 150%;
        transition: all .5s;
        opacity: .8;
      }
    }


    .titleInfo {
      .title {
        font-size: 20px;
        color: var(--c-text-666);
        text-align: left;
        padding: 20px 20px 0 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }


      .description {
        height: 130px;
        padding: 20px 40px;

        span {
          text-align: left;
          font-size: 12px;
          color: var(--c-text-777);
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 3;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
      }

      .divider {
        padding-right: 10px;
        padding-bottom: 10px;

        :deep(.n-divider:not(.n-divider--dashed) .n-divider__line) {
          background: var(--c-divider);
        }

        :deep(.n-divider:not(.n-divider--vertical)) {
          margin: 0;
        }
      }

      .info {
        display: flex;
        align-items: center;
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
    }
  }


  .pages {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: sticky;
    bottom: 0;
  }

  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 120px);
  }

  .icon {
    width: 5em;
    height: 5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
