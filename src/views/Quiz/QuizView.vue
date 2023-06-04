<script setup lang="ts">
import { useQuizStore } from '@/views/Quiz/QuizStore';
import type { OptionItem } from '@/views/Quiz/QuizStore';
import OptionView from '@/views/Quiz/OptionView.vue';
import AudioButton from '@/components/AudioButton/AudioButton.vue';

const store = useQuizStore()
if (!store.currentItem) {
  store.fetchQuizzes()
}

function onClick(option: OptionItem) {
  store.$patch((state) => {
    state.wordList[state.currentIndex].answer = option
  })
  setTimeout(() => store.nextQuiz(), 500)
}

</script>

<template>
  <div class="wrapper">
    <div v-if="store.currentItem">
      <header>
        <h1>
          {{ store.currentItem.word }}
        </h1>
        <div class="ipa">{{store.currentItem.capronuncfix}}</div>
        <AudioButton
            :src="`http://xuekuke.com${store.currentItem.mp3url}`"
            :auto-play="true"
        />
      </header>
      <div class="flex justify-center mt-16">
        <div class="bg-gray-50 dark:bg-gray-800 shadow-lg dark:shadow-dark rounded-2xl min-w-80 w-[37rem]">
          <div class="pt-6 pb-2">
            <OptionView
                v-for="option in store.currentItem.options"
                :key="option.id"
                :label="option.chdefprim"
                :value="option"
                :onSelect="onClick"
                :class="{
                  ['bg-green-200']: store.currentItem.answer && option.correct,
                  ['bg-red-200']: !store.currentItem.answer?.correct && store.currentItem.answer?.id == option.id,
                }"
            >
            </OptionView>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <el-steps :space="50" :active="store.currentIndex" finish-status="success">
        <el-step
            v-for="(word, index) in store.wordList"
            :key="word.id"
            :status="word.answer ? (word.answer.correct ? 'success' : 'error') : (index == store.currentIndex ? 'process' : 'wait')"
            @click="() => store.$patch({currentIndex: index})"
        />
      </el-steps>
    </footer>
  </div>
</template>
<style lang="scss">
.wrapper {
  @apply mx-auto;
  @apply flex flex-col h-full;
  @apply justify-around;

  header {
    @apply text-center;
    .ipa {
      @apply my-[8px];
      @apply text-gray-700;
    }
    h1 {
      @apply font-sans font-bold;
      @apply mt-32 md:mt-48 lg:mt-64;
      @apply text-3xl text-gray-800;
    }
  }

  footer {
    @apply mx-auto;
    @apply px-[40px];
  }

  .el-steps {
    flex-wrap: wrap;

    .el-step {
      @apply my-[10px];

      .el-step__icon {
        @apply hover:bg-neutral-200;
      }
    }
  }
}
</style>
