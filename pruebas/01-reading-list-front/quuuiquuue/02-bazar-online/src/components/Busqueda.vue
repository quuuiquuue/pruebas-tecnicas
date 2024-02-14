<template>
    <main class="flex flex-col items-center justify-top h-screen m-4">
        <section class="flex">
            <img class="h-12 mr-4" :src="caravana" alt="Caravana icon">
            <div class="flex items-center leading-7 relative max-w-190">
                <input placeholder="Search" type="search"
                    class="input w-full h-10 leading-10 px-4 pl-10 border-2 border-transparent rounded-md outline-none bg-gray-200 text-gray-800 transition duration-300 ease-in-out">
            </div>
        </section>
        <section>
            <p>Resultados de búsqueda de {{ searchTerm }}</p>
            <!-- Mostrar los resultados de la búsqueda -->
            <div v-if="searchResults.length > 0">
                <ul>
                    <li v-for="result in searchResults" :key="result.id">
                        <!-- Muestra aquí los datos de cada resultado -->
                        <p>{{ result.name }}</p>
                        <p>{{ result.description }}</p>
                        <!-- Agrega más campos según la estructura de tus datos -->
                    </li>
                </ul>
            </div>
            <div v-else>
                No se encontraron resultados.
            </div>
        </section>

    </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import caravana from '/caravan.gif'
import { useRoute } from 'vue-router'
import type {Producto} from '@/types/type'

const route = useRoute()
const searchTerm = ref('')
const searchResults = ref([])

// Obtener el parámetro 'q' de la URL
if (route.query.q) {
    searchTerm.value = route.query.q.toString()
}

// Función para realizar la búsqueda en la API
async function searchApi() {
    try {
        // Realizar la solicitud a la API con el término de búsqueda
        const response = await fetch(`https://api-productos-88jl.onrender.com?q=${searchTerm.value}`)
        const data = await response.json()
        // Actualizar los resultados de la búsqueda
        searchResults.value = data.results
    } catch (error) {
        console.error('Error al buscar en la API:', error)
    }
}

// Observar cambios en el término de búsqueda y llamar a la función de búsqueda
watch(searchTerm, () => {
    searchApi()
});
</script>

<style focus>
.input::placeholder {
    color: #9e9ea7;
}

.input:focus,
.input:hover {
    outline: none;
    border-color: rgba(234, 76, 137, 0.4);
    background-color: #fff;
    box-shadow: 0 0 0 4px rgba(234, 76, 137, 0.1);
}

body {
    background-color: white;
}

p{
    color: black;
}
</style>