export default {
    coaches(state) {
        return state.coaches
    },

    hasCoaches(state){
        return state.coaches && state.coaches.length > 0
    },

    isCoach(state, getters, rootState, rootGetters){
        const coaches = getters.coaches;
        const userId = rootGetters.userId;
        return coaches.some(coach => coach.id === userId);
    },

    shouldUpdate(state){
        const lastFetch = state.lastFetch;
        if(!lastFetch){
            return true;
        }

        const currentTime = new Date().getTime();
        return (currentTime - lastFetch) / 1000 > 60;
    }

};