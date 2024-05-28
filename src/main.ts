import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import "element-plus/theme-chalk/el-message-box.css";
import { ElMessage, ElMessageBox } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';

import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app =createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.mount('#app')
app.use(ElMessage);
app.use(ElMessageBox);
