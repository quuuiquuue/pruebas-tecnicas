// src/services/BookService.js

import { ref } from 'vue';

// Creamos variables reactivas para almacenar los datos de los libros y la lista de lectura
const books = ref([]);
const readingList = ref([]);

// Exportamos las variables para que estén disponibles en otros componentes
export default {
  books,
  readingList,
};
