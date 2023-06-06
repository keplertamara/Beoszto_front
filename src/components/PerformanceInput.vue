<template>
    <div>
        <div>
            <label class="has-text-2" for="name">Name:</label>
            <input class="input is-link is-light" type="text" placeholder="Name" v-model="name" />
        </div>

        <div>
            <label class="has-text-2" for="prep-time">Preparation Time:</label>
            <input class="input is-link is-light" type="number" v-model="preparationTime" />
        </div>

        <div>
            <label class="has-text-2" for="operator-needed">Operator needed:</label>
            <input class="input is-link is-light" type="number" v-model="operatorNeeded" />
        </div>

        <div>
            <label class="has-text-2" for="mover-needed">Mover needed:</label>
            <input class="input is-link is-light" type="number" v-model="moverNeeded" />
        </div>

        <div>
            <label class="has-text-2" for="lamp-adjuster-needed">Lamp adjuster needed:</label>
            <input class="input is-link is-light" type="number" v-model="lampAdjusterNeeded" />
        </div>

        <div v-if="!isValid" class="notification is-danger ">
            Preparation time, Operator needed, mover needed and lamp adjuster needed must be numbers!
        </div>
        <button class="button is-large is-rounded is-info is-light has-text-2 is-outlined" 
                @click="addEvent()"
                :disabled="!isValid">
            Add Performance
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTheaterStore } from 'src/store/TheaterStore';

const theaterStore = useTheaterStore();
const router = useRouter();

let name = ref("");
let preparationTime = ref(0);
let operatorNeeded = ref(0);
let moverNeeded = ref(0);
let lampAdjusterNeeded = ref(0);

const isValid = computed(() => {
    return typeof name.value === 'string' &&
        typeof preparationTime.value === 'number' &&
        typeof operatorNeeded.value === 'number' &&
        typeof moverNeeded.value === 'number' &&
        typeof lampAdjusterNeeded.value === 'number';
});

async function addEvent() {
    await theaterStore.addPerformance({
        "name": name.value,
        "preparation_time": preparationTime.value,
        "table_needed": operatorNeeded.value,
        "move_needed": moverNeeded.value,
        "head_needed": lampAdjusterNeeded.value
    });
    router.push({ name: "performances" });
}

</script>
  