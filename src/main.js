import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
library.add(faThumbsUp, faThumbsDown);

createApp(App)
.use(store)
.use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
.mount('#app')
