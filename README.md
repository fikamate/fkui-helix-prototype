# FKUI + Helix Design System Integration

En ren implementation av FKUI med Helix Design System integration.

## Krav

- **Node.js 20+** (du använder för närvarande 18.20.4)
- npm

## Kom igång

```bash
# Installera beroenden
npm install

# Starta utvecklingsservern
npm run dev
```

Navigera till `http://localhost:5174/` för att se applikationen.

## Struktur

- **src/App.vue** - Huvudlayout med FKUI Web Components
- **src/components/** - Vue-komponenter som använder FKUI
- **src/styles/helix-fkui-bridge.scss** - Automatisk CSS-variabel mappning
- **scripts/generate-helix-fkui-bridge.js** - Genererar bridge-filen

## FKUI Integration

Alla komponenter använder rena FKUI-komponenter från `@fkui/vue`:

```vue
<script setup>
import { FTextField, FLabel, FIcon } from '@fkui/vue';
</script>

<template>
  <FTextField v-model="value"> <template #label></template></FTextField>
</template>
```
