import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'role-selector',
      component: () => import('@/views/RoleSelectorView.vue'),
      meta: { requiresRole: false },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresRole: true },
    },
    {
      path: '/songs',
      name: 'song-list',
      component: () => import('@/views/SongListView.vue'),
      meta: { requiresRole: true },
    },
    {
      path: '/songs/new',
      name: 'song-new',
      component: () => import('@/views/SongFormView.vue'),
      meta: { requiresRole: true, requiresLeader: true },
    },
    {
      path: '/songs/:id',
      name: 'song-detail',
      component: () => import('@/views/SongDetailView.vue'),
      meta: { requiresRole: true },
    },
    {
      path: '/songs/:id/edit',
      name: 'song-edit',
      component: () => import('@/views/SongFormView.vue'),
      meta: { requiresRole: true, requiresLeader: true },
    },
    {
      path: '/lineups',
      name: 'lineup-list',
      component: () => import('@/views/LineupListView.vue'),
      meta: { requiresRole: true },
    },
    {
      path: '/lineups/new',
      name: 'lineup-new',
      component: () => import('@/views/LineupFormView.vue'),
      meta: { requiresRole: true, requiresLeader: true },
    },
    {
      path: '/lineups/:id',
      name: 'lineup-detail',
      component: () => import('@/views/LineupDetailView.vue'),
      meta: { requiresRole: true },
    },
    {
      path: '/lineups/:id/edit',
      name: 'lineup-edit',
      component: () => import('@/views/LineupFormView.vue'),
      meta: { requiresRole: true, requiresLeader: true },
    },
    {
      path: '/templates',
      name: 'template-list',
      component: () => import('@/views/TemplateListView.vue'),
      meta: { requiresRole: true },
    },
    {
      path: '/templates/:id',
      name: 'template-detail',
      component: () => import('@/views/TemplateDetailView.vue'),
      meta: { requiresRole: true },
    },
    {
      path: '/practice/:songId',
      name: 'practice',
      component: () => import('@/views/PracticeView.vue'),
      meta: { requiresRole: true, hideLayout: true },
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('@/views/NotificationListView.vue'),
      meta: { requiresRole: true, requiresLeader: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/home',
    },
  ],
})

// Route guards
router.beforeEach((to) => {
  const ROLE_KEY = 'lhcc-role'
  const storedRole = localStorage.getItem(ROLE_KEY)

  // If route requires a role and user has no role, redirect to role selector
  if (to.meta.requiresRole && !storedRole) {
    return { name: 'role-selector' }
  }

  // If route requires leader and user is not leader, redirect to home
  if (to.meta.requiresLeader && storedRole !== 'leader') {
    return { name: 'home' }
  }

  // If user has a role and tries to visit role selector, go to home
  if (to.name === 'role-selector' && storedRole) {
    return { name: 'home' }
  }
})

export default router
