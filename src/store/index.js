import { createStore } from 'vuex';
import coachsModules from './modules/coaches';
import requestModules from './modules/requests';
import authModules from './modules/auth';

const store = createStore({
    modules: {
        coaches: coachsModules,
        requests: requestModules,
        auth: authModules
    }
});

export default store