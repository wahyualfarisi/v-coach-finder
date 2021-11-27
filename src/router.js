import { createRouter, createWebHistory } from 'vue-router';
import CoachesLists from './pages/coaches/CoachesLists.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachRegister from './pages/coaches/CoachRegisters.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestReceived from './pages/requests/RequestReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store';

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