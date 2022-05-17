import { createStore } from 'vuex';
import axios from '../axios';

const store = createStore({
    state: {
        user: {
            token: sessionStorage.getItem('TOKEN') ?? null,
            data: JSON.parse(sessionStorage.getItem('USER'))
        },
        infoMessage: '',
        movies: {},
        genres: [
            'Action',
            'Adventure',
            'Comedy',
            'Crime',
            'Mystery',
            'Horror',
            'Romance',
            'Satire',
            'Thriler'
        ]
    },
    getters: {
        getInfoMessage(state) {
            return state.infoMessage;
        },
        getGenres(state) {
            return state.genres;
        },
        getMovies(state) {
            return state.movies.data ? state.movies.data : 0;
        },
        getTotalPages(state) {
            return state.movies.meta.last_page;
        },
        getCurrentPage(state) {
            return state.movies.meta.current_page;
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
        fetchMovies({commit}, page) {
            axios.get(`/movies?page=${page}`)
                .then(response => {
                    commit('setMovies', response.data)
                })
        },
        fetchGenres({commit}) {
            axios.get('/genres')
                .then(response => {
                    commit('setGenres', response.data)
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
        },
        setGenres(state, data) {
            state.genres = data;
        }
    },
})

export default store;