<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="grid px-4 gap-4 h-full w-full">
    <header>
      <nav class="border-gray-200 px-4 lg:px-6 py-2.5">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">📖 Biblioteca virtual</span>
        </div>
      </nav>
    </header>
    <section>
      <RouterView />
    </section>
    <footer class="rounded-lg shadow">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto" />
      <span class="block text-sm sm:text-center">© 2023. Enrique Contreras.</span>
    </div>
  </footer>

</main></template>

<style scoped>.gridLibros {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  row-gap: 10px;
  border: 1px solid white;
  padding: 20px;
  border-radius: 10px;
}</style>
