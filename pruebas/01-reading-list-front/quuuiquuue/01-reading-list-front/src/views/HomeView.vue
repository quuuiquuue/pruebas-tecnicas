<script setup lang="ts">
import Books from '@/components/Books.vue'
import { computed, ref, watch, onMounted } from 'vue'
import type { Ref } from 'vue'
import data from '../books.json'
import type { Book } from '@/types/types'

const books: Book[] = data.library.map((data) => data.book);
const genres: string[] = Array.from(new Set(books.map((book) => book.genre)))


const genre = ref('');
const booksList: Ref<Book[]> = ref<Book[]>(books);
const readList: Ref<Book[]> = ref<Book[]>([]);


const handleChanges = (event: Event) => {
  const target = event.target as HTMLSelectElement
  genre.value = target.value

  if (genre.value === '') {
    booksList.value = books
  } else {
    booksList.value = books.filter((book) => book.genre === genre.value)
  }
}

watch(genre, (newValue) => {
  if (newValue !== '') {
    booksList.value = books.filter((book) => book.genre === newValue)
  } else {
    booksList.value = books
  }
})

const handleChangesPages = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const selectedPages = parseInt(target.value);

  if (!isNaN(selectedPages)) {
    if (genre.value === '') {
      booksList.value = books.filter((book) => book.pages <= selectedPages);
    } else {
      booksList.value = books.filter((book) => book.genre === genre.value && book.pages <= selectedPages);
    }
  } else {
    if (genre.value === '') {
      booksList.value = books;
    } else {
      booksList.value = books.filter((book) => book.genre === genre.value);
    }
  }
}

const handleSearch = (event: Event) => {
  const searchString = (event.target as HTMLInputElement).value.trim().toLowerCase();
  if (searchString === '') {
    if (genre.value === '') {
      booksList.value = books;
    } else {
      booksList.value = books.filter((book) => book.genre === genre.value);
    }
  } else {
    if (genre.value === '') {
      booksList.value = books.filter((book) =>
        book.title.toLowerCase().includes(searchString)
      );
    } else {
      booksList.value = books.filter((book) =>
        book.title.toLowerCase().includes(searchString) && book.genre === genre.value
      );
    }
  }
};


const matches = computed(() => {
  if (genre.value === '') {
    return books
  }
  return books.filter((book) => book.genre === genre.value)
})

const handleBookClick = (bookISBN: string) => {
  const foundBookIndex = readList.value.findIndex((b) => b.ISBN === bookISBN);

  if (foundBookIndex !== -1) {
    // El libro ya está en la lista de lectura, así que lo eliminamos de esa lista y lo añadimos a booksList
    const foundBook = readList.value[foundBookIndex];
    readList.value.splice(foundBookIndex, 1);
    booksList.value.push(foundBook);
  } else {
    // El libro no está en la lista de lectura, así que lo añadimos a readList y lo eliminamos de booksList
    const foundBookIndexInBooksList = booksList.value.findIndex((b) => b.ISBN === bookISBN);
    if (foundBookIndexInBooksList !== -1) {
      const foundBook = booksList.value[foundBookIndexInBooksList];
      booksList.value.splice(foundBookIndexInBooksList, 1);
      readList.value.push(foundBook);
    }
  }

  localStorage.setItem('booksList', JSON.stringify(booksList.value))
  localStorage.setItem('readList', JSON.stringify(readList.value))
}

watch(() => localStorage.getItem('readList'), (newValue) => {
  readList.value = JSON.parse(newValue || '[]')
})

watch(() => localStorage.getItem('booksList'), (newValue) => {
  booksList.value = JSON.parse(newValue || '[]')
})

// Inicializar los datos desde el localStorage al cargar la página
onMounted(() => {
  const storedBooksList = localStorage.getItem('booksList');
  const storedReadList = localStorage.getItem('readList');

  if (storedBooksList) {
    booksList.value = JSON.parse(storedBooksList);
  }

  if (storedReadList) {
    readList.value = JSON.parse(storedReadList);
  }
});


// Escuchar cambios en el LocalStorage en todas las pestañas
window.addEventListener('storage', (event) => {
  if (event.key === 'readList') {
    readList.value = JSON.parse(event.newValue || '[]');
  }
  if (event.key === 'booksList') {
    booksList.value = JSON.parse(event.newValue || '[]');
  }
});
</script>

<template>
  <main class="general">
    <article class="grid gap-4">
    <nav class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl space-x-40 ">
      <input class="rounded-lg px-2" type="text" placeholder=" Buscar por título" @input="handleSearch" />
      <select class="rounded-lg px-2" @change="handleChanges">
        <option value="">Todos</option>
        <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
      </select>
      <select class="rounded-lg px-2" @change="handleChangesPages">
        <option value="">Cualquier número de páginas</option>
        <option value="100">Menos de 100 páginas</option>
        <option value="200">Menos de 200 páginas</option>
        <option value="300">Menos de 300 páginas</option>
        <option value="400">Menos de 400 páginas</option>
        <option value="500">Menos de 500 páginas</option>
        <!-- Agrega más opciones según tus necesidades -->
      </select>
    </nav>
    
    <section class="grid grid-cols-2 gap-10 w-auto overflow-hidden">
      <div class="left">
        <h3 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white">Libros disponibles: {{ booksList.length }}</h3>

        <Books :books="booksList" @book-click="handleBookClick" />
      </div>
      
      <div class="right">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white">Lista de lectura</h1>
        <Books :books="readList" @book-click="handleBookClick" />
      </div>
    </section>
  </article>
  </main>
  
</template>

<style scoped>
.left {
  float: left;
}
.right {
  float: right;
}
</style>