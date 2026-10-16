<script setup>
import { computed, ref } from 'vue'
import ScheduleForm from '../components/ScheduleForm.vue'
import { appData, nextId } from '../stores/appData'

const showForm = ref(false)
const editingClass = ref(null)
const selectedDay = ref('All days')
const days = ['All days', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const classes = computed(() => [...appData.schedule]
  .filter(item => selectedDay.value === 'All days' || item.day === selectedDay.value)
  .sort((a,b) => ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].indexOf(a.day) - ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].indexOf(b.day) || a.startTime.localeCompare(b.startTime)))

function saveClass(item) {
  if (editingClass.value) {
    const index = appData.schedule.findIndex(row => row.id === editingClass.value.id)
    if (index !== -1) appData.schedule[index] = { ...item, id: editingClass.value.id }
  } else {
    appData.schedule.push({ ...item, id: nextId(appData.schedule) })
  }
  closeForm()
}
function editClass(item) { editingClass.value = { ...item }; showForm.value = true }
function closeForm() { showForm.value = false; editingClass.value = null }
function deleteClass(item) {
  if (window.confirm(`Delete ${item.subject} from your schedule?`)) appData.schedule = appData.schedule.filter(row => row.id !== item.id)
}
function formatTime(value) {
  if (!value) return ''
  const [hour, minute] = value.split(':').map(Number)
  const suffix = hour >= 12 ? 'PM' : 'AM'
  return `${hour % 12 || 12}:${String(minute).padStart(2,'0')} ${suffix}`
}
</script>

<template>

  <section class="page-intro">
    <div></div>
    <button class="btn btn-primary" @click="showForm = true; editingClass = null"><span>＋</span> Add class</button>
  </section>

  <section class="panel">
    <div class="panel-heading schedule-heading"><div><span class="section-eyebrow">YOUR CLASSES</span><h3>Class schedule <span class="muted-count">{{ appData.schedule.length }}</span></h3></div>
      <label class="day-filter"><span>Show</span><select v-model="selectedDay"><option v-for="day in days" :key="day">{{ day }}</option></select></label>
    </div>

    <div v-if="showForm" class="inline-form-card">
      <div class="panel-heading"><div><span class="section-eyebrow">CLASS DETAILS</span><h3>{{ editingClass ? 'Edit class' : 'Add a class' }}</h3></div></div>
      <ScheduleForm :initial-class="editingClass" @save="saveClass" @cancel="closeForm" />
    </div>

    <div v-if="classes.length" class="schedule-list">
      <article v-for="item in classes" :key="item.id" class="schedule-item">
        <div class="schedule-day-block"><strong>{{ item.day.slice(0,3) }}</strong><small>{{ item.day }}</small></div>
        <div class="schedule-time-block"><strong>{{ formatTime(item.startTime) }}</strong><span>to</span><strong>{{ formatTime(item.endTime) }}</strong></div>
        <div class="schedule-color-line"></div>
        <div class="schedule-class-info"><strong>{{ item.subject }}</strong><small>⌖ {{ item.room || 'Location not set' }}</small></div>
        <div class="row-actions"><button class="icon-btn" title="Edit class" aria-label="Edit class" @click="editClass(item)">✎</button><button class="icon-btn danger" title="Delete class" aria-label="Delete class" @click="deleteClass(item)">×</button></div>
      </article>
    </div>
    <div v-else class="empty-state"><span>▦</span><strong>No classes found</strong><p>Add a class or choose another day.</p><button class="btn btn-primary" @click="showForm = true">Add class</button></div>
  </section>
</template>
