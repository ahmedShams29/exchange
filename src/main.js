import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueI18n from 'vue-i18n';

createApp(App).config.productionTip = false;
createApp(App).use(VueI18n);
new VueI18n({
    locale: 'en', // set locale
})
createApp(App).mount('#app');