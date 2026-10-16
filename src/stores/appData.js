import { reactive, watch } from 'vue'

const STORAGE_KEY = 'campus-ease-data-v1'

const defaults = {
  profile: {
    name: 'John',
    email: 'John@example.com',
    studentId: '2026-001',
    course: 'Bachelor of Science in Information Technology',
    yearLevel: 'BSIT 3rd Year',
  },
  tasks: [
    { id: 1, title: 'Finish Performance Tasks', subject: 'Networking', dueDate: '', priority: 'High', completed: false },
    { id: 2, title: 'Review lesson notes', subject: 'General Education', dueDate: '', priority: 'Medium', completed: true },
    { id: 3, title: 'Prepare reporting script', subject: 'Communication', dueDate: '', priority: 'Low', completed: false },
  ],
  schedule: [
    { id: 1, subject: 'Information Management', day: 'Monday', startTime: '02:00', endTime: '09:00', room: 'ROOM 202A' },
    { id: 2, subject: 'Domain Course 3', day: 'Tuesday', startTime: '09:00', endTime: '10:00', room: 'CLAB 1' },
    { id: 3, subject: 'Networking', day: 'Tuesday', startTime: '1:00', endTime: '11:00', room: 'CLAB 1' },
  ],
  settings: { darkMode: false, notifications: true, compactMode: false },
}

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return structuredClone(defaults)
    const parsed = JSON.parse(saved)
    return {
      profile: { ...defaults.profile, ...parsed.profile },
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : structuredClone(defaults.tasks),
      schedule: Array.isArray(parsed.schedule) ? parsed.schedule : structuredClone(defaults.schedule),
      settings: { ...defaults.settings, ...parsed.settings },
    }
  } catch {
    return structuredClone(defaults)
  }
}

export const appData = reactive(loadData())

watch(
  appData,
  (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch (error) {
      console.warn('CampusEase could not save data:', error)
    }
  },
  { deep: true }
)

export function nextId(items) {
  return items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1
}

export function resetAppData() {
  Object.assign(appData, structuredClone(defaults))
}
