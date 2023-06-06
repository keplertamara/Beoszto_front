<template>
    <tr>
        <td>{{ technician.name }}</td>
        <td>{{ technician.performance }}</td>
        <td>{{ technician.table }}</td>
        <td>{{ technician.move }}</td>
        <td>{{ technician.head }}</td>
        <td><button class="button" @click="removeEvent(technician.name)">X</button></td>
    </tr>
</template>

<script setup>
import { useTheaterStore } from 'src/store/TheaterStore';
defineProps(['technician']);

const theaterStore = useTheaterStore();

async function removeEvent(name) {
    await theaterStore.deleteTechnicianByName(name);
    console.log("clicked")
}

</script>