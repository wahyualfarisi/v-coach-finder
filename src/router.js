import { createRouter, createWebHistory } from 'vue-router';
import CoachesLists from './pages/coaches/CoachesLists.vue';
import NotFound from './pages/NotFound.vue';
import store from './store';

const CoachDetails = () => import('./pages/coaches/CoachDetails.vue');
const CoachRegister = () => import('./pages/coaches/CoachRegisters.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
const RequestReceived = () => import('./pages/requests/RequestReceived.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches'},
        { path: '/coaches', component: CoachesLists },
        {
            path: '/coaches/:id', 
            component: CoachDetails,
            props: true, //parsing id from url into a props
            children: [
                { path: 'contact', component: ContactCoach }
            ] 
        },
        { path: '/register', component: CoachRegister, meta: { requiresAuth: true } },
        { path: '/requests', component: RequestReceived, meta: { requiresAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
        { path: '/:notFound()', component: NotFound }
    ]
});

router.beforeEach(function(to, _, next) {
    if(to.meta.requiresAuth && !store.getters.isAuthenticated){
        next('/auth')
    }else if(to.meta.requiresUnAuth && store.getters.isAuthenticated){
        next('/coaches')
    }else{
        next()
    }
});

export default router