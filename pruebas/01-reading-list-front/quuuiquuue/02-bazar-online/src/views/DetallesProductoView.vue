<template>
  <main>
    <header class="flex items-center justify-between px-4 py-2 bg-gray-900 text-white">
        <div class="flex items-center">
          <img class="h-12 mr-4" :src="caravana" alt="Caravana icon">
          <h1 class="text-lg font-bold">Bazar Online</h1>
        </div>
        <div class="flex items-center">
          <input placeholder="Search" type="search"
            class="input h-10 px-4 border-2 border-transparent rounded-md outline-none bg-gray-200 text-gray-800 transition duration-300 ease-in-out">
        </div>
      </header>
    <div class="card" v-if="producto">
        <div class="imagenes card__img">
            <img v-for="(imagen, index) in producto.images" :key="index" :src="imagen" :alt="'Imagen ' + (index + 1)">
        </div>
      <div class="">
        <h2 class="card__title">{{ producto.title }}</h2>
        <p class="card__subtitle">{{ producto.description }}</p>
        <p>{{ producto.price }}€</p>
        <p>Rating: {{ producto.rating }}</p>
        <p>Brand: {{ producto.brand }}</p>
        <p>Category: {{ producto.category }}</p>
        <button class="card__btn card__btn-solid" @click="agregarAlCarrito"><span class="carrito">🛒</span></button>
      </div>
    </div>
    <div v-else>
      <p>Cargando...</p>
    </div>
  </main>
  </template>

  <script setup lang="ts">
import caravana from '/caravan.gif'
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import type {Producto} from '@/types/type'

    const route = useRoute();
    const producto = ref<Producto>(); // Ajusta el tipo según la estructura de tus productos

    onMounted(async () => {
      const productId = Number(route.params.id); // Obtener la ID del producto desde la ruta
      try {
        const response = await fetch(`https://api-productos-fazq.onrender.com/productos/${productId}`);
        if (!response.ok) {
          throw new Error('No se pudo cargar la información del producto');
        }
        producto.value = await response.json();
      } catch (error) {
        console.error('Error al cargar la información del producto:', error);
      }
    });

    const agregarAlCarrito = () => {
    // Implementa la lógica para agregar el producto al carrito aquí
  };
  </script>

<style scoped>
main {
  width: 90%;
  margin: 0 auto;
}
.imagenes {
    display: grid;
    grid-template-columns: auto auto auto;
    
  }

  .imagenes img {
    width: 150px;
    height: auto;
  }
  .imagenes img:nth-child(1) {
    padding-left: 10px;
    width: 400px;
    height: auto;
  }
  .imagenes img:nth-child(2) {
    display: none;
  }
  .imagenes img:nth-child(3) {
    width: 220px;
    height: 210px;
    margin-left: 10px;
  }
  .imagenes img:nth-child(4) {
    display: none;
  }
  .imagenes img:nth-child(5) {
    display: none;
  }

  .carrito {
    font-size: 17px;
    text-align: center;
  }

  .card {
  --main-color: #000;
  --submain-color: #78858F;
  --bg-color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  position: relative;
  width: 700px; /* Ancho ajustado automáticamente */
  height: auto; /* Alto ajustado automáticamente */
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background: var(--bg-color);
  border: 5px solid black;
  padding: 10px;
  margin: 10px;

}

.card__img {
  height: 100%;
  width: 100%;
}

.card__img svg {
  height: 100%;
  border-radius: 20px 20px 0 0;
}

.card__avatar {
  position: absolute;
  width: 114px;
  height: 114px;
  background: var(--bg-color);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: calc(50% - 57px);
}

.card__avatar svg {
  width: 100px;
  height: 100px;
}

.card__title {
  margin-top: 60px;
  font-weight: 500;
  font-size: 18px;
  color: var(--main-color);
}

.card__subtitle {
  margin-top: 10px;
  font-weight: 400;
  font-size: 15px;
  color: var(--submain-color);
}

.card__btn {
  margin-top: 15px;
  width: 76px;
  height: 31px;
  border: 2px solid var(--main-color);
  border-radius: 4px;
  font-weight: 700;
  font-size: 11px;
  color: var(--main-color);
  background: var(--bg-color);
  text-transform: uppercase;
  transition: all 0.3s;
}

.card__btn-solid {
  background: var(--main-color);
  color: var(--bg-color);
  padding: 5px;
  margin: 5px;
}

.card__btn:hover {
  background: var(--main-color);
  color: var(--bg-color);
}

.card__btn-solid:hover {
  background: var(--bg-color);
  color: var(--main-color);
}
</style>