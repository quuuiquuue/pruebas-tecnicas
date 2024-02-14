<template>
  <main>
    <h1>{{ searchTerm }}</h1>
    <article>
      <section>
        <div v-for="product in searchResults" :key="product.id">
          <!-- Pasar las props al componente Busqueda -->
          <Busqueda
            :image="product.thumbnail"
            :title="product.title"
            :description="product.description"
            :price="product.price"
            :rating="product.rating"
          />
        </div>
      </section>
    </article>
  </main>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Producto } from '@/types/type'
import Busqueda from '../components/Busqueda.vue'

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

// Llamar a la función de búsqueda al montar el componente
onMounted(() => {
    // Obtener el parámetro 'q' de la URL
    if (route.query.q) {
        searchTerm.value = route.query.q.toString()
        // Realizar la búsqueda inicial al montar el componente
        searchApi()
    }
})
</script>
