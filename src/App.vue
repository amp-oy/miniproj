<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { appData } from './stores/appData'
import { signOut } from './stores/auth'

const route = useRoute()
const router = useRouter()
function logOut() {
  signOut()
  router.replace('/login')
}

const pageTitle = computed(() => ({
  home: 'Dashboard',
  tasks: 'My Tasks',
  schedule: 'Class Schedule',
  profile: 'My Profile',
  settings: 'Settings',
}[route.name] || 'CampusEase'))

const navItems = [
  { name: 'home', label: 'Home', icon: '⌂', path: '/' },
  { name: 'tasks', label: 'Tasks', icon: '✓', path: '/tasks' },
  { name: 'schedule', label: 'Schedule', icon: '▦', path: '/schedule' },
  { name: 'profile', label: 'Profile', icon: '♙', path: '/profile' },
  { name: 'settings', label: 'Settings', icon: '⚙', path: '/settings' },
]
</script>

<template>
  <RouterView v-if="route.name === 'login'" />
  <div v-else class="app-shell" :class="{ 'dark-mode': appData.settings.darkMode, 'compact-mode': appData.settings.compactMode }">
    <aside class="sidebar">
      <RouterLink to="/" class="brand">
        <span class="brand-mark">C</span>
        <span><strong>CampusEase</strong><small>Student workspace</small></span>
      </RouterLink>

      <div class="nav-label">MENU</div>
      <nav class="main-nav" aria-label="Main navigation">
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          class="nav-link"
          :class="{ active: route.name === item.name }"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
          <span v-if="item.name === 'tasks' && appData.tasks.filter(t => !t.completed).length" class="nav-count">
            {{ appData.tasks.filter(t => !t.completed).length }}
          </span>
        </RouterLink>
      </nav>

      <div class="sidebar-bottom">
        <div class="sidebar-tip">
          
          <p>Small steps every day lead to big progress.</p>
        </div>
        <RouterLink to="/profile" class="mini-profile">
          <span class="avatar">{{ (appData.profile.name || 'S').charAt(0).toUpperCase() }}</span>
          <span class="mini-profile-text"><strong>{{ appData.profile.name }}</strong><small>{{ appData.profile.yearLevel }}</small></span>
          <span class="more">···</span>
        </RouterLink>
      </div>
    </aside>

    <main class="main-area">
      <header class="topbar">
        <div>
          <div class="eyebrow">YOUR STUDENT SPACE</div>
          <h1>{{ pageTitle }}</h1>
        </div>
        <div class="topbar-right">
          <span class="today-pill"><span class="status-dot"></span> Ready to learn</span>
          <button class="btn btn-ghost topbar-logout" type="button" @click="logOut">Log out</button>
          <RouterLink to="/profile" class="avatar top-avatar" :aria-label="`Open ${appData.profile.name}'s profile`">
            {{ (appData.profile.name || 'S').charAt(0).toUpperCase() }}
          </RouterLink>
        </div>
      </header>

      <div class="page-content">
        <RouterView />
      </div>
      <footer class="footer">CampusEase <span>·</span> Organize your school life with ease</footer>
    </main>
  </div>
</template>
