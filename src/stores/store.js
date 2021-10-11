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
                    model:"",
                    reg_number:"",
                    driver_shift:"",
                    load_capacity:"",
                    city:{
                        city : ""
                    },
                    status:"",
                },
                truckId: ""
            },
            cities: "",
        },
    },
    mutations: {
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
        }, updateCities(state, payload) {
            state.trucksTab.cities = payload;
        }, updateTruckTable(state, payload) {
            state.trucksTab.truckTable.trucks = payload;
        }, updateTruckToShow(state, payload) {
            state.trucksTab.truckShow.truck = payload;
        }, updateTruckId(state, payload) {
            state.trucksTab.truckShow.truckId = payload;
        }
    },
    actions: {
        [actionTypes.SUBMIT_FORM_ADD_TRUCK]({commit, state}) {
            let formData = state.trucksTab.modals.truck_add.form;
            return axios.post("http://localhost:5000/api/trucks", formData).then(({data}) => {
                //todo check
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
            });
        }
    },

    modules: {},
    strict: process.env.NODE_ENV !== 'production',
});
