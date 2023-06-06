import axios from "axios";

async function getPerformances() {
    return (await axios.get("http://localhost:9070/performances")).data;
}

async function addPerformance(performance) {
    try {
        await axios({
            method: 'post',
            url: "http://localhost:9070/add_performance",
            data: performance
        })
    }
    catch (err) {
        throw {
            status: err.response.status,
            message: err.response.data
        };
    }
}

async function deletePerformance(name) {
    try {
        await axios.delete(`http://localhost:9070/delete_performance/${name}`);
    } catch (err) {
        throw {
            status: err.response.status,
            message: err.response.data,
        };
    }
}



async function getTechnicians() {
    return (await axios.get("http://localhost:9070/technicians")).data;
}

async function addTechnician(technician) {
    try {
        await axios({
            method: 'post',
            url: "http://localhost:9070/add_technician",
            data: technician
        })
    }
    catch (err) {
        throw {
            status: err.response.status,
            message: err.response.data
        };
    }
}

async function deleteTechnicianByName(name) {
    try {
        await axios.delete(`http://localhost:9070/delete_technician/${name}`);
    } catch (err) {
        throw {
            status: err.response.status,
            message: err.response.data,
        };
    }
}

export default {
    getPerformances,
    addPerformance,
    deletePerformance,
    getTechnicians,
    addTechnician,
    deleteTechnicianByName
}