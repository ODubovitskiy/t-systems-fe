import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/components/home/Home";
import DriversContent from "@/components/drivers/Content";
import OrdersContent from "@/components/orders/Content";
import TruckShow from "@/components/trucks/Show";
import DriverShow from "@/components/drivers/Show";
import Edit from "@/components/trucks/Edit";
import DriverEdit from "@/components/drivers/Edit";
import TrucksPage from "@/components/trucks/TrucksPage";

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/trucks',
        name: 'trucks',
        component: TrucksPage
    },
    {
        path: '/drivers',
        component: DriversContent
    },
    {
        path: '/drivers/:id',
        component: DriverShow
    },
    {
        path: '/drivers/:id/edit',
        component: DriverEdit
    },
    {
        path: '/orders',
        component: OrdersContent
    },
    {
        path: '/trucks/:id',
        component: TruckShow
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
