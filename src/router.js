import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import trucks from "@/views/trucks";
import show from "@/components/trucks/show"
import edit from "@/components/trucks/edit"

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/trucks',
            component: trucks
        },
        {
            path: '/trucks/:id',
            component: show
        },
        {
            path: '/trucks/:id/edit',
            component: edit
        },
    ]
})