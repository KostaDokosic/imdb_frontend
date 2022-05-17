import { createStore } from 'vuex';
import axios from '../axios';

const store = createStore({
    state: {
        user: {
            token: sessionStorage.getItem('TOKEN') ?? null,
            data: JSON.parse(sessionStorage.getItem('USER'))
        },
        infoMessage: '',
        movies: {
            movies: [],
            total: 0
        }
    },
    getters: {
        getInfoMessage(state) {
            return state.infoMessage;
        },
        getPageNumber(state) {
            return Math.ceil(state.movies.total / 8);
        }
    },
    actions: {
        registerUser({commit}, userData) {
            return axios.post('/auth/register', userData)
                .then(response => {
                    commit('setUser', {token: response.data.access_token, user: userData});
                    return response;
                })
        },
        login({commit}, userData) {
            return axios.post('/auth/login', userData)
                .then(response => {
                    commit('setUser', {token: response.data.access_token, user: userData});
                    return response;
                })
        },
        addMovie({commit}, movieData) {
            return axios.post('/movies', movieData)
                .then(response => {
                    commit('addMovie', movieData)
                    return response;
                })
        },
        fetchMovies({commit}, currentPage) {
            axios.get(`/movies?currentPage=${currentPage}`)
                .then(response => {
                    commit('setMovies', response.data)
                })
        }
    },
    mutations: {
        setInfoMessage(state, message) {
            state.infoMessage = message;
            setTimeout(() => state.infoMessage = '', 3000);
        },
        setUser(state, data) {
            state.user.data = data.user;
            state.user.token = data.token;
            sessionStorage.setItem('TOKEN', data.token);
            sessionStorage.setItem('USER', JSON.stringify(data.user));
        },
        logout(state) {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.clear();
        },
        addMovie(state, movieData) {
            state.movies.push(movieData);
        },
        setMovies(state, data) {
            state.movies = data;
        }
    },
})

export default store;