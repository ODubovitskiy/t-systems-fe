const actionTypes = {
    SUBMIT_FORM_ADD_TRUCK: "submitFormAddTruck",
    GET_CITIES: "getCities",
    GET_TRUCKS: "getTrucks",
    GET_TRUCK_BY_ID: "getTruckById",
    UPDATE_TRUCK: "updateTruck",
    GET_TRUCK_STATUSES: "getTruckStatuses",
    DELETE_TRUCK: "deleteTruck",

    SUBMIT_FORM_ADD_DRIVER: "submitFormAddDriver",
    GET_DRIVERS: "getDrivers",
    GET_AVAILABLE_TRUCKS: "getAvailableTrucks",
    GET_DRIVER_BY_ID: "getDriverById",
    UPDATE_DRIVER: "updateDriver",
    DELETE_DRIVER: "deleteDriver",
    GET_DRIVER_STATUSES: "getDriverStatuses",
}

window.actionTypes = actionTypes;

export {actionTypes};