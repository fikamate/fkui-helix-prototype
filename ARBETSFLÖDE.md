# 🔄 FKUI Styling Arbetsflöde

## 🚀 Snabbstart (Första gången)

```bash
# 1. Säkerställ rätt Node-version
nvm use 22

# 2. Installera dependencies
npm install

# 3. Generera FKUI-mappningar
npm run generate-fkui-vars

# 4. Starta utvecklingsserver
npm start

# 5. Öppna i browser
# → http://localhost:5173/
```

## 🎨 Dagligt arbetsflöde

### ✅ **VANLIGASTE: Ändra färger och design tokens**

**Fil:** `src/styles/generated-fkui-overrides.css` (eller .scss)

```bash
# 1. Öppna filen
code src/styles/generated-fkui-overrides.css

# 2. Scrolla till :root sektionen (cirka rad 10-30)

# 3. Ändra dina färger:
--my-primary-color: #ff6b35;      ← Din orangea
--my-secondary-color: #004e89;    ← Din blåa
--my-accent-color: #1a535c;       ← Din accent
--my-success: #28a745;            ← Success grön
--my-warning: #ffc107;            ← Warning gul
--my-error: #dc3545;              ← Error röd

# 4. Spara (Cmd/Ctrl + S)

# 5. Se förändringen direkt i browsern (hot reload)
```

**✅ Resultat:** Alla FKUI-komponenter (headers, knappar, ikoner) uppdateras automatiskt!

---

### 🆕 **IBLAND: Lägga till nya FKUI-komponenter**

**När:** Du lägger till `<f-button>`, `<f-modal>`, `<f-table>` etc.

```bash
# 1. Lägg till komponenten i din Vue-fil
# Exempel i App.vue eller någon komponent:
<f-button type="primary">Min knapp</f-button>
<f-badge type="success">Status</f-badge>
<f-modal>Modal content</f-modal>

# 2. Uppdatera automatiska mappningar
npm run generate-fkui-vars

# 3. Kontrollera nya variabler (valfritt)
code src/styles/generated-fkui-overrides.css
# Sök efter "button", "badge", "modal" etc.

# 4. Browsern uppdaterar automatiskt
```

**✅ Resultat:** Nya komponenter får automatiskt dina färger!

---

### 🎯 **SÄLLAN: Manuell layout-styling**

**När:** Du vill ändra `::part(area xxx)`, gradients, borders, etc.

**Fil:** `src/App.vue` (i `<style scoped>` sektionen)

```bash
# 1. Öppna App.vue
code src/App.vue

# 2. Scrolla till <style scoped> (längst ner)

# 3. Hitta eller lägg till styling:
::part(area header) {
    background: linear-gradient(135deg,
        var(--my-primary-color),
        var(--my-secondary-color)) !important;
    border-bottom: 3px solid var(--my-accent-color) !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
}

# 4. Spara och se resultatet
```

**✅ Resultat:** Layout areas får custom styling!

---

## 🔍 **Troubleshooting arbetsflöde**

### ❌ Problem: "Mina färger syns inte"

```bash
# 1. Kontrollera att servern körs
npm start

# 2. Kontrollera att rätt fil importeras
code src/local.scss
# → Ska innehålla: @import "./styles/generated-fkui-overrides.scss";

# 3. Hård refresh i browser
Cmd/Ctrl + Shift + R

# 4. Kontrollera i DevTools
# → Högerklicka → Inspect → Console (kolla efter fel)
```

### ❌ Problem: "Node version fel"

```bash
# 1. Växla Node-version
nvm use 22

# 2. Eller använd ditt script
node start-vue.js
```

### ❌ Problem: "Nya komponenter får inte mina färger"

```bash
# 1. Kör scriptet igen
npm run generate-fkui-vars

# 2. Kontrollera att komponenten finns i generated-filen
code src/styles/generated-fkui-overrides.css
# Sök efter komponentnamnet

# 3. Om inte - komponenten kanske använder andra variabler
# Lägg till manuellt i App.vue
```

---

## 📁 **Filöversikt - Vad rör du?**

### ✅ **REDIGERAR OFTA:**

- `src/styles/generated-fkui-overrides.css` ← Färger här!
- `src/App.vue` ← Layout styling här

### ⚙️ **KÖR IBLAND:**

- `npm run generate-fkui-vars` ← Vid nya komponenter
- `npm start` ← Starta server

### 🚫 **RÖR EJ:**

- `node_modules/`
- `package-lock.json`
- FKUI-mappningarna i generated-filen (endast `:root` sektionen!)

---

## ⚡ **Pro tips för effektivt arbete:**

### 💡 **Snabba färgändringar:**

```bash
# 1. Ha generated-fkui-overrides.css öppen i en tab
# 2. Ha browsern öppen bredvid
# 3. Ändra färg → Spara → Se direkt resultat
# 4. Upprepa tills nöjd
```

### 💡 **Testa många komponenter:**

```vue
<!-- Lägg till i en testvy för att se alla färger: -->
<f-button type="primary">Primary</f-button>
<f-button type="secondary">Secondary</f-button>
<f-badge type="success">Success</f-badge>
<f-badge type="warning">Warning</f-badge>
<f-badge type="error">Error</f-badge>
```

### 💡 **DevTools för felsökning:**

```bash
# 1. Högerklicka på element → Inspect
# 2. Titta på Computed styles
# 3. Sök efter "my-primary-color" etc.
# 4. Se vilka CSS-variabler som faktiskt används
```

---

## 🎯 **Sammanfattning - Ditt typiska arbetsflöde:**

1. **90% av tiden:** Ändra färger i `generated-fkui-overrides.css`
2. **5% av tiden:** Kör `npm run generate-fkui-vars` för nya komponenter
3. **5% av tiden:** Lägg till manuell CSS i `App.vue`

**Det är det! Enkelt och förutsägbart.** 🚀
