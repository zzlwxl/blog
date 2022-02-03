import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {antArr} from './plugins/ant-design.js'
// import 'ant-design-vue/dist/antd.css'
const app = createApp(App)
app.use(store)
app.use(router)

for(const item of antArr){
    app.use(item)
}
app.mount('#app')
