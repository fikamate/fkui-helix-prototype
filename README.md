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

## Script-kommanden

### Utveckling

```bash
# Starta utvecklingsservern (rekommenderat)
npm run start

# Alternativ: direkt Vite
npm run dev

# Bygg applikationen
npm run build

# Rensa byggnader
npm run clean
```

### Helix Bridge System

```bash
# Regenerera automatisk bridge mellan Helix och FKUI
npm run generate-helix-bridge

# Analysera specifik FKUI-komponent och generera Helix overrides
npm run analyze-component <komponent-namn>

# Exempel:
npm run analyze-component text-field
npm run analyze-component button
npm run analyze-component badge
```

## Script-översikt

### 🎯 **generate-helix-fkui-bridge.js**
**Syfte:** Skapar automatisk mappning mellan Helix Design System och FKUI CSS-variabler

**Vad den gör:**
- Läser alla Helix tokens från `src/css/semantic.css` och `src/css/foundation.css`
- Analyserar FKUI:s CSS-variabler från `@fkui/design`
- Skapar intelligent semantisk mappning (färg→färg, spacing→spacing)
- Genererar `src/styles/helix-fkui-bridge.scss` med 467+ automatiska mappningar
- 87.6% intelligent matchning baserat på semantik

**När köra:** Efter uppdateringar av Helix tokens eller FKUI-version

### 🚀 **start-vue.js**  
**Syfte:** Startar Vue-applikationen med Node-versionsvalidering

**Vad den gör:**
- Kontrollerar att Node.js version är 20+
- Startar Vite dev-server med rätt konfiguration
- Hanterar port-konflikter automatiskt
- Visar användbar debug-information

### 🎯 **analyze-fkui-component.js** ⭐ REKOMMENDERAT
**Syfte:** Analyserar specifika FKUI-komponenter och genererar Helix overrides

**Hur du använder det:**
```bash
npm run analyze-component text-field
npm run analyze-component button  
npm run analyze-component badge
```

**Vad som händer:**
- Läser FKUI:s SCSS-filer direkt från `node_modules/@fkui/design`
- Extraherar alla CSS-variabler för den specifika komponenten
- Kategoriserar variabler (background, border, text, spacing, etc.)
- Genererar intelligent mappning till Helix Design System
- Skapar färdig SCSS override-fil i `src/styles/components/`

**Resultat:** Färdig fil som `_text-field-helix-overrides.scss` med korrekta Helix-mappningar

### 🔍 **extract-css-vars.js** (Legacy)
**Syfte:** Browser-baserat debugging-verktyg för CSS-variabler

**Status:** ⚠️ Ersatt av `analyze-fkui-component.js` - använd det istället!

## 🚀 Komponent-Integration Workflow

### Steg-för-steg: Lägga till ny FKUI-komponent med Helix styling

1. **Analysera komponenten:**
   ```bash
   npm run analyze-component text-field
   ```

2. **Granska genererad override-fil:**
   ```scss
   // Fil skapas automatiskt: src/styles/components/_text-field-helix-overrides.scss
   $textfield-color-background-default: var(--helix-color-surface-primary-default);
   $textfield-color-border-default: var(--helix-color-border-default);
   $textfield-color-text-default: var(--helix-color-text-base-default);
   ```

3. **Importera i din styling:**
   ```scss
   // I src/local.scss eller komponent-specifik fil
   @import './styles/components/text-field-helix-overrides';
   ```

4. **Använd komponenten i Vue:**
   ```vue
   <script setup>
   import { FTextField } from '@fkui/vue';
   </script>
   
   <template>
     <FTextField v-model="value" />
   </template>
   ```

5. **Testa och finjustera:** Komponenten använder nu Helix Design System variabler automatiskt!

### Tillgängliga komponenter för analys:
- `text-field` - Textfält med etiketter och validering
- `button` - Knappar i olika stilar  
- `badge` - Status-märken och taggar
- `icon` - Ikoner och ikonknappar
- `label` - Etiketter för formulärfält
- `tooltip` - Hjälptexter och tooltips

## Automatiska Mappningar

Bridge-systemet mappar automatiskt:

- **467 FKUI-variabler** → Helix tokens
- **Färger:** `--f-color-primary` → `--helix-color-surface-primary-default`
- **Spacing:** `--f-spacing-md` → `--helix-spacing-md`  
- **Typografi:** `--f-font-size-base` → `--helix-typography-font-size-text-md`
- **Semantisk validering:** Förhindrar felaktiga mappningar (färg→spacing etc)

### Intelligent Mappningslogik

Bridge-scriptet använder sofistikerad regelbaserad mappning:

**Färgmappningar:**
```scss
/* Primary komponenter */
--f-background-button-primary → --helix-color-surface-primary-default
--f-text-color-button-primary → --helix-color-text-base-white
--f-background-pageheader-primary → --helix-color-surface-primary-default

/* Status-färger */
--f-background-badge-success → --helix-color-surface-success-default
--f-background-badge-error → --helix-color-surface-error-default
--f-text-color-error → --helix-color-text-error-default
```

**Spacing-system:**
```scss
/* FKUI storlekar → Helix spacing */
--f-space-small → --helix-spacing-30    (12px)
--f-space-medium → --helix-spacing-50   (20px) 
--f-space-large → --helix-spacing-80    (32px)
--f-padding-button-medium → --helix-spacing-50 (20px)
```

**Typografi:**
```scss
/* Font-sizes */
--f-font-size-small → --helix-typography-font-size-text-sm (14px)
--f-font-size-base → --helix-typography-font-size-text-md (16px)
--f-font-size-large → --helix-typography-font-size-text-lg (18px)

/* Font-weights */
--f-font-weight-medium → --helix-typography-font-weight-medium
--f-font-weight-bold → --helix-typography-font-weight-bold
```

### Semantisk Validering

Systemet förhindrar felaktiga mappningar:

- ❌ **Färg → Spacing:** `--f-color-primary` kan inte mappas till `--helix-spacing-md`
- ❌ **Typography → Färg:** `--f-font-size-base` kan inte mappas till `--helix-color-blue-500`
- ✅ **Likartad semantik:** `--f-background-primary` → `--helix-color-surface-primary-default`

### Fallback-strategi

1. **Intelligent matchning** - Semantisk analys av variabelnamn
2. **Kategori-baserad fallback** - Neutral färg för färgvariabler
3. **Hoppa över** - Behåll originalvärde om ingen lämplig mappning

## Filstruktur

```
src/
├── css/
│   ├── foundation.css         ← Helix grund-tokens (310 variabler)
│   ├── semantic.css          ← Helix semantiska tokens (116 variabler)  
│   └── index.css             ← Import av ovan
├── styles/
│   ├── helix-fkui-bridge.scss ← 🤖 Genererad bridge (467 mappningar)
│   └── components/           ← 🎯 Komponent-specifika Helix overrides
│       ├── _text-field-helix-overrides.scss
│       ├── _button-helix-overrides.scss
│       └── _badge-helix-overrides.scss
└── local.scss                ← Huvudstyling med manuella overrides

scripts/
├── generate-helix-fkui-bridge.js    ← Global bridge-generering
├── analyze-fkui-component.js        ← 🆕 Komponent-specifik analys
├── start-vue.js                     ← Utvecklingsserver
└── extract-css-vars.js              ← Legacy browser-verktyg
```
