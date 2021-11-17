// import axios from "axios";
//
//
// const $axios = axios.create({
//     headers: {'Authorization': localStorage.getItem("dataToken")}
// });
//
// console.log(localStorage.getItem("dataToken"))
// $axios.interceptors.response.use((response) => {
//     return response;
// }, function (error) {
//     if (error.response.status === 401 | error.response.status === 403) {
//         window.location.href = '/auth';
//     }
// });
//
// export default $axios