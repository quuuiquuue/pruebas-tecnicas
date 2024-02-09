<template>
<article className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] ">
    <div class="tarjeta" v-for="book in books" :key="book.id">
        <div class="contenedor_libro px-2">
            <img className="aspect-[9/14] object-cover" :src="book.cover" :alt="book.title">
            <p>{{ book.title }}</p>
        </div>
    </div>
</article>
</template>
<script setup>

import {defineProps, ref} from 'vue';
import data from '/src/books.json';

const books = data.library.map((data) => data.book)

console.log(data);

const props = defineProps ({
    books: {
    type:Array,
    required:true
    }
});




</script>
<style>
</style>