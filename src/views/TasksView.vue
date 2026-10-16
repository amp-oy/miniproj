<script setup>
import { computed, ref } from 'vue'
import TaskForm from '../components/TaskForm.vue'
import { appData, nextId } from '../stores/appData'

const showForm = ref(false)
const editingTask = ref(null)
const search = ref('')
const filter = ref('All')
const visibleTasks = computed(() => appData.tasks.filter(task => {
  const matchesSearch = `${task.title} ${task.subject}`.toLowerCase().includes(search.value.toLowerCase())
  const matchesFilter = filter.value === 'All' || (filter.value === 'Completed' ? task.completed : !task.completed)
  return matchesSearch && matchesFilter
}).sort((a,b) => Number(a.completed) - Number(b.completed)))

function saveTask(task) {
  if (editingTask.value) {
    const index = appData.tasks.findIndex(item => item.id === editingTask.value.id)
    if (index !== -1) appData.tasks[index] = { ...task, id: editingTask.value.id }
  } else {
    appData.tasks.push({ ...task, id: nextId(appData.tasks) })
  }
  closeForm()
}
function editTask(task) {
  editingTask.value = { ...task }
  showForm.value = true
}
function closeForm() {
  showForm.value = false
  editingTask.value = null
}
function deleteTask(task) {
  if (window.confirm(`Delete "${task.title}"?`)) {
    appData.tasks = appData.tasks.filter(item => item.id !== task.id)
  }
}
</script>

<template>
  <section class="page-intro">
    <div><h2>Make room for what matters.</h2><p>Manage assignments, deadlines, and daily school goals.</p></div>
    <button class="btn btn-primary" @click="showForm = true; editingTask = null"><span>＋</span> Add task</button>
  </section>

  <section class="task-summary-row">
    <div class="mini-stat"><span class="mini-stat-icon purple">▤</span><div><strong>{{ appData.tasks.length }}</strong><small>Total tasks</small></div></div>
    <div class="mini-stat"><span class="mini-stat-icon orange">◷</span><div><strong>{{ appData.tasks.filter(t => !t.completed).length }}</strong><small>Pending</small></div></div>
    <div class="mini-stat"><span class="mini-stat-icon green">✓</span><div><strong>{{ appData.tasks.filter(t => t.completed).length }}</strong><small>Completed</small></div></div>
  </section>

  <section class="panel">
    <div class="list-toolbar">
      <div class="search-box"><span>⌕</span><input v-model="search" placeholder="Search tasks or subjects..." aria-label="Search tasks" /></div>
      <div class="filter-tabs">
        <button v-for="option in ['All', 'Pending', 'Completed']" :key="option" class="filter-tab" :class="{ selected: filter === option }" @click="filter = option">{{ option }}</button>
      </div>
    </div>

    <div v-if="showForm" class="inline-form-card">
      <div class="panel-heading"><div><span class="section-eyebrow">TASK DETAILS</span><h3>{{ editingTask ? 'Edit task' : 'Create a task' }}</h3></div></div>
      <TaskForm :initial-task="editingTask" :submit-label="editingTask ? 'Update task' : 'Add task'" @save="saveTask" @cancel="closeForm" />
    </div>

    <div v-if="visibleTasks.length" class="task-table">
      <div class="task-table-head"><span>Task details</span><span>Due date</span><span>Priority</span><span>Status</span><span>Actions</span></div>
      <div v-for="task in visibleTasks" :key="task.id" class="task-row" :class="{ 'task-done': task.completed }">
        <div class="task-name-cell">
          <button class="task-check" :class="{ checked: task.completed }" :aria-label="task.completed ? 'Mark as pending' : 'Mark as completed'" @click="task.completed = !task.completed">{{ task.completed ? '✓' : '' }}</button>
          <div><strong>{{ task.title }}</strong><small>{{ task.subject || 'No subject' }}</small></div>
        </div>
        <span class="due-cell">{{ task.dueDate || 'No due date' }}</span>
        <span><span class="priority-badge" :class="task.priority.toLowerCase()">{{ task.priority }}</span></span>
        <span><span class="status-badge" :class="task.completed ? 'status-complete' : 'status-pending'">{{ task.completed ? 'Completed' : 'Pending' }}</span></span>
        <div class="row-actions"><button class="icon-btn" title="Edit task" aria-label="Edit task" @click="editTask(task)">✎</button><button class="icon-btn danger" title="Delete task" aria-label="Delete task" @click="deleteTask(task)">×</button></div>
      </div>
    </div>
    <div v-else class="empty-state"><span>⌕</span><strong>No tasks found</strong><p>Try another search or add a new task.</p><button class="btn btn-primary" @click="showForm = true">Create a task</button></div>
  </section>
</template>
