import { createStore } from 'vuex';
import axios from '../axios';

const store = createStore({
    state: {
        user: {
            token: sessionStorage.getItem('TOKEN') ?? null,
            data: JSON.parse(sessionStorage.getItem('USER'))
        },
        infoMessage: '',
        movies: JSON.parse(sessionStorage.getItem('MOVIES')) ?? {
            meta: {
                last_page: 0,
                current_page: 0
            }
        },
        genres: JSON.parse(sessionStorage.getItem('GENRES')),
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
            let form = new FormData();
            form.append('title', movieData.title);
            form.append('description', movieData.description);
            form.append('coverImage', movieData.coverImage);
            form.append('genre_ids[]', movieData.genre_ids);
            return axios.post('/movies', form, {headers: {"Content-Type": "multipart/form-data"}})
                .then(response => {
                    return response.data;
                })
        },
        fetchMovies({commit}, data) {
            let genres = '';
            data.genres?.forEach(genre => genres += `&genre_ids[]=${genre.id}`);
            axios.get(`/movies?page=${data.page}${genres.length > 0 ? genres : ''}${data.likeFilter ? '&likeFilter=' + data.likeFilter : ''}`)
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
        },
        onLike({commit}, data) {
            axios.post('/likes', data)
                .then(response => {
                    commit('setMovieLike', {response: response.data.data ? response.data.data : response.data, id: data.movie_id})
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
            state.movies.data.push(movieData);
        },
        setMovies(state, data) {
            state.movies.data = data.data;
            if(data.meta) state.movies.meta = data.meta
            if(!data.meta) state.movies.meta.last_page = 1;
            sessionStorage.setItem('MOVIES', JSON.stringify(state.movies));
        },
        setGenres(state, data) {
            state.genres = data.data;
            sessionStorage.setItem('GENRES', JSON.stringify(state.genres));
        },
        setMovieLike(state, data) {
            const movie = state.movies.data.find(movie => movie.id === data.id);
            if(!movie) return;

            movie.userLike = data.response.like;
            movie.totalLikes = data.response.totalLikes;
            movie.totalDislikes = data.response.totalDislikes;
        }
    },
})

export default store;