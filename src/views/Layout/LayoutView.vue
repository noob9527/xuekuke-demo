<script setup lang="ts">
import Sidebar from './SideBar/SideBar.vue'
</script>

<template>
  <div class="flex w-full">
    <Sidebar />
    <main class="flex-1">
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style scoped>
</style>