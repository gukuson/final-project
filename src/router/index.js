import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Boutique from '../views/Boutique.vue'
import Photographers from '../views/Photographers.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Boutique',
        name: 'Boutique',
        component: Boutique
    },
    {
        path: '/photographers',
        name: 'Photographers',
        component: Photographers
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router