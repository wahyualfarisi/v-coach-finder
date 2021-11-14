import { createStore } from 'vuex';
import coachsModules from './modules/coaches';

const store = createStore({
    modules: {
        coaches: coachsModules
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