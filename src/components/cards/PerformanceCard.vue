<template>
    <tr>
        <td>{{ performance.name }}</td>
        <td>{{ performance.preparation_time }}</td>
        <td>{{ performance.table_needed }}</td>
        <td>{{ performance.move_needed }}</td>
        <td>{{ performance.head_needed }}</td>
        <td><button class="button" @click="removeEvent(performance.name)">X</button></td>
    </tr>

</template>

<script setup>
import { useTheaterStore } from 'src/store/TheaterStore';
defineProps(['performance']);

const theaterStore = useTheaterStore();

async function removeEvent(name) {
    await theaterStore.deletePerformance(name);
    console.log("clicked")
}

</script>