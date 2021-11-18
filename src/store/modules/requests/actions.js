export default {
    contactCoach(context, payload){
        const newRequest = {
            id: new Date().getTime(),
            userEmail: payload.email,
            message: payload.message
        };

        context.commit('addRequest', newRequest);
    }
}