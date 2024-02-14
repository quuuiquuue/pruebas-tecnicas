<template>
  <main>
    <article>
      <section class="flex">
            <img class="h-12 mr-4" :src="caravana" alt="Caravana icon">
            <div class="flex items-center leading-7 relative max-w-190">
                <input placeholder="Search" type="search"
                    class="input w-full h-10 leading-10 px-4 pl-10 border-2 border-transparent rounded-md outline-none bg-gray-200 text-gray-800 transition duration-300 ease-in-out">
            </div>
      </section>
      <h1> Resultado de la busqueda: {{ searchTerm }}</h1>
      <section>
        <div class="grid" v-for="product in searchResults" :key="product.id">
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

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
}
</style>

<script setup lang="ts">
import caravana from '/caravan.gif'
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Producto } from '@/types/type'
import Busqueda from '@/components/Busqueda.vue'

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
        searchResults.value = data.items;
        console.log(searchResults.value);
        
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
