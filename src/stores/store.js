import {createStore} from 'vuex'
import axios from "axios";
import {actionTypes} from "@/stores/actionTypes"

export default createStore({
    state: {
        currentPage: '/',
        trucksTab: {
            modals: {
                truck_add: {
                    show: false,
                    form: {
                        model: '',
                        reg_number: "",
                        driver_shift: "",
                        load_capacity: "",
                        status: "working".toUpperCase(),
                        city: {
                            id: ""
                        },
                    }
                }
            },
            truckTable: {
                trucks: ""
            },
            truckShow: {
                truck: {
                    model: "",
                    reg_number: "",
                    driver_shift: "",
                    load_capacity: "",
                    city: {
                        city: ""
                    },
                    status: "",
                },
                truckId: ""
            },
            truckEdit: {
                truck: {
                    model: "",
                    reg_number: "",
                    driver_shift: "",
                    load_capacity: "",
                    city: {
                        id: ""
                    },
                    status: "",
                }, truckId: ""
            },
            truckDelete: {
                id: ""
            },
            cities: "",
            statuses: "",
        },
    },
    mutations: {

        updateCities(state, payload) {
            state.trucksTab.cities = payload;
        }, updateTruckTable(state, payload) {
            state.trucksTab.truckTable.trucks = payload;
        }, updateTruckStatuses(state, payload) {
            state.trucksTab.statuses = payload;
        },

        updateModel(state, payload) {
            state.trucksTab.modals.truck_add.form.model = payload
        }, updateRegNumber(state, payload) {
            state.trucksTab.modals.truck_add.form.reg_number = payload
        }, updateDriverShift(state, payload) {
            state.trucksTab.modals.truck_add.form.driver_shift = payload
        }, updateLoadCapacity(state, payload) {
            state.trucksTab.modals.truck_add.form.load_capacity = payload
        }, updateStatus(state, payload) {
            state.trucksTab.modals.truck_add.form.status = payload
        }, updateCity(state, payload) {
            state.trucksTab.modals.truck_add.form.city.id = payload
        },

        updateTruckToShow(state, payload) {
            state.trucksTab.truckShow.truck = payload;
        }, updateTruckId(state, payload) {
            state.trucksTab.truckShow.truckId = payload;
        },

        updateTruckToEdit(state, payload) {
            state.trucksTab.truckEdit.truck = payload;
        }, updateTruckIdToEdit(state, payload) {
            state.trucksTab.truckEdit.truckId = payload;
        },

        editModel(state, payload) {
            state.trucksTab.truckEdit.truck.model = payload
        }, editRegNumber(state, payload) {
            state.trucksTab.truckEdit.truck.reg_number = payload
        }, editDriverShift(state, payload) {
            state.trucksTab.truckEdit.truck.driver_shift = payload
        }, editLoadCapacity(state, payload) {
            state.trucksTab.truckEdit.truck.load_capacity = payload
        }, editStatus(state, payload) {
            state.trucksTab.truckEdit.truck.status = payload
        }, editCity(state, payload) {
            state.trucksTab.truckEdit.truck.city = payload
        },

        deleteTruck(state, payload) {
            state.trucksTab.truckDelete.id = payload
        },
    },
    actions: {
        [actionTypes.SUBMIT_FORM_ADD_TRUCK]({commit, state}) {
            let formData = state.trucksTab.modals.truck_add.form;
            return axios.post("http://localhost:5000/api/trucks", formData).then(({data}) => {
            });
        },
        [actionTypes.GET_CITIES]({commit, state}) {
            return axios({
                method: "get",
                url: "http://localhost:5000/api/cities",
            }).then(function (response) {
                let cities = response.data;
                commit("updateCities", cities)
            });
        },
        [actionTypes.GET_TRUCK_STATUSES]({commit, state}) {
            return axios({
                method: "get",
                url: "http://localhost:5000/api/truck-status",
            }).then(function (response) {
                let statuses = response.data;
                commit("updateTruckStatuses", statuses)
            });
        },
        [actionTypes.GET_TRUCKS]({commit, state}) {
            return axios({
                method: "get",
                url: "http://localhost:5000/api/trucks",
            }).then(function (response) {
                let trucks = response.data;
                commit("updateTruckTable", trucks)
            });
        },
        [actionTypes.GET_TRUCK_BY_ID]({commit, state}) {
            let id = state.trucksTab.truckShow.truckId;
            return axios({
                method: "get",
                url: "http://localhost:5000/api/trucks/" + id,
            }).then(function (response) {
                let truck = response.data;
                commit("updateTruckToShow", truck)
                commit("updateTruckToEdit", truck)
            });
        }, [actionTypes.UPDATE_TRUCK]({commit, state}) {
            let formData = state.trucksTab.truckEdit.truck;
            let id = state.trucksTab.truckEdit.truckId;
            return axios.put("http://localhost:5000/api/trucks/" + id, formData)
                .then(function (responce) {
                });
        },
        [actionTypes.DELETE_TRUCK]({commit, state}) {
            let id = state.trucksTab.truckDelete.id;
            return axios.delete("http://localhost:5000/api/trucks/" + id)
                .then(function (responce) {
                });
        }
    },

    modules: {},
    strict: process.env.NODE_ENV !== 'production',
});
