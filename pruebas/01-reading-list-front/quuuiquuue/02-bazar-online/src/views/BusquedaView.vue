<template>
  <main>
    <article>
      <header class="flex items-center justify-between px-4 py-2 bg-gray-900 text-white">
        <div class="flex items-center">
          <img class="h-12 mr-4" :src="caravana" alt="Caravana icon">
          <h1 class="text-lg font-bold">Bazar Online</h1>
        </div>
        <div class="flex items-center">
          <input v-model="searchQuery" placeholder="Search" type="search"
            class="input h-10 px-4 border-2 border-transparent rounded-md outline-none bg-gray-200 text-gray-800 transition duration-300 ease-in-out">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg">Buscar</button>

        </div>
      </header>
      <h1> Resultado de la busqueda: {{ searchTerm }}</h1>
      <section class="grid">
        <div class="grid" v-for="product in searchResults" :key="product.id">
          <!-- Pasar las props al componente Busqueda -->
          <Busqueda :image="product.thumbnail" :title="product.title" :description="product.description"
            :price="product.price" :rating="product.rating" :id="product.id"/>
        </div>
      </section>
    </article>
  </main>
</template>

<style scoped>
main {
  width: 90%;
  margin: 0 auto;
}
.grid {
  display: flex; /* Utilizamos display flex */
  flex-wrap: wrap; /* Esto permitirá que los elementos se ajusten automáticamente al ancho de la sección */
  justify-content: flex-start; /* Esto alinea los elementos hacia la derecha */
} /* Estilos para el header */


/* Estilos para el logo */
.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 40px; /* Puedes ajustar la altura según tus necesidades */
}

/* Estilos para el input de búsqueda */
.search-input {
  margin-left: auto; /* Mueve el input de búsqueda al extremo derecho */
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
const searchQuery = ref('')

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


/* // Función para realizar la búsqueda y navegar a la vista de resultados
const search = () => {
  if (searchQuery.value.trim() !== ''){
     // Actualizar el término de búsqueda
     searchTerm.value = searchQuery.value.trim();
    // Realizar la búsqueda en la API con el nuevo término
    searchApi();
    // Navegar a la vista de resultados de búsqueda y pasar el texto de búsqueda como parámetro
    route.push({ path: '/search', query: { q: searchQuery.value } })
  }
} */

</script>
