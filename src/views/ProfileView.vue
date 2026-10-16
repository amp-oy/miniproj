<script setup>
import { reactive, ref, watch } from 'vue'
import { appData } from '../stores/appData'

const editing = ref(false)
const savedMessage = ref('')
const form = reactive({ ...appData.profile })

watch(() => appData.profile, value => Object.assign(form, value), { deep: true })

function startEditing() {
  Object.assign(form, appData.profile)
  savedMessage.value = ''
  editing.value = true
}
function saveProfile() {
  if (!form.name.trim() || !form.email.trim()) return
  Object.assign(appData.profile, { ...form, name: form.name.trim(), email: form.email.trim() })
  editing.value = false
  savedMessage.value = 'Your profile has been saved.'
}
</script>

<template>
  <section class="page-intro">
   
    <button v-if="!editing" class="btn btn-primary" @click="startEditing"><span>✎</span> Edit profile</button>
  </section>

  <div v-if="savedMessage" class="success-message">✓ {{ savedMessage }}</div>

  <section class="profile-layout">
    <article class="panel profile-card">
      <div class="profile-cover"><div class="cover-orb orb-one"></div><div class="cover-orb orb-two"></div></div>
      <div class="profile-main-avatar">{{ (appData.profile.name || 'S').charAt(0).toUpperCase() }}</div>
      <div class="profile-identity"><h2>{{ appData.profile.name }}</h2><p>{{ appData.profile.course }}</p><span class="status-badge status-complete">{{ appData.profile.yearLevel }}</span></div>
      <div class="profile-divider"></div>
      <div class="profile-detail"><span class="detail-icon">✉</span><div><small>Email address</small><strong>{{ appData.profile.email }}</strong></div></div>
      <div class="profile-detail"><span class="detail-icon">▤</span><div><small>Student ID</small><strong>{{ appData.profile.studentId || 'Not provided' }}</strong></div></div>
      <div class="profile-detail"><span class="detail-icon">♙</span><div><small>Year level</small><strong>{{ appData.profile.yearLevel }}</strong></div></div>
    </article>

    <article class="panel profile-edit-panel">
      <div class="panel-heading"><div><p class="section-eyebrow" style="margin: 0">PERSONAL INFORMATION</p><h3>{{ editing ? 'Edit your details' : 'Profile details' }}</h3></div></div>
      <form v-if="editing" class="form-grid profile-form" @submit.prevent="saveProfile">
        <label class="field full-width"><span>Full name *</span><input v-model="form.name" required maxlength="100" /></label>
        <label class="field full-width"><span>Email address *</span><input v-model="form.email" type="email" required maxlength="150" /></label>
        <label class="field"><span>Student ID</span><input v-model="form.studentId" maxlength="40" /></label>
        <label class="field"><span>Course / strand</span><input v-model="form.course" maxlength="100" /></label>
        <label class="field full-width"><span>Year level</span><input v-model="form.yearLevel" maxlength="50" /></label>
        <label class="field full-width"><span>About me</span><textarea v-model="form.bio" rows="4" maxlength="400"></textarea></label>
        <div class="form-actions full-width"><button type="button" class="btn btn-ghost" @click="editing = false">Cancel</button><button class="btn btn-primary" type="submit">Save changes</button></div>
      </form>
      <div v-else class="profile-readonly">
        <div><span>Full name</span><strong>{{ appData.profile.name }}</strong></div>
        <div><span>Email address</span><strong>{{ appData.profile.email }}</strong></div>
        <div><span>Student ID</span><strong>{{ appData.profile.studentId || 'Not provided' }}</strong></div>
        <div><span>Course / strand</span><strong>{{ appData.profile.course }}</strong></div>
        <div><span>Year level</span><strong>{{ appData.profile.yearLevel }}</strong></div>
        <div><span>About me</span><p>{{ appData.profile.bio || 'No description added yet.' }}</p></div>
        <button class="btn btn-secondary" @click="startEditing">Update information</button>
      </div>
    </article>
  </section>
</template>
