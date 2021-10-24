import {createStore} from 'vuex'
import axios from "axios";
import {actionTypes} from "@/stores/actionTypes"
import {useToast} from 'vue-toastification'

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
        driverTab: {
            drivers: "",
            statuses: "",
            cities: "",
            forms: {
                addDriver: {
                    name: "",
                    last_name: "",
                    hours_worked: 0,
                    status: "rest".toUpperCase(),
                    city: {
                        id: ""
                    },
                    truck: {
                        id: ""
                    }
                },
                driverEdit: {
                    form: {
                        name: "",
                        last_name: "",
                        personal_number: "",
                        hours_worked: "",
                        status: "",
                        city: {
                            id: ""
                        },
                        truck: {
                            id: ""
                        },
                    },
                    id: "",
                    cities: {},
                    statuses: {
                        id: "",
                        status: ""
                    },
                    available_trucks: {},
                },
            },
            driverShow: {
                driver: {
                    city: {},
                    truck: {},
                },
                id: ""
            },
            driverDelete: {
                id: ""
            }
        }
    },
    mutations: {

        updateCities(state, payload) {
            state.trucksTab.cities = payload;
            state.driverTab.cities = payload;
            state.driverTab.forms.driverEdit.cities = payload;
        },
        updateTruckTable(state, payload) {
            state.trucksTab.truckTable.trucks = payload;
        },
        updateTruckStatuses(state, payload) {
            state.trucksTab.statuses = payload;
        },

        updateModel(state, payload) {
            state.trucksTab.modals.truck_add.form.model = payload
        },
        updateRegNumber(state, payload) {
            state.trucksTab.modals.truck_add.form.reg_number = payload
        },
        updateDriverShift(state, payload) {
            state.trucksTab.modals.truck_add.form.driver_shift = payload
        },
        updateLoadCapacity(state, payload) {
            state.trucksTab.modals.truck_add.form.load_capacity = payload
        },
        updateStatus(state, payload) {
            state.trucksTab.modals.truck_add.form.status = payload
        },
        updateCity(state, payload) {
            state.trucksTab.modals.truck_add.form.city.id = payload
        },

        updateTruckToShow(state, payload) {
            state.trucksTab.truckShow.truck = payload;
        },
        updateTruckId(state, payload) {
            state.trucksTab.truckShow.truckId = payload;
        },

        updateTruckToEdit(state, payload) {
            state.trucksTab.truckEdit.truck = payload;
        },
        updateTruckIdToEdit(state, payload) {
            state.trucksTab.truckEdit.truckId = payload;
        },

        editModel(state, payload) {
            state.trucksTab.truckEdit.truck.model = payload
        },
        editRegNumber(state, payload) {
            state.trucksTab.truckEdit.truck.reg_number = payload
        },
        editDriverShift(state, payload) {
            state.trucksTab.truckEdit.truck.driver_shift = payload
        },
        editLoadCapacity(state, payload) {
            state.trucksTab.truckEdit.truck.load_capacity = payload
        },
        editStatus(state, payload) {
            state.trucksTab.truckEdit.truck.status = payload
        },
        editCity(state, payload) {
            state.trucksTab.truckEdit.truck.city = payload
        },

        deleteTruck(state, payload) {
            state.trucksTab.truckDelete.id = payload
        },

        // DriversTab

        updateDriversTable(state, payload) {
            state.driverTab.drivers = payload;
        },
        updateDriversStatuses(state, payload) {
            state.driverTab.forms.statuses = payload;
        },
        updateAddDriverName(state, payload) {
            state.driverTab.forms.addDriver.name = payload;
        },
        updateAddDriverLastName(state, payload) {
            state.driverTab.forms.addDriver.last_name = payload;
        },
        updateAddDriverPersonalNumber(state, payload) {
            state.driverTab.forms.addDriver.personal_number = payload;
        },
        updateAddDriverTruck(state, payload) {
            state.driverTab.forms.addDriver.truck.id = payload;
        },
        updateAddDriverCity(state, payload) {
            state.driverTab.forms.addDriver.city.id = payload;
        },
        updateTrucksAvailable(state, payload) {
            state.driverTab.forms.truckAvailable = payload;
            state.driverTab.forms.driverEdit.available_trucks = payload;
        },

        updateDriverToShowId(state, payload) {
            state.driverTab.driverShow.id = payload;
        }, updateDriverToShow(state, payload) {
            state.driverTab.driverShow.driver = payload;
        },

        updateDriverIdToEdit(state, payload) {
            state.driverTab.forms.driverEdit.id = payload;
        }, updateDriverStatusToEdit(state, payload) {
            state.driverTab.forms.driverEdit.form.status = payload;
        }, updateDriverNameToEdit(state, payload) {
            state.driverTab.forms.driverEdit.form.name = payload;
        }, updateDriverLastNameToEdit(state, payload) {
            state.driverTab.forms.driverEdit.form.last_name = payload;
        }, updateDriverPersonalNumberToEdit(state, payload) {
            state.driverTab.forms.driverEdit.form.personal_number = payload;
        }, updateDriverHoursWorkedToEdit(state, payload) {
            state.driverTab.forms.driverEdit.form.hours_worked = payload;
        }, updateDriverCityToEdit(state, payload) {
            state.driverTab.forms.driverEdit.form.city.id = payload;
        }, updateDriverTruckToEdit(state, payload) {
            state.driverTab.forms.driverEdit.form.truck.id = payload;
        }, updateDriverStatusesToEdit(state, payload) {
            state.driverTab.forms.driverEdit.statuses = payload;
        },

        deleteDriver(state, payload) {
            state.driverTab.driverDelete.id = payload;
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
        }, [actionTypes.DELETE_TRUCK]({commit, state}) {
            let id = state.trucksTab.truckDelete.id;
            return axios.delete("http://localhost:5000/api/trucks/" + id)
                .then(function (responce) {
                    useToast().success("Truck has been successfully deleted",{

                    })
                })
                .catch(function (error) {
                    useToast().warning(error.response.data.error_description,{

                    })
                });
        },

        // Drivers
        [actionTypes.GET_DRIVERS]({commit, state}) {
            return axios.get("http://localhost:5000/api/drivers/")
                .then(function (responce) {
                    let drivers = responce.data;
                    commit("updateDriversTable", drivers)
                });
        },
        [actionTypes.GET_AVAILABLE_TRUCKS]({commit, state}) {
            return axios.get("http://localhost:5000/api/trucks/available")
                .then(function (responce) {
                    let trucks = responce.data;
                    commit("updateTrucksAvailable", trucks)
                });
        },
        [actionTypes.SUBMIT_FORM_ADD_DRIVER]({commit, state}) {
            let formData = state.driverTab.forms.addDriver;
            return axios.post("http://localhost:5000/api/drivers", formData)
                .then(function (responce) {
                });
        }, [actionTypes.GET_DRIVER_BY_ID]({commit, state}) {
            let id = state.driverTab.driverShow.id;
            return axios({
                method: "get",
                url: "http://localhost:5000/api/drivers/" + id,
            }).then(function (response) {
                let driver = response.data;
                commit("updateDriverToShow", driver)
            });
        }, [actionTypes.UPDATE_DRIVER]({commit, state}) {
            let formData = state.driverTab.forms.driverEdit.form;
            let id = state.driverTab.forms.driverEdit.id;
            return axios.put("http://localhost:5000/api/drivers/" + id, formData)
                .then(function (responce) {
                });
        }, [actionTypes.GET_DRIVER_STATUSES]({commit, state}) {
            return axios.get("http://localhost:5000/api/driver-statuses/")
                .then(function (responce) {
                    commit("updateDriverStatusesToEdit", responce.data)
                });
        }, [actionTypes.DELETE_DRIVER]({commit, state}) {
            let id = state.driverTab.driverDelete.id;
            return axios.delete("http://localhost:5000/api/drivers/" + id)
                .then(function (responce) {
                });
        }
    },

    modules: {},
    strict: process.env.NODE_ENV !== 'production',
});
