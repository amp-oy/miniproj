<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { appData } from '../stores/appData'

const completed = computed(() => appData.tasks.filter(t => t.completed).length)
const pending = computed(() => appData.tasks.filter(t => !t.completed).length)
const progress = computed(() => appData.tasks.length ? Math.round(completed.value / appData.tasks.length * 100) : 0)
const upcomingTasks = computed(() => [...appData.tasks].filter(t => !t.completed).slice(0, 4))
const todayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date())
const todaysClasses = computed(() => appData.schedule.filter(item => item.day === todayName).sort((a,b) => a.startTime.localeCompare(b.startTime)))
const greeting = computed(() => {
  const hour = new Date().getHours()
  return hour < 12 ? 'Good Day' : hour < 18 ? 'Good afternoon' : 'Good evening'
})
</script>

<template>
  <section class="welcome-banner">
    <div class="welcome-copy">
      <span class="banner-kicker">YOUR DAY, YOUR PACE</span>
      <h2>{{ greeting }}, {{ appData.profile.name.split(' ')[0] }}! <span>✦</span></h2>
      <p>Keep your school life organized. Every completed task is progress.</p>
      <RouterLink to="/tasks" class="btn btn-light">View my tasks <span>→</span></RouterLink>
    </div>
    <div class="banner-art" aria-hidden="true">
      <div class="art-circle circle-one"></div><div class="art-circle circle-two"></div>
      <div class="art-card"><span>✓</span><strong>You're doing great!</strong><small>One step at a time</small></div>
      <div class="art-star star-one">✦</div><div class="art-star star-two">✧</div>
    </div>
  </section>

  <section class="stats-grid">
    <article class="stat-card">
      <div class="stat-top"><span class="stat-icon purple">▤</span><span class="stat-label">Total tasks</span></div>
      <strong class="stat-number">{{ appData.tasks.length }}</strong><small>Tasks in your list</small>
    </article>
    <article class="stat-card">
      <div class="stat-top"><span class="stat-icon orange">◷</span><span class="stat-label">To do</span></div>
      <strong class="stat-number">{{ pending }}</strong><small>Still to be completed</small>
    </article>
    <article class="stat-card">
      <div class="stat-top"><span class="stat-icon green">✓</span><span class="stat-label">Completed</span></div>
      <strong class="stat-number">{{ completed }}</strong><small>Tasks finished</small>
    </article>
    <article class="stat-card">
      <div class="stat-top"><span class="stat-icon blue">▦</span><span class="stat-label">Classes</span></div>
      <strong class="stat-number">{{ appData.schedule.length }}</strong><small>Classes in your schedule</small>
    </article>
  </section>

  <section class="content-grid">
    <article class="panel">
      <div class="panel-heading">
        <div><span class="section-eyebrow">STAY PRODUCTIVE</span><h3>My tasks</h3></div>
        <RouterLink to="/tasks" class="text-link">See all →</RouterLink>
      </div>
      <div v-if="upcomingTasks.length" class="task-preview-list">
        <div v-for="task in upcomingTasks" :key="task.id" class="task-preview">
          <span class="task-check empty-check"></span>
          <div class="task-preview-copy"><strong>{{ task.title }}</strong><small>{{ task.subject || 'No subject' }}<span v-if="task.dueDate"> · Due {{ task.dueDate }}</span></small></div>
          <span class="priority-dot" :class="task.priority.toLowerCase()"></span>
        </div>
      </div>
      <div v-else class="empty-state compact-empty"><span>✓</span><strong>All caught up!</strong><p>You have no pending tasks.</p></div>
    </article>

    
    <article class="panel schedule-preview-panel">
      <div class="panel-heading">
        <div><span class="section-eyebrow">YOUR DAY AT A GLANCE</span><h3>Today's classes</h3></div>
        <RouterLink to="/schedule" class="text-link">Schedule →</RouterLink>
      </div>
      <div v-if="todaysClasses.length" class="class-preview-list">
        <div v-for="item in todaysClasses" :key="item.id" class="class-preview">
          <div class="class-time">{{ item.startTime }}<small>{{ item.endTime }}</small></div>
          <div class="class-color-bar"></div>
          <div><strong>{{ item.subject }}</strong><small>{{ item.room || 'Room not set' }}</small></div>
        </div>
      </div>
      <div v-else class="empty-state compact-empty"><span>☼</span><strong>No classes listed for {{ todayName }}</strong><p>Add your classes to see them here.</p></div>
    </article>
  </section>
</template>
