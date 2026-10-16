<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  initialTask: { type: Object, default: null },
  submitLabel: { type: String, default: 'Save task' },
})
const emit = defineEmits(['save', 'cancel'])

const blank = () => ({ title: '', subject: '', dueDate: '', priority: 'Medium', completed: false })
const form = reactive(blank())

watch(() => props.initialTask, (task) => {
  Object.assign(form, blank(), task || {})
}, { immediate: true })

function submit() {
  if (!form.title.trim()) return
  emit('save', { ...form, title: form.title.trim(), subject: form.subject.trim() })
}
</script>

<template>
  <form class="form-grid" @submit.prevent="submit">
    <label class="field full-width">
      <span>Task name *</span>
      <input v-model="form.title" required maxlength="120" placeholder="e.g. Finish science activity" />
    </label>
    <label class="field">
      <span>Subject</span>
      <input v-model="form.subject" maxlength="80" placeholder="e.g. Biology" />
    </label>
    <label class="field">
      <span>Due date</span>
      <input v-model="form.dueDate" type="date" />
    </label>
    <label class="field">
      <span>Priority</span>
      <select v-model="form.priority">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
    </label>
    <div class="form-actions full-width">
      <button type="button" class="btn btn-ghost" @click="emit('cancel')">Cancel</button>
      <button type="submit" class="btn btn-primary">{{ submitLabel }}</button>
    </div>
  </form>
</template>
