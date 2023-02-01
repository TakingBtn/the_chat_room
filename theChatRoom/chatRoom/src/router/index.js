import { handleError } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'Index',
        component: () => import('../pages/index')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/Login')
    },
    {
        path: '/chat',
        name: 'ChatRoom',
        component: () => import('../pages/ChatRoom')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    console.log('前置守卫')
    next()
})

router.onError((handleError)=>{
    console.log('router onError',handleError)
})

export default router

