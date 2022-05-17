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
            meta: {
                last_page: 0,
                current_page: 0
            }
        },
        genres: []
    },
    getters: {
        getInfoMessage(state) {
            return state.infoMessage;
        },
        getGenres(state) {
            return state.genres.map(genre => {
                return {name: genre.name, id: genre.id}
            });
        },
        getMovies(state) {
            return state.movies.data ? state.movies.data : 0;
        },
        getTotalPages(state) {
            return state.movies.meta.last_page ?? 0;
        },
        getCurrentPage(state) {
            return state.movies.meta.current_page ?? 0;
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
                    console.log(response)
                    commit('addMovie', movieData)
                    return response;
                })
        },
        fetchMovies({commit}, data) {
            console.log(data)
            axios.get(`/movies?page=${data.page}&genre=${data.genre ? data.genre : -1}`)
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
            state.movies.data = data.data;
            if(data.meta) state.movies.meta = data.meta
            if(!data.meta) state.movies.meta.last_page = 1;
        },
        setGenres(state, data) {
            state.genres = data;
        }
    },
})

export default store;