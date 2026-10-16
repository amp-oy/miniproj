<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({ initialClass: { type: Object, default: null } })
const emit = defineEmits(['save', 'cancel'])
const blank = () => ({ subject: '', day: 'Monday', startTime: '08:00', endTime: '09:00', room: '' })
const form = reactive(blank())

watch(() => props.initialClass, (item) => Object.assign(form, blank(), item || {}), { immediate: true })

function submit() {
  if (!form.subject.trim()) return
  if (form.startTime >= form.endTime) {
    window.alert('End time must be later than start time.')
    return
  }
  emit('save', { ...form, subject: form.subject.trim(), room: form.room.trim() })
}
</script>

<template>
  <form class="form-grid" @submit.prevent="submit">
    <label class="field full-width">
      <span>Subject / class name *</span>
      <input v-model="form.subject" required maxlength="100" placeholder="e.g. Oral Communication" />
    </label>
    <label class="field">
      <span>Day</span>
      <select v-model="form.day">
        <option>Monday</option><option>Tuesday</option><option>Wednesday</option>
        <option>Thursday</option><option>Friday</option><option>Saturday</option><option>Sunday</option>
      </select>
    </label>
    <label class="field">
      <span>Room / location</span>
      <input v-model="form.room" maxlength="60" placeholder="e.g. Room 101" />
    </label>
    <label class="field">
      <span>Start time</span>
      <input v-model="form.startTime" type="time" required />
    </label>
    <label class="field">
      <span>End time</span>
      <input v-model="form.endTime" type="time" required />
    </label>
    <div class="form-actions full-width">
      <button type="button" class="btn btn-ghost" @click="emit('cancel')">Cancel</button>
      <button type="submit" class="btn btn-primary">Save class</button>
    </div>
  </form>
</template>
