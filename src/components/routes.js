import Orders from './Orders.vue'
import Main from './PageContent.vue'
import Modify from './Modify.vue'
import Dashboard from './Dashboard.vue'

export default [
    {path: '/orders', component:Orders},
    {path: '/', component:Main},
    {name:'modify', path: '/modify', component:Modify, props: true},
    {path: '/dashboard', component:Dashboard},
]