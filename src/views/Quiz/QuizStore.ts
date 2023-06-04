import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from 'axios';
import { sampleSize } from 'lodash-es';

export interface WordItem {
  id: number
  word: string
  mp3url: string
  chdefprim: string
  capronuncfix: string | undefined
  options: OptionItem[]
  answer?: OptionItem
}

export interface OptionItem {
  id: number
  chdefprim: string
  correct?: boolean
}

export const useQuizStore = defineStore('quiz', () => {
  const wordList = ref<WordItem[]>([])
  const optionList = ref<OptionItem[]>([])
  const currentIndex = ref(0)
  const currentItem = computed(() => wordList.value[currentIndex.value])
  const finished = computed(() => wordList.value.length
    && currentIndex.value == wordList.value.length - 1)

  async function fetchQuizzes() {
    const data = 'wd_count=0&learn_type_opt=neep&quiz_level_opt=1&my_from_val=2000&my_to_val=4000&explain_opt=ch_word_3opt_mixb&sr_period_opt=20000&skiprequiz_opt=quized1_unquiz&special_opts=quiz_any%2Cpos_any%2Cscp_excl_nothing%2Cfletter__*&qust_num_opt=max_50&qzlog_startdate=&selfcklog_starttime=';

    // const config = {
    //   method: 'post',
    //   url: 'http://xuekuke.com/api_v1/english_words_quiz/',
    //   data: data
    // };

    const res = await axios.post<{
      word_list: WordItem[],
      option_list: OptionItem[],
    }>('http://xuekuke.com/api_v1/english_words_quiz/', data)

    const words = shuffle(res.data.word_list)
    const options = res.data.option_list
    words.forEach(word => {
      word.options = [
        { id: word.id, chdefprim: word.chdefprim, correct: true },
        ...sampleSize(options.filter(e => e.id != word.id), 3)
      ]
    })
    wordList.value = words
    optionList.value = options
  }

  function nextQuiz() {
    currentIndex.value ++
  }

  return {
    wordList,
    finished,
    fetchQuizzes,
    currentIndex,
    currentItem,
    nextQuiz,
  }
})

/**
 * Fisher Yates shuffle
 */
function shuffle<T>(arr: T[]): T[] {
  const res = [...arr];
  for (let i = res.length; i > 0;) {
    const j = Math.trunc(Math.random() * i--);
    [res[j], res[i]] = [res[i], res[j]];
  }
  return res
}
