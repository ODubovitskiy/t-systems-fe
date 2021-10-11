import {createStore} from 'vuex'
import axios from "axios";
import {actionTypes} from "@/stores/actionTypes"

export default createStore({
    state: {
        currentPage: '/',
        trucksPage: {
            modals: {
                truck_add: {
                    show: false,
                    form: {
                        model: '',
                        reg_number: "",
                        driver_shift: "",
                        load_capacity: "",
                        city: {
                            id: ""
                        },
                    }
                }
            },
            truckTable: {
                trucks: ""
            },
            cities: "",
        },
    },
    mutations: {
        updateModel(state, payload) {
            state.trucksPage.modals.truck_add.form.model = payload
        }, updateRegNumber(state, payload) {
            state.trucksPage.modals.truck_add.form.reg_number = payload
        }, updateDriverShift(state, payload) {
            state.trucksPage.modals.truck_add.form.driver_shift = payload
        }, updateLoadCapacity(state, payload) {
            state.trucksPage.modals.truck_add.form.load_capacity = payload
        }, updateCity(state, payload) {
            state.trucksPage.modals.truck_add.form.city.id = payload
        }, updateCities(state, payload) {
            state.trucksPage.cities = payload;
        }, updateTruckTable(state, payload) {
            state.trucksPage.truckTable.trucks = payload;
        }
    },
    actions: {
        [actionTypes.SUBMIT_FORM_ADD_TRUCK]({commit, state}) {
            let formData = state.trucksPage.modals.truck_add.form;
            console.log(formData);
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
        }
    },

    modules: {},
    strict: process.env.NODE_ENV !== 'production',
});
