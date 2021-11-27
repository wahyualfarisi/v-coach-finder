const API_URL = `https://identitytoolkit.googleapis.com/v1/accounts`

export default {
    async login(context, payload){
        const response = await fetch(`${API_URL}:signInWithPassword?key=${process.env.VUE_APP_TOKEN}`, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();
        
        if(!response.ok){
            console.log(responseData)
            const error = new Error(responseData.message || 'Failed to authenticated');
            throw error;
        }

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        });
    },
    async signUp(context, payload){
       const response = await fetch(`${API_URL}:signUp?key=${process.env.VUE_APP_TOKEN}`, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();
        
        if(!response.ok){
            console.log(responseData)
            const error = new Error(responseData.message || 'Failed to authenticated');
            throw error;
        }

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        });
    },

    logout({ commit }){
        commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null
        });
    }
}