import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    state(){
        return {
            userId: null,
            token: null,
            tokenExpiration: null,
            isAutoLogout: false
        }
    },
    getters,
    mutations,
    actions
}