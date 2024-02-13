<template>
    <div>
      <h2>Libros Disponibles</h2>
      <ul>
        <li v-for="book in filteredBooks" :key="book.id">
          {{ book.title }} - {{ book.author }}
          <button @click="addToReadingList(book)">Agregar a lista de lectura</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['books', 'addToReadingList', 'genres'],
    computed: {
      filteredBooks() {
        // Filtrar libros por género si se ha seleccionado un género
        if (this.selectedGenre) {
          return this.books.filter(book => book.genre === this.selectedGenre);
        }
        return this.books;
      }
    },
    data() {
      return {
        selectedGenre: null
      };
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente si es necesario */
  </style>
  