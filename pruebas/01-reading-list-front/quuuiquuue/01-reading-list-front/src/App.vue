<script setup>
import Pagina from './components/Pagina.vue';
import { ref, onMounted } from 'vue';

const booksData = ref([]);
</script>

<template>
  <main class="px-4 max-w-screen-lg grid m-auto min-h-screen grid-rows-[60px,1fr,60px] gap-4">
    <nav class="flex items-center text-2xl">Libreria</nav>
    <Pagina :books="booksData"></Pagina>
    <footer class="flex items-center justify-center">Hecho por Enrique Contreras Lopez</footer>
  </main>
</template>

<style scoped></style>
