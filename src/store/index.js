import { createStore } from 'vuex';
import coachsModules from './modules/coaches';

const store = createStore({
    modules: {
        coaches: coachsModules
    }
});

export default store;