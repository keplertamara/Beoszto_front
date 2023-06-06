<template>
    <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item is-size-4" @click="home()">
                Home
            </a>

            <a class="navbar-item is-size-4" @click="performances()">
                Theatrical performances
            </a>

            <a class="navbar-item is-size-4" @click="technicians()">
                Lighting technicians
            </a>

            <a class="navbar-item is-size-4" @click="upcoming()">
                Upcoming performances for next week
            </a>
        </div>
        <div class="navbar-end">
            <a class="navbar-item is-size-4" @click="schedule()">
                Schedule calculation
            </a>
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();

    function performances() {
        router.push({name : 'performances'});
    }

    function technicians() {
        router.push({name : 'technicians'});
    }

    function upcoming() {
        router.push({name : 'upcoming'});
    }

    function schedule() {
        router.push({name : 'schedule'});
    }

    function home() {
        router.push({name: 'home'});
    }
  
</script>