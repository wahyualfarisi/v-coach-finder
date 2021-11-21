export default {
    async registerCoach(context, data){
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        const response = await fetch(`https://react-github-repo-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(coachData),
        });

        // const responseData = response.json();

        if( !response.ok ){
            //error ...
        }

        context.commit('registerCoach', { ...coachData, id: userId  });
    },

    async loadCoaches(context, payload){
        if(!payload.isForceRefresh && !context.getters.shouldUpdate){
            return;
        }

        const response = await fetch(`https://react-github-repo-default-rtdb.firebaseio.com/coaches.json`);

        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to fetch');
            throw error;
        }

        const coaches = [];

        for(const key in responseData){
            coaches.push({
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas,
                id: key
            });
        }

        context.commit('setCoaches', coaches);
        context.commit('setLastFetch');
    }
};