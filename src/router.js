import { createRouter, createWebHistory } from 'vue-router';
import CoachesLists from './pages/coaches/CoachesLists.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachRegister from './pages/coaches/CoachRegisters.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestReceived from './pages/requests/RequestReceived.vue';
import NotFound from './pages/NotFound.vue';

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
        { path: '/register', component: CoachRegister },
        { path: '/requests', component: RequestReceived },
        { path: '/:notFound()', component: NotFound }
    ]
})

export default router