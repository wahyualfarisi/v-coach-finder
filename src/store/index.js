import { createStore } from 'vuex';
import coachsModules from './modules/coaches';
import requestModules from './modules/requests';

const store = createStore({
    modules: {
        coaches: coachsModules,
        requests: requestModules
    },
    state(){
        return {
            userId: 'c3'
        }
    },
    getters: {
        userId(state){
            return state.userId
        }
    }


});

export default store