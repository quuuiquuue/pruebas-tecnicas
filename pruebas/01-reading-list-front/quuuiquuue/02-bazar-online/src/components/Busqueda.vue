<template>
    <main class="">
        <section class="card">
            <div class="card__img">
                <img :src="image" alt="Product Thumbnail">
            </div>

            <div class="card__title">{{ title }} - {{ price }} €</div>
            <div class="card__subtitle">{{ description }}</div>
            <div class="card__subtitle">Rating: {{ generarEstrellas() }}</div>

            <div class="card__wrapper">
                <button @click="verProducto" class="card__btn card__btn-solid">Mostrar</button>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
    import {defineProps} from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()
const props = defineProps({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    id: {
      type: Number,
      required: true
    }
})

const verProducto = () => {
        router.push({ name: 'productos', params: { id: props.id } })
}

const generarEstrellas = () => {
    let estrellas = '⭐️'.repeat(Math.floor(props.rating));
    const fraccion = props.rating % 1;
    if (fraccion > 0.5) {
      estrellas += '⭐️';
    }
    return estrellas;
  };


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

p {
    color: black;
}
.card {
  --main-color: #000;
  --submain-color: #78858F;
  --bg-color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  position: relative;
  width: 500px; /* Ancho ajustado automáticamente */
  height: auto; /* Alto ajustado automáticamente */
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background: var(--bg-color);
  border: 5px solid #cacacaee;
  padding: 10px;
  margin: 10px;
 transition: 0.3s ease-out;
}

.card:hover {
 border-color: #008bf8;
 box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
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