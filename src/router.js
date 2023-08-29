import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import UpdateDataPage from './components/UpdateDataPage.vue';
import LastTransactions from './components/LastTransactions.vue';


const routes = [
    { path: '/', component: HomePage ,name:"صفحة البحث"},
    { path: '/update-data', component: UpdateDataPage ,name:"تحديث البيانات" },
    { path: '/last-transactions', component: LastTransactions ,name:"عمليات التحديث الأخيرة" },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
