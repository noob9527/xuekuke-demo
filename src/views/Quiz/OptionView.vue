<script setup lang="ts">

import type { OptionItem } from '@/views/Quiz/QuizStore';

interface Props {
  onSelect?: (answer: OptionItem) => void
  value: OptionItem
  label: string
}

const props = defineProps<Props>()
</script>

<template>
  <div
      class="bg-gray-100 dark:bg-gray-900 mx-6 h-16 w-auto mb-4 rounded-md flex items-center"
      @click="props.onSelect?.(value)"
  >
  <input
      type="radio"
      name="answer"
      :value="props.value"
      class="ml-5 dark:bg-gray-800"
  />
  <label class="text-gray-700 dark:text-gray-400 text-lg ml-4">
    {{props.label}}
  </label>
  </div>
</template>

<style scoped>

</style>