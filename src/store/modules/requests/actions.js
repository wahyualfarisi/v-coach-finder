export default {
    async contactCoach(context, payload){
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };

        const response = await fetch(`https://react-github-repo-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest),
        });

        
        if(!response.ok){
            const error = new Error(response.message || 'Failed to contact coach');
            throw error;
        }

        const responseData = response.json();

        newRequest.id = responseData.name;
        newRequest.coachId = payload.coachId;

        context.commit('addRequest', newRequest);
    },

    async fetchRequests(context){
        const coachId = context.rootGetters.userId;

        const response = await fetch(`https://react-github-repo-default-rtdb.firebaseio.com/requests/${coachId}.json`);
        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to fetch !')
            throw error;
        }

        const requests = [];
        for(let key in responseData){
            requests.push({
                id: key,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            })
        }

        context.commit('setRequests', requests);
    }
}