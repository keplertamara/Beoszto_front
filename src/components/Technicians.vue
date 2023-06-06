<template>
    <HeaderCard/>

    <div>
        <table class="table is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Performance</th>
                    <th>Operator</th>
                    <th>Mover</th>
                    <th>Lamp adjuster</th>
                    <th>Remove row</th>
                </tr>
            </thead>
            <tbody>
                <TechnicianCard v-for="technician in theaterStore.technicians"
                                :key="technician.name"
                                :technician="technician"/>
            </tbody>
        </table>
    </div>
    <div>
        <button class="button is-large is-rounded is-info is-light has-text-2 is-outlined"
                @click="add()">Add Technician</button>
    </div>
</template>

<script setup>
    import HeaderCard from './cards/HeaderCard.vue';
    import TechnicianCard from './cards/TechnicianCard.vue';
    import { useTheaterStore } from 'src/store/TheaterStore';
    import { useRouter } from 'vue-router';

    const theaterStore = useTheaterStore();
    const router = useRouter();
    theaterStore.getTechnicians();

    function add() {
        router.push({name:"technicianInput"});
    }
</script>