const API_URL = `https://identitytoolkit.googleapis.com/v1/accounts`;
let timer = null;
export default {
    login(context, payload){
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        });
    },

    signUp(context, payload){
        return context.dispatch('auth', {
            ...payload,
            mode: 'signUp'
        })
    },

    async auth(context, payload){
        let mode = 'signUp';

        if(payload.mode === 'login'){
            mode = 'signInWithPassword';
        }

        const response = await fetch(`${API_URL}:${mode}?key=${process.env.VUE_APP_TOKEN}`, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to authenticated');
            throw error;
        }

        // const expiresIn = +responseData.expiresIn * 1000;
        const expiresIn = 5000;
        const expirationDate = new Date().getTime() + expiresIn;
      

        timer = setTimeout(() => {
            context.dispatch('logout');
        }, expiresIn)
 

        const setUserObj = {
            token: responseData.idToken,
            userId: responseData.localId
        }

        localStorage.setItem('token', setUserObj.token );
        localStorage.setItem('userId', setUserObj.userId);
        localStorage.setItem('tokenExpiration', expirationDate);

        context.commit('setUser', setUserObj);
    },

    tryLogin(context){
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        const expiresIn = +tokenExpiration - new Date().getTime();

        if(expiresIn < 0){
            return;
        }
    
        timer = setTimeout( () => {
            context.dispatch('logout')
        }, expiresIn)

        if(token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId
            });
        }
    },

    logout({ commit }){
        commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null
        });

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearInterval(timer);
    }
}