import { createRouter, createWebHashHistory } from "vue-router";


export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/:pathMatch(.*)*', component:()=> import("../views/404.vue")},
        {path: '/', component:()=> import("../views/Index.vue")},
    ]
})

