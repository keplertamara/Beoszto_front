<template>
    <div>
        <div>
            <label class="is-size-3" for="name">Name:</label>
            <input class="input is-link is-light" type="text" placeholder="Name" v-model="name" />
        </div>

        <div>
            <label class="is-size-3" for="prep-time">Performance:</label>
            <select v-model="performance">
                <option v-for="title in theaterStore.performances" :key="title" class="is-size-3">
                    {{ title.name }}
                </option>
            </select>
        </div>

        <div>
            <label class="is-size-3" for="operator-needed">Operator:</label>
            <input type="checkbox" v-model="operatorNeeded" />
        </div>

        <div>
            <label class="is-size-3" for="mover-needed">Mover:</label>
            <input type="checkbox" v-model="moverNeeded" />
        </div>

        <div>
            <label class="is-size-3" for="lamp-adjuster-needed">Lamp adjuster:</label>
            <input type="checkbox" v-model="lampAdjusterNeeded" />
        </div>

        <button class="button is-large is-rounded is-info is-light has-text-2 is-outlined" @click="addEvent()">
            Add Technician
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTheaterStore } from 'src/store/TheaterStore';

const theaterStore = useTheaterStore();
const router = useRouter();

theaterStore.getPerformances();

let name = ref("");
let performance = ref("");
let operatorNeeded = ref(true);
let moverNeeded = ref(true);
let lampAdjusterNeeded = ref(true);

async function addEvent() {
    await theaterStore.addTechnician({
        "name": name.value,
        "performance": performance.value,
        "table": operatorNeeded.value ? 1 : 0,
        "move": moverNeeded.value ? 1 : 0,
        "head": lampAdjusterNeeded.value ? 1 : 0
    });
    router.push({ name: "technicians" });
}

</script>
  