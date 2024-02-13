<template>
  <div>
    <BookList :books="books" :addToReadingList="addToReadingList" :genres="genres" />
    <ReadingList :readingList="readingList" :removeFromReadingList="removeFromReadingList" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BookList from '@/components/BookList.vue';
import ReadingList from '@/components/ReadingList.vue';
import BookService from '@/services/BookService';

// Obtenemos las variables reactivas desde BookService
const books = BookService.books;
const readingList = BookService.readingList;

// Definimos una lista de géneros (podría obtenerse de una fuente externa)
const genres = ref(['Ficción', 'Fantasía', 'Misterio']);

// Función para agregar un libro a la lista de lectura
const addToReadingList = (book) => {
  BookService.readingList.push(book);
};

// Función para eliminar un libro de la lista de lectura
const removeFromReadingList = (book) => {
  const index = BookService.readingList.indexOf(book);
  if (index !== -1) {
    BookService.readingList.splice(index, 1);
  }
};

</script>

<style>
/* Estilos globales si es necesario */
</style>
