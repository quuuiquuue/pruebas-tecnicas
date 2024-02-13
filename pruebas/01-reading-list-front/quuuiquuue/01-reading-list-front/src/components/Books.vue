<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Book } from '@/types/types';

const props = defineProps<{
  books: Book[];
}>();

const emit = defineEmits(['book-click']);
const handleBookClick = (book: string) => {
  emit('book-click', book);
}
</script>

<template>
    
    <article class="">
        <ul class="gridImagenes">
            <li v-for="book in books" :key="book.ISBN" class="grid gap-2" @click="handleBookClick(book.ISBN)">
                <img class="libros" :src="book.cover" :alt="book.title">
                <p>
                    {{ book.title }}
                </p>
            </li>
        </ul>
    </article>
</template>

<style>
.gridImagenes{
    display: grid;
    grid-template-columns: repeat(4,1fr);
    column-gap: 10px;
    row-gap: 10px;
    border: 1px solid white;
    padding: 20px;
    border-radius: 10px;
}

.gridImagenes li{
    display: grid;
    grid-template-columns: repeat(1,2fr);
    column-gap: 10px;
    row-gap: 10px;
    border: 1px solid white;
    padding: 15px;
    border-radius: 10px;
}
.libros{
    width: 250px;
    height: 200px;
}
</style>