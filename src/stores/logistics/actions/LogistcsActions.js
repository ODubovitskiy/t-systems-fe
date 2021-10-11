import LogisticsTypes from "@/stores/logistics/actionTypes/LogisticsTypes";

const LogisticsActions = {};

LogisticsActions[LogisticsTypes.UPDATE_STATES] = function ({commit, state}, payload) {
    console.log(commit, state, payload)
}

export {LogisticsActions}