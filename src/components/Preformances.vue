<template>
    <HeaderCard/>
    <div>
        <table class="table is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Prep. Time</th>
                    <th>Operator needed</th>
                    <th>Mover needed</th>
                    <th>Lamp adjuster needed</th>
                    <th>Remove row</th>
                </tr>
            </thead>
            <tbody>
                <PerformanceCard v-for="performance in theaterStore.performances"
                                :key="performance.name"
                                :performance="performance" />
            </tbody>
        </table>
    </div>
    <div>
        <button class="button is-large is-rounded is-info is-light has-text-2 is-outlined"
                @click="add()">Add Performance</button>
    </div>
    
</template>

<script setup>
    import HeaderCard from './cards/HeaderCard.vue';
    import PerformanceCard from './cards/PerformanceCard.vue';
    import { useTheaterStore } from 'src/store/TheaterStore';
    import { useRouter } from 'vue-router';

    const theaterStore = useTheaterStore();
    const router = useRouter();
    theaterStore.getPerformances();

    function add() {
        router.push({name:"performanceInput"});
    }
</script>