import {createRouter, createWebHistory} from 'vue-router'
import TruckContent from "@/components/trucks/Content"
import Home from "@/components/home/Home";
import DriversContent from "@/components/drivers/Content";
import OrdersContent from "@/components/orders/Content";
import Show from "@/components/trucks/Show";
import Edit from "@/components/trucks/Edit";

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/trucks',
        component: TruckContent
    },
    {
        path: '/drivers',
        component: DriversContent
    },
    {
        path: '/orders',
        component: OrdersContent
    },
    {
        path: '/trucks/:id',
        component: Show
    },
    {
        path: '/trucks/:id/edit',
        component: Edit
    },
]

window.appRoutes = routes;

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
