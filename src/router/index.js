import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/components/home/Home";
import TruckShow from "@/components/trucks/Show";
import DriverShow from "@/components/drivers/Show";
import TruckEdit from "@/components/trucks/Edit";
import DriverEdit from "@/components/drivers/Edit";
import TrucksPage from "@/components/trucks/TrucksPage";
import DriversPage from "@/components/drivers/DriversPage";
import DriverPA from "@/components/personalAccount/DriverPA";
import Create from "@/components/orders/Create";
import Orders from "@/components/orders/Orders";
import EditPage from "@/components/orders/EditPage";
import AuthForm from "@/components/AuthForm";

const routes = [
    {
        path: '/auth',
        component: AuthForm
    },
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
        component: DriversPage
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
        path: '/orders/create',
        component: Create
    },
    {
        path: '/orders',
        component: Orders
    },
    {
        path: '/trucks/:id',
        component: TruckShow
    },
    {
        path: '/trucks/:id/edit',
        component: TruckEdit
    },
    {
        path: '/drivers/personal-account/',
        component: DriverPA
    },
    {
        path: '/orders/:id/edit',
        component: EditPage
    },
]

window.appRoutes = routes;

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
