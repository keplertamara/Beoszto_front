import { defineStore } from 'pinia';
import api from './api.js';

export const useTheaterStore = defineStore("TheaterStore", {
    state: () => ({
        performances: [],
        technicians: []
    }),
    actions: {
        async getPerformances() {
            this.performances = await api.getPerformances();
        },

        async deletePerformance(name) {
            await api.deletePerformance(name);
            this.getPerformances();
        },

        async addPerformance(performance) {
            await api.addPerformance(performance);
            this.getPerformances();
        },

        async getTechnicians() {
            this.technicians = await api.getTechnicians();
        },

        async addTechnician(technician) {
            await api.addTechnician(technician);
            this.getTechnicians();
        },
        
        async deleteTechnicianByName(name) {
            await api.deleteTechnicianByName(name);
            this.getTechnicians();
        }
    }
});