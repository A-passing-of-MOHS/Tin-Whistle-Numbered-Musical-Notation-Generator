import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import "element-plus/theme-chalk/el-message-box.css";
import { ElMessage, ElMessageBox } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';

const app =createApp(App)
app.use(router)
app.mount('#app')
app.use(ElMessage);
app.use(ElMessageBox);
