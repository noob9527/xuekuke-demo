<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import SidebarMenuItem from './SideBarMenuItem.vue'
import { MagnifyingGlassIcon, TableCellsIcon } from '@heroicons/vue/20/solid'
import { Cog8ToothIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const route = useRoute()
const currentRouteName = computed(() => route.name)
</script>

<template>
  <nav>
    <ul>
      <SidebarMenuItem
          :active="currentRouteName == 'home'"
          @click="router.push('/home')"
      >
        Home
      </SidebarMenuItem>
      <SidebarMenuItem
          :active="currentRouteName == 'quizzes'"
          @click="router.push('/quizzes')"
      >
        Quizzes
      </SidebarMenuItem>
      <SidebarMenuItem
          :active="currentRouteName == 'about'"
          @click="router.push('/about')"
      >
        <div class="inline-flex justify-center items-center">
          About
        </div>
      </SidebarMenuItem>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  height: 100vh;
}

ul {
  height: 100%;
  margin: 0;
  padding: 0;

  @apply bg-[#2D2D2D];
}
</style>
