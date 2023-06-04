<script setup lang="ts">
withDefaults(defineProps<{ active: boolean }>(), {
  active: false,
})
</script>

<template>
  <li :class="{ active }">
    <slot></slot>
  </li>
</template>

<style scoped>
li {
  padding: 10px;
  cursor: pointer;

  @apply bg-[#2D2D2D];
  @apply text-neutral-400;
  @apply hover:text-neutral-50 hover:border-neutral-50;
  @apply border-l-2 border-[#2D2D2D];
}

li.active {
  @apply text-neutral-50 border-neutral-50;
}

</style>