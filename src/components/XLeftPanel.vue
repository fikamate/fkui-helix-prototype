<script setup lang="ts">
import { FMinimizablePanel } from '@fkui/vue';

const sourceUrl =
  'https://github.com/Forsakringskassan/designsystem/blob/main/examples/page-layout/src/App.vue';
</script>

<template>
  <f-minimizable-panel>
    <template #default="{ isOpen, header, footer, content }">
      <template v-if="isOpen">
        <h1 :slot="header">Navigation</h1>
        <nav :slot="content">
          <router-link to="/">Översikt</router-link>
          <router-link to="/journal">Journal</router-link>
          <router-link to="/documents">Dokument</router-link>
          <router-link to="/textfield-demo">TextField Demo</router-link>
        </nav>
        <div :slot="footer">
          <a
            class="anchor"
            :href="sourceUrl"
            target="_blank"
            >Visa källkod</a
          >
        </div>
      </template>
    </template>
  </f-minimizable-panel>
</template>

<style scoped>
/* FKUI navigation styling via bridge system */
nav {
  display: flex;
  flex-direction: column;
  gap: var(--helix-spacing-20);
  padding: var(--helix-spacing-20) 0;
}

nav a {
  padding: var(--helix-spacing-20) var(--helix-spacing-30);
  color: var(--helix-color-text-primary-default);
  text-decoration: none;
  border-radius: var(--helix-radius-md);
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

nav a:hover {
  background: var(--helix-color-surface-primary-weak);
  border-color: var(--helix-color-border-primary-default);
}

nav a.router-link-active {
  background: var(--helix-color-surface-primary-default);
  color: var(--helix-color-text-base-white);
}
</style>
