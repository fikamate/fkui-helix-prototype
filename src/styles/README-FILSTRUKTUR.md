# FKUI Styling Filstruktur

## 📁 Vilka filer är automatiskt genererade?

### ✅ AUTOMATISKT GENERERADE (Rör ej!)

```
src/styles/
├── generated-fkui-overrides.scss  ← Genereras av scriptet
└── generated-fkui-overrides.css   ← Kopia av ovan
```

**Vad gör scriptet:**

- Skannar `node_modules/@fkui` för CSS-variabler
- Hittar 467 variabler som `--f-background-pageheader-primary`
- Mappar dem till `var(--my-primary-color)` osv
- Skriver allt till `generated-fkui-overrides.scss`

### 🛠️ MANUELLA FILER (Du redigerar)

```
src/
├── local.scss                     ← FKUI imports + dina custom overrides
└── App.vue <style>               ← Layout-specifik styling
```

## 🎯 Så här använder du systemet:

### 1. För FKUI-komponenter (automatiskt)

```vue
<f-page-header>Header</f-page-header>
<f-button type="primary">Knapp</f-button>
<!-- Dessa stylas automatiskt av generated-fkui-overrides.scss -->
```

### 2. För layout areas (manuellt)

```vue
<style scoped>
/* Detta måste du lägga till själv i App.vue */
::part(area header) {
  background: var(--my-primary-color) !important;
}
</style>
```

### 3. Design tokens (manuellt)

```scss
/* Detta redigerar du i generated-fkui-overrides.scss */
:root {
    --my-primary-color: #ff6b35;  ← Ändra här
    --my-secondary-color: #004e89;
}
```

## 🚨 Viktigt!

### ✅ GÖR:

- Ändra färgvärdena i `:root` sektionen i `generated-fkui-overrides.scss`
- Lägg till layout-styling i `App.vue`
- Kör `npm run generate-fkui-vars` för att uppdatera

### ❌ GÖR INTE:

- Redigera FKUI-mappningarna i generated-filen (kommer skrivas över)
- Blanda genererad styling med manuell styling i samma fil
- Glöm att importera den genererade filen

## 🔄 Workflow:

1. **Ändra färger**: Redigera `:root` i `generated-fkui-overrides.scss`
2. **Lägg till FKUI-komponenter**: Kör `npm run generate-fkui-vars`
3. **Styla layout**: Lägg till CSS i `App.vue`
4. **Testa**: `npm start`
