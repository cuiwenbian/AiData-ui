import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Index',
		component: Index
	},
	{
		path: '/register',
		name: 'register',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/register.vue')
	},
	{
		path: '/detail_voice',
		name: 'Detail_voice',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/Detail_voice.vue')
	},
	{
		path: '/my_info',
		name: 'my_info',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/my_info.vue')
	}
]

const router = new VueRouter({
	routes,
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
})

export default router
