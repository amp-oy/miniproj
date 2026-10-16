<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signIn } from '../stores/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')

function submit() {
  errorMessage.value = ''

  try {
    signIn(email.value.trim())
    router.replace('/')
  } catch (error) {
    errorMessage.value = 'We could not save your sign-in on this device. Check your browser storage settings and try again.'
    console.error('CampusEase could not save the demo session:', error)
  }
}
</script>

<template>
  <main class="login-page">
    <section class="login-card" aria-labelledby="login-title">
      <RouterLink to="/login" class="brand login-brand" aria-label="CampusEase sign in">
        <span class="brand-mark">C</span>
        <span><strong>CampusEase</strong></span>
      </RouterLink>

      <p class="section-eyebrow">WELCOME BACK</p>
      

      <form class="login-form" @submit.prevent="submit">
        <label class="field">
          <span>Email address</span>
          <input v-model="email" type="email" autocomplete="username" required maxlength="150" placeholder="you@example.com" />
        </label>
        <label class="field">
          <span>Password</span>
          <input v-model="password" type="password" autocomplete="current-password" required minlength="6" placeholder="Enter your password" />
        </label>
        <p v-if="errorMessage" class="login-error" role="alert">{{ errorMessage }}</p>
        <button class="btn btn-primary login-submit" type="submit">Sign in</button>
      </form>

    </section>
  </main>
</template>
