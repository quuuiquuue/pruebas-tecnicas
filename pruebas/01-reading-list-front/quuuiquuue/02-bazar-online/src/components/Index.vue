<template>
    <body class="flex flex-col items-center justify-center container min-h-screen">
        <main class="flex flex-col grow items-center w-full">  
            <div class="felx felx-col gap-8 items-center justify-center grow contenedor">
                <img :src="caravana" alt="Caravana icon" class="img-index">
                <h1 class="text-4xl text-black font-bold mb-4 font-serif">Bazar Online</h1>
                <input v-model="searchQuery" class="mb-4" type="text" placeholder="laptops, smartphones, ...">
                <button @click="search" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg">Buscar</button>
            </div>
    </main>
    </body>
</template>

<script setup lang="ts">
import caravana from '/caravan.gif'
import { useRouter } from 'vue-router'
import { ref } from 'vue';

const route = useRouter()
const searchQuery = ref('')
const search = () => {
    if (searchQuery.value.trim() !== ''){
        // Navegar a la vista de resultados de búsqueda y pasar el texto de búsqueda como parámetro
        route.push({ path: '/search', query: { q: searchQuery.value } })
    }
}
</script>
<style scoped>
.contenedor {
    padding: 10px;
    text-align:center;                                               
} 

.img-index {
    margin-top: 10px;
    width: 20%;
}
h1{
    color: black;
    font-family: "Protest Strike", sans-serif;
    font-weight: 400;
    font-style: normal;
}


</style>
