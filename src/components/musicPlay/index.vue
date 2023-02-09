<template>
  <div class="music">
    <div class="player">
      <div class="cover">
        <n-avatar
          :size="40"
          round
          bordered
          :src="options.musicImg"
        />
      </div>
      <div class="switch">
        <div class="songName">{{ options.musicTitle || '没有可播放的歌曲' }}</div>
        <div class="songOption">
          <div class="songOption-icon">
           <span @click="musicPlay('pre')">
              <SvgIcon name="rewind" color="#666"></SvgIcon>
           </span>
            <span @click="musicPlay('play')">
              <SvgIcon :name=" options.play ? 'pause' : 'play'" color="#666"></SvgIcon>
            </span>

            <span @click="musicPlay('next')">
              <SvgIcon name="fast-forward" color="#666"></SvgIcon>
            </span>
            <span>{{ options.currentTime || '00:00' }}</span>
          </div>
          <div class="Progress">
            <div class="onProgress" :style="{width: options.currentProgressTime + '%'}">
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="music-option" @click="showBox('music')">
      <Icon size="24" color="#666">
        <BowlingBallOutline tag="span"></BowlingBallOutline>
      </Icon>
      <div v-if="showMusicBox" class="music-posa wow animate__animated animate__fadeIn"></div>
    </div>
  </div>
  <audio ref="singeBox"></audio>
</template>
<script setup lang='ts'>
import {
  BowlingBallOutline,
} from '@vicons/ionicons5'
import {Icon} from '@vicons/utils'
import {NAvatar} from 'naive-ui'
import {reactive, onMounted, ref, withDefaults} from 'vue'


interface Options {
  flag: boolean,
  isShow: boolean,
  musicPath: string, // mp3链接
  coverPath: string, // 封面
  musicTitle: string, // 当前播放标题
  musicImg: string, //  当前播放封面
  duration: number | string | any, // 音乐总时长
  currentTime: number | string | any, // 当前播放时长
  sliderVal: number, // 这个对接当前时长。
  sliderMin: number,
  sliderMax: number, // 这个对接总时长、
  voiceVal: number, // 当前声音大小。
  voiceMin: number,
  voiceMax: number, // 最大声音。
  index: number, // 当前播放的音乐素质索引
  play: boolean, //播放状态，true为正在播放
  player: {},
  currentProgressTime: number | null
}

interface Props {
  showMusicBox?: boolean,
  list?: any,
}

const emit = defineEmits(["getValue"])
const showBox = (str) => {
  emit("getValue", str)
}

let props = withDefaults(defineProps<Props>(), {
  showMusicBox: false,
  list: [
    {
      id: 0,
      name: "四季予你",  //歌曲名
      url: 'https://hubyo.cn/index.php/action/handsome-meting-api?server=netease&type=url&id=1807537867&auth=cd025028e1d1c9ea84031db721155f7c',
      cover: "https://p3.music.126.net/k5r1GC-erKK4WcDmzyrsIw==/109951165648878421.jpg?param=90y90",		// 歌曲封面
      artist: "程响" // 歌手
    },
    {
      id: 0,
      name: "美好的事可不可以發生在我身上",  //歌曲名
      url: 'https://hubyo.cn/index.php/action/handsome-meting-api?server=netease&type=url&id=1501530173&auth=e19132d1de2a350412df2483cce4bc18',
      cover: "https://p3.music.126.net/8sAQGYvrvOZqvNdB9Heb1Q==/109951166270738744.jpg?param=90y90",		// 歌曲封面
      artist: "康士坦的变化球" // 歌手
    }
  ]
})

let singeBox = ref<HTMLAudioElement | undefined>()//audio对象

const options = reactive<Options>({
  flag: false,
  isShow: false,
  musicPath: "", // mp3链接
  coverPath: "", // 封面
  musicTitle: "", // 当前播放标题
  musicImg: "", //  当前播放封面
  duration: null, // 音乐总时长
  currentTime: null, // 当前播放时长
  currentProgressTime: null,
  sliderVal: 0, // 这个对接当前时长。
  sliderMin: 0,
  sliderMax: 0, // 这个对接总时长、
  voiceVal: 0, // 当前声音大小。
  voiceMin: 0,
  voiceMax: 100, // 最大声音。
  index: 0, // 当前播放的音乐素质索引
  play: false, //播放状态，true为正在播放
  player: {},
})

const musicPlay = (flag) => {
  switch (flag) {
    case "pre":
      if (props.list[options.index - 1]) {
        singeBox.value!.src = options.musicPath + props.list[options.index - 1].url;
        options.index -= 1;
      } else {
        singeBox.value!.src = options.musicPath + props.list[props.list.length - 1].url;
        options.index = props.list.length - 1;
      }
      break;
    case "play":
      options.play = !options.play;
      // 对接控件 同步 列表里的控件
      if (options.player[props.list[options.index].id])
        options.player[props.list[options.index].id].play = options.play;
      // 新的歌曲播放
      if (options.play && !options.player[props.list[options.index].id])
        singeBox.value!.src = options.musicPath + props.list[options.index].url;
      break;
    case "next":
      if (props.list[options.index + 1]) {
        singeBox.value!.src = options.musicPath + props.list[options.index + 1].url;
        options.index += 1;
      } else {
        singeBox.value!.src = options.musicPath + props.list[0].url;
        options.index = 0;
      }
      break;
  }
  if (options.play && !options.player[props.list[options.index].id]) {
    options.player = {};
    options.player[props.list[options.index].id] = {};
    options.player[props.list[options.index].id].play = true;
  } else {
    options.play ? singeBox.value!.play() : singeBox.value!.pause();
  }
}
const init = () => {
  singeBox.value!.src = props.list[0].url;
  // 歌曲链接;
  // 绑定三个触发方法
  // 当时长有变化时触发，由"NaN"变为实际时长也算
  singeBox.value!.ondurationchange = function () {
    console.log("时长发生了变化");
    options.play ? singeBox.value!.play() : singeBox.value!.pause();
    options.sliderMax = singeBox.value!.duration;
    console.log("声音", singeBox.value!.volume * 100);
    options.voiceVal = singeBox.value!.volume * 100;
    updateTime();
  };
  // 当前数据可用是触发
  singeBox.value!.oncanplay = function () {
    options.play ? singeBox.value!.play() : singeBox.value!.pause();
    console.log("已经可以播放了");
  };
  // 播放位置发送改变时触发。
  singeBox.value!.ontimeupdate = function () {
    console.log("播放位置发送了变动");
    console.log(options.sliderVal)

    updateTime();
  };
  // 音频播放完毕
  singeBox.value!.onended = function () {
    musicPlay("next");
    console.log("播放完毕，谢谢收听");
  }; // 音频播放完毕

  // 音频播放完毕
  singeBox.value!.onerror = function () {
    console.log("加载出错！");
  };
}
const updateTime = () => {
  const total = formatTime(singeBox.value!.duration);
  const current = formatTime(singeBox.value!.currentTime);
  options.currentProgressTime = singeBox.value!.currentTime / singeBox.value!.duration * 100
  options.duration = `${total.min}:${total.sec}`;
  options.currentTime = `${current.min}:${current.sec}`;
  // 值为xx.xxxxx 需要取整
  options.sliderVal = Math.floor(singeBox.value!.currentTime);
  options.musicTitle =
    props.list[options.index].name + " - " + props.list[options.index].artist;
  options.musicImg = options.coverPath + props.list[options.index].cover + ".jpg";
}
const formatTime = (time) => {
  // 格式化毫秒，返回String型分秒对象
  // 有可能没获取到，为NaN
  if (!time) return {min: "00", sec: "00"};
  return {
    min: Math.floor(time / 60)
      .toString()
      .padStart(2, "0"),
    sec: Math.floor(time % 60)
      .toString()
      .padStart(2, "0"),
  };
}
onMounted(() => {
  init()
})
</script>
<style scoped lang="less">
.music {
  display: flex;
}

.player {
  width: 215px;
  height: 50px;
  display: flex;

  .songOption-icon {
    height: 16px;
  }

  .Progress {
    width: 160px;
    height: 3px;
    background-color: #f3f2d9;
    margin-top: 9px;
    border-radius: 3px;
    display: none;

    .onProgress {
      width: 30%;
      height: 3px;
      border-radius: 3px;
      background-color: #4f8984;
      position: relative;


      span {
        position: absolute;
        display: inline-block;
        right: -8px;
        top: -5px;
        width: 10px;
        height: 8px;
        border-radius: 3px 3px 0 0;
        background-color: #4f8984;
        z-index: 99999;
      }
    }
  }

  &:hover .Progress {
    display: block;
  }

  .songName {
    width: 121px;
    height: 16px;
    color: var(--c-text-666);
    font-size: 14px;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .cover {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding-top: 5px;
  }

  .switch {
    flex: 1;
    padding-top: 5px;
    padding-left: 15px;

    .songOption-icon {
      display: flex;
      align-items: center;
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666;
    }

    .songOption {
      span:nth-child(1),
      span:nth-child(2),
      span:nth-child(3) {
        margin-right: 7px;
      }
    }
  }
}

.music-option {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  user-select: none;
  position: relative;

  .music-posa {
    position: absolute;
    top: 50px;
    right: 0;
    width: 254px;
    height: 200px;
    border-radius: 5px;
    background-color: var(--80background-color);
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, .05);
  }
}
</style>
