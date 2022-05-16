import { createRouter, createWebHistory } from 'vue-router';

import HomeLayout from '../components/HomeLayout.vue';
import AuthLayout from '../components/AuthLayout.vue';

import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import CreateMovie from '../views/CreateMovie.vue';

import store from '../store';

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        redirect: '/dashboard',
        component: HomeLayout,
        meta: {requireAuth: true},
        children: [
            {
                path: '/dashboard', 
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: '/addmovie',
                name: 'AddMovie',
                component: CreateMovie
            }
        ]
    },
    {
        path: '/auth',
        name: 'Auth',
        redirect: '/login',
        component: AuthLayout,
        meta: {isGuest: true},
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if(to.meta.requireAuth && !store.state.user.token) next({name: 'Login'})
    else if(store.state.user.token && (to.meta.isGuest)) next({name: 'Dashboard'})
    else next()
})

export default router;