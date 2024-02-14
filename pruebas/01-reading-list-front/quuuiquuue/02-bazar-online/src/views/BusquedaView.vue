<script setup lang="ts">
import Busqueda from '../components/Busqueda.vue'
import { ref, watch } from 'vue'
import caravana from '/caravan.gif'
import { useRoute } from 'vue-router'
import type {Producto} from '@/types/type'

const route = useRoute()
const searchTerm = ref('')
const searchResults = ref<Producto[]>([])

// Obtener el parámetro 'q' de la URL
if (route.query.q) {
    searchTerm.value = route.query.q.toString()
}

// Función para realizar la búsqueda en la API
async function searchApi() {
    try {
        // Realizar la solicitud a la API con el término de búsqueda
        const response = await fetch(`https://api-productos-88jl.onrender.com/products/items?q=${searchTerm.value}`)
        const data = await response.json()
        console.log(data);
        
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

<template>
  <main>
    <Busqueda/>
  </main>
</template>