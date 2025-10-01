<template>
  <div>
    <h2>FTextField Komponenter</h2>

    <!-- Grundläggande FTextField -->
    <FTextField v-model="basicValue">
      <template #label>
        <FLabel for="basic">Användarnamn</FLabel>
      </template>
    </FTextField>

    <!-- FTextField med FIcon -->
    <FTextField v-model="emailValue">
      <template #label>
        <FLabel for="email">
          <FIcon
            name="user"
            size="small"
          />
          E-postadress
        </FLabel>
      </template>
    </FTextField>

    <!-- FTextField med FTooltip -->
    <FTextField v-model="passwordValue">
      <template #label>
        <FLabel for="password">
          Lösenord
          <FTooltip
            screen-reader-text="Visa hjälpinformation"
            close-button-text="Stäng"
          >
            <template #header>Lösenordskrav</template>
            Minst 8 tecken, innehålla stora och små bokstäver samt siffror
          </FTooltip>
        </FLabel>
      </template>
    </FTextField>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FTextField, FLabel, FIcon, FTooltip } from '@fkui/vue';
import HxTextField from './hx-textfield/HxTextField.vue';

const basicValue = ref('');
const emailValue = ref('');
const passwordValue = ref('');
</script>

<style scoped>
/* Minimal styling - FKUI och Helix hanterar det mesta */
</style>
