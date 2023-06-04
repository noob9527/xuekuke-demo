<script setup lang="ts">
import speakerUrl from './speaker.svg'
import { ref, watch } from 'vue';

const props = defineProps<{
  src?: string
  autoPlay?: boolean
}>()
const audioEleRef = ref<HTMLAudioElement>()
const playing = ref(false)

watch(() => props.src, () => {
  if (props.autoPlay)
    handleClick()
});

async function handleClick() {
  const audioEle = audioEleRef.value
  if (!audioEle) {
    return Promise.resolve()
  }
  playing.value = true

  await audioEle.pause()
  await audioEle.load()
  await audioEle.play()
}
</script>

<template>
  <button
      tabindex="-1"
      :style="{
        background: `no-repeat left / cover url(${speakerUrl})`
      }"
      :class="{
        isActive: playing,
      }"
      @click="handleClick"
  >
    <audio
        ref="audioEleRef"
        @ended="() => playing = false"
        :autoplay="props.autoPlay"
    >
      <source v-if="props.src" :src="props.src">
    </audio>
  </button>
</template>

<style lang="scss" scoped>
button {
  //display: inline-block;
  width: 1.2em;
  height: 1.2em;
  text-decoration: none;
  margin: 0 8px;
  padding: 0;
  line-height: 1;
  //vertical-align: text-bottom;
  vertical-align: middle;
  border: none;
  //background: no-repeat left / cover url(${speaker});
  user-select: none;
  cursor: pointer;

  &:hover, &:focus {
    outline: none;
  }

  &.isActive {
    animation: speaker-playing 1s steps(6) infinite;
  }

  @keyframes speaker-playing {
    from {
      background-position-x: 0;
    }
    70% {
      background-position-x: 100%;
    }
    100% {
      background-position-x: 100%;
    }
  }
}
</style>