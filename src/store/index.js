import { createStore } from 'vuex';
import axios from '../axios';

const store = createStore({
    state: {
        user: {
            token: sessionStorage.getItem('TOKEN'),
            data: JSON.parse(sessionStorage.getItem('USER'))
        },
        infoMessage: ''
    },
    getters: {
        getInfoMessage(state) {
            return state.infoMessage;
        }
    },
    actions: {
        registerUser({commit}, userData) {
            axios.post('/auth/register', userData)
                .then(({tokenData}) => {
                    commit('setUser', tokenData, userData);
                })
        }
    },
    mutations: {
        setInfoMessage(state, message) {
            state.infoMessage = message;
            setTimeout(() => state.infoMessage = '', 3000);
        },
        setUser(state, tokenData, userData) {
            state.user.data = userData;
            state.user.token = tokenData;
            sessionStorage.setItem('TOKEN', tokenData);
            sessionStorage.setItem('USER', userData);
        }
    },
})

export default store;