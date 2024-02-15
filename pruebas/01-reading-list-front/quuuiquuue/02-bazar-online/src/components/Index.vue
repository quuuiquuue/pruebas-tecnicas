<template>
    <body class="flex flex-col items-center justify-center container min-h-screen">
        <main class="flex flex-col grow items-center w-full">  
           <div class="felx felx-col gap-8 items-center justify-center grow contenedor card">
                <img :src="caravana" alt="Caravana icon" class="img-index">
                <h1 class="text-4xl text-black font-bold mb-4 font-serif">Bazar Online</h1>
                <input v-model="searchQuery" class="card" type="text" placeholder="laptops, smartphones, ...">
                <button @click="search" class="card bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg">Buscar</button>
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
    border: 10px solid black;                                     
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

.card {
 width: auto;
 height: auto;
 border-radius: 20px;
 background: #f5f5f5;
 position: relative;
 padding: 1.8rem;
 border: 2px solid #c3c6ce;
 transition: 0.5s ease-out;
 overflow: visible;
}

.card-details {
 color: black;
 height: 100%;
 gap: .5em;
 display: grid;
 place-content: center;
}

.card-button {
 transform: translate(-50%, 125%);
 width: 60%;
 border-radius: 1rem;
 border: none;
 background-color: #008bf8;
 color: #fff;
 font-size: 1rem;
 padding: .5rem 1rem;
 position: absolute;
 left: 50%;
 bottom: 0;
 opacity: 0;
 transition: 0.3s ease-out;
}

.text-body {
 color: rgb(134, 134, 134);
}

/*Text*/
.text-title {
 font-size: 1.5em;
 font-weight: bold;
}

/*Hover*/
.card:hover {
 border-color: #008bf8;
 box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.card:hover .card-button {
 transform: translate(-50%, 50%);
 opacity: 1;
}


</style>
