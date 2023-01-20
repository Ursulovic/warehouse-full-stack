import Vue from 'vue'
import VueRouter from 'vue-router'
import ConsumerView from '../views/ConsumerView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CheckOutView from '../views/CheckOutView.vue'
import AdminPanelVew from '../views/crud_views/AdminPanelVew'
import CategoryPanelView from '../views/crud_views/CategoryPanelView'
import EditUserView from '../views/EditUserView.vue'
import EditCategoryView from '../views/EditCategoryView'
import ControlView from '../views/ControlView'
import NewCategoryView from '../views/new_panels/NewCategoryView'
import ProductPanelView from '../views/crud_views/ProductPanelView'
import NewProductView from '../views/new_panels/NewProductView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ConsumerView',
    component: ConsumerView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckOutView
  },
  {
    path: '/adminPanel',
    name: 'adminPanel',
    component: AdminPanelVew
  },
  {
    path: '/editUser',
    name: 'editUser',
    component: EditUserView,
    props: true,
  },
  {
    path:'/categoryPanel',
    name: 'categoryPanel',
    component: CategoryPanelView
  },
  {
    path: '/editCategory',
    name: 'editCategory',
    component: EditCategoryView,
    props: true,
  },
  {
    path: '/control',
    name: 'ControlView',
    component: ControlView
  },
  {
    path: '/newCategory',
    name: 'newCategory',
    component: NewCategoryView
  },
  {
    path: '/productPanel',
    name: 'productPanel',
    component: ProductPanelView,
    props: true,
  },
  {
    path: '/newProduct',
    name: 'newProduct',
    component: NewProductView
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
