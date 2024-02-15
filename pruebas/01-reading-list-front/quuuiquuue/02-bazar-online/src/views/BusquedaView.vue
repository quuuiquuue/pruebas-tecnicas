<template>
  <main>
    <article>
      <header class="flex">
        <div class="flex items-center">
          <img class="h-12 mr-4 logo" :src="caravana" alt="Caravana icon">
        </div>
        <div class="flex items-center ">
          <input v-model="searchQuery" placeholder="Search" type="search"
            class="buscador card">
            <button class="boton_card">Buscar</button>

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

.flex {
  display: flex;
  margin: 10px;
}

.boton {
  margin-top: 40px;
  width: 150px;
  height: 50px;
}

.buscador {
  margin-top: 40px;
  height: 50px;
  width: 500px;
}

/* Estilos para el logo */
.logo {
  height: 120px; /* Puedes ajustar la altura según tus necesidades */
}

/* Estilos para el input de búsqueda */
.search-input {
  margin-left: auto; /* Mueve el input de búsqueda al extremo derecho */
}
.card {
 width: 400px;
 height: 50px;
 border-radius: 20px;
 background: #f5f5f5;
 position: relative;
 margin-left: 20px;
 padding: 1.8rem;
 border: 2px solid #c3c6ce;
 transition: 0.5s ease-out;
 overflow: visible;

}

.boton_card {
 width: 200px;
 height: 20px;
 margin-top: 40px;
 border-radius: 20px;
 background: #f5f5f5;
 position: relative;
 padding: 1.8rem;
 border: 2px solid #c3c6ce;
 transition: 0.5s ease-out;
 overflow: visible;
 text-align: center;
}

.card:hover {
 border-color: #008bf8;
 box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.boton_card:hover {
 border-color: #008bf8;
 box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
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
