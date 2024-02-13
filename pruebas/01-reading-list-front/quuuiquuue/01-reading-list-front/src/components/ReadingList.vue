<template>
    <div>
      <h2>Lista de Lectura</h2>
      <ul>
        <li v-for="book in readingList" :key="book.id">
          {{ book.title }} - {{ book.author }}
          <button @click="removeFromReadingList(book)">Eliminar de lista de lectura</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
    props: ['readingList', 'removeFromReadingList'],
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente si es necesario */
  </style>
  