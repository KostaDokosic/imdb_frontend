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
        genres: [],
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
        getGenreName: (state) => (id) => {
            return state.genres.find(genre => genre.id === id)?.name;
        },
        getMovies(state) {
            return state.movies.data ? state.movies.data : 0;
        },
        getTotalPages(state) {
            return state.movies.meta.last_page ?? 0;
        },
        getCurrentPage(state) {
            return state.movies.meta.current_page ?? 0;
        },
        getFeaturedMovie(state) {
            return state.movies.data[0];
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
            let genres = '';
            movieData.genre_ids?.forEach(id => genres += `&genre_ids[]=${id}`);
            return axios.post(`/movies?title=${movieData.title}&description=${movieData.description}&coverImage=${movieData.coverImage}${genres}`)
                .then(response => {
                    commit('addMovie', movieData)
                    return response;
                })
        },
        fetchMovies({commit}, data) {
            let genres = '';
            data.genres?.forEach(genre => genres += `&genre_ids[]=${genre.id}`);
            axios.get(`/movies?page=${data.page}${genres.length > 0 ? genres : ''}`)
                .then(response => {
                    commit('setMovies', response.data)
                })
        },
        fetchGenres({commit}) {
            axios.get('/genres')
                .then(response => {
                    commit('setGenres', response.data)
                })
        },
        fetchComments({commit}, movieId) {
            return axios.get(`/comments?movie_id=${movieId}`)
                .then(response => {
                    return response.data;
                })
        },
        postComment({commit}, data) {
            return axios.post('/comments', data)
                .then(response => {
                    return response.data
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
            state.genres = data.data;
        }
    },
})

export default store;