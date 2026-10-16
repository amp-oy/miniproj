import { reactive } from 'vue'

const STORAGE_KEY = 'campus-ease-session-v1'

export const auth = reactive({
  email: localStorage.getItem(STORAGE_KEY) || '',
})

export function signIn(email) {
  localStorage.setItem(STORAGE_KEY, email)
  auth.email = email
}

export function signOut() {
  localStorage.removeItem(STORAGE_KEY)
  auth.email = ''
}
