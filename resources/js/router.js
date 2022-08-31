import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            meta: {layout: 'auth'},
            component: () => import('./components/views/Login.vue')
          },
          {
            path: '/register',
            name: 'register',
            meta: {layout: 'auth'},
            component: () => import('./components/views/Register.vue')
          },
          {
            path: '/start',
            name: 'start',
            meta: {layout: 'start'},
            component: () => import('./components/views/Start.vue')
          },
          {
            path: '/',
            name: 'balance',
            meta: {layout: 'main', middlewareAuth: true},
            component: () => import('./components/views/balance/Balance.vue')
          },
          {
            path: '/edit/slice',
            name: 'editSlice',
            meta: {layout: 'main', middlewareAuth: true},
            component: () => import('./components/views/balance/EditBalance.vue')
          },
          {
            path: '/edit/chart',
            name: 'editChart',
            meta: {layout: 'main', middlewareAuth: true},
            component: () => import('./components/views/mood/EditChart.vue')
          },
          {
            path: '/history',
            name: 'history',
            meta: {layout: 'main', middlewareAuth: true},
            component: () => import('./components/views/History.vue')
          },
          {
            path: '/history-mood/view',
            name: 'moodHistoryView',
            meta: {layout: 'main', middlewareAuth: true},
            component: () => import('./components/views/mood/MoodHistoryView.vue')
          },
          {
            path: '/history-mood/list',
            name: 'moodHistoryList',
            meta: {layout: 'main', middlewareAuth: true},
            component: () => import('./components/views/mood/MoodHistoryList.vue')
          },
          {
            path: '/history-balance/list',
            name: 'balanceHistoryList',
            meta: {layout: 'main', middlewareAuth: true},
            component: () => import('./components/views/balance/BalanceHistoryList.vue')
          },
          {
            path: '/history-balance/view',
            name: 'balanceHistory',
            meta: {layout: 'main', middlewareAuth: true},
            component: () => import('./components/views/balance/BalanceHistoryView.vue')
          },
          {
            path: '/note-list',
            name: 'note-list',
            meta: {layout: 'main', middlewareAuth: true},
            component: () => import('./components/views/daybook/NoteList.vue')
          },
          {
            path: '/new-note',
            name: 'note',
            meta: {layout: 'main', middlewareAuth: true},
            component: () => import('./components/views/dayBook/NewNote.vue')
          },
          {
            path: '/read-note',
            name: 'read-note',
            meta: {layout: 'main', middlewareAuth: true},
            component: () => import('./components/views/dayBook/ReadNote.vue')
          },
          {
            path: '/profile',
            name: 'profile',
            meta: {layout: 'main', middlewareAuth: true},
            component: () => import('./components/views/Profile.vue')
          },
          {
            path: '/mood',
            name: 'mood',
            meta: {layout: 'main', middlewareAuth: true},
            component: () => import('./components/views/mood/MoodChart.vue')
          },
          { path: '/:pathMatch(.*)*',
            component: () => import('./components/views/NotFound.vue')
           }
        ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.middlewareAuth)) {                
      if (!auth.check()) {
          next({
              path: '/start',
              query: { redirect: to.fullPath }
          });
          return true;
      }
  }
  if ((to.path === '/login' || to.path === '/register') && auth.check()) {
          next({ path: '/start' });     
  }
   else{
        next();
   } 
});
