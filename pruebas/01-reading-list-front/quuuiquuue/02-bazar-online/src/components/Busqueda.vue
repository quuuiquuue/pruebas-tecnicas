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
            <p>Resultado de la busqueda {{ props.title }}</p>
            <img :src="props.image">
            <p>{{ props.title }}</p>
            <p>{{ props.description }}</p>
            <p>{{ props.price }}</p>
            <p>{{ props.rating }}</p>
            <!-- Mostrar los resultados de la búsqueda -->
        </section>

    </main>
</template>

<script setup lang="ts">

import caravana from '/caravan.gif'

const props = defineProps({
    image: {
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    price: {
        type: Number,
        required:true
    } ,
    rating: {
        type: Number,
        required:true
    }
})


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