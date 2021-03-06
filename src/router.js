import { createRouter, createWebHistory } from "vue-router"
import Home from "./views/Home.vue"
import ReactionPage from "./views/ReactionPage.vue"
import Dashboard from "./views/Dashboard.vue"
import Auth from "./views/Auth.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/reaction/:id",
        name: "Reaction",
        props: true,
        component: ReactionPage,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
    },
    {
        path: "/auth",
        name: "Auth",
        component: Auth,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
