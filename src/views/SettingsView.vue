<script setup>
import { ref } from 'vue'
import { appData } from '../stores/appData'

const savedMessage = ref('')
function toggleSetting(key, value) {
  appData.settings[key] = value
  savedMessage.value = 'Settings saved automatically.'
}
</script>

<template>
  <section class="page-intro">
    <div><h2>Adjust your preferences</h2></div>
  </section>

  <div v-if="savedMessage" class="success-message">✓ {{ savedMessage }}</div>

  <section class="settings-layout">
    <article class="panel settings-panel">
      <div class="panel-heading"><div><span class="section-eyebrow">PREFERENCES</span><h3>Workspace settings</h3></div><span class="settings-large-icon">⚙</span></div>
      <div class="setting-row">
        <div class="setting-symbol purple">☾</div><div class="setting-copy"><strong>Dark mode</strong><p>Use a darker color theme for your workspace.</p></div>
        <button class="switch" role="switch" :aria-checked="appData.settings.darkMode" :class="{ on: appData.settings.darkMode }" @click="toggleSetting('darkMode', !appData.settings.darkMode)"><span></span></button>
      </div>
      <div class="setting-row">
        <div class="setting-symbol orange">♧</div><div class="setting-copy"><strong>Notifications preference</strong><p>Enable in-app reminders and status messages.</p></div>
        <button class="switch" role="switch" :aria-checked="appData.settings.notifications" :class="{ on: appData.settings.notifications }" @click="toggleSetting('notifications', !appData.settings.notifications)"><span></span></button>
      </div>
    </article>

  </section>
</template>
