# FKUI + Helix Design System Prototype

⚠️ **Experimentell prototyp** - Automatisk mappning mellan FKUI-komponenter och Helix designsystem. Många mappningar är inte semantiskt korrekta än.

## 🎯 Översikt

Detta projekt innehåller:

- **Helix ↔ FKUI Bridge** - Automatisk variabelmappning (experimentell)
- **467 Variabelmappningar** - Många behöver manuell justering
- **Vue.js Integration** - Grundläggande applikation med FKUI + Helix
- **Automated Workflows** - Verktyg för regenerering av mappningar
- **Dokumentation** - Teknisk guide och framtida Figma API-integration

## 🚀 Snabbstart

### 1. Installation & Setup

```bash
# Klona projektet
git clone https://github.com/fikamate/fkui-helix-prototype.git
cd fkui-helix-prototype

# Kräver Node.js 22+ (använd nvm)
nvm use 22

# Installera dependencies
npm install

# Generera Helix ↔ FKUI bridge
npm run generate-helix-bridge
```

### 2. Helix Design System är förinstallerat

Helix foundation och semantic tokens finns redan i `src/css/`:

```
src/css/
├── foundation.css    # Bas-tokens (färger, spacing, typografi)
├── semantic.css      # Semantiska tokens (surface, text, border)
└── index.css         # Import av alla Helix-tokens
```

**Automatisk bridge:** `src/styles/helix-fkui-bridge.scss` innehåller 467 mappningar:

```scss
:root {
  /* FKUI Primary → Helix Primary */
  --f-background-pageheader-primary: var(--helix-color-surface-primary-default);
  --f-background-button-primary: var(--helix-color-surface-primary-default);

  /* FKUI Success → Helix Success */
  --f-background-badge-success: var(--helix-color-surface-success-default);
  --f-color-success-medium: var(--helix-color-text-success-default);

  /* Icon storlekar → Helix typografi */
  --f-icon-size-large: var(--helix-typography-font-size-display-xs); /* 24px */
  --f-icon-size-medium: var(--helix-typography-font-size-text-xl); /* 20px */
  --f-icon-size-small: var(--helix-typography-font-size-text-md); /* 16px */
}
```

### 3. ⚠️ Nuvarande Status

**Detta är en experimentell prototyp med kända begränsningar:**

- 🚧 Många element renderas med grå färger istället för Helix-färger
- 🔍 Automatiska mappningar fungerar bara delvis
- ⚙️ Kräver manuell CSS-finjustering för korrekt utseende
- 📋 Använd som utgångspunkt, inte som färdig lösning

### 4. Starta utveckling

**Vue.js Applikation (App.vue):**

```bash
# Säkerställ att Node.js 22+ används
nvm use 22

# Starta Vue utvecklingsservern
npm start
# Går till http://localhost:5173 (Vite default port)
```

**Alternativt: HTML Demo (demo.html):**

```bash
# Enkel demo utan Vue/Vite beroenden
python3 -m http.server 8080
# Gå till http://localhost:8080/demo.html
```

**📝 Skillnader:**

- **App.vue** - Fullständig Vue-applikation med FKUI layout-komponenter, router, och interaktiva views
- **demo.html** - Statisk demonstration av CSS variables systemet med grundläggande HTML/CSS

**⚠️ Node.js Version Problem:**
Om `npm start` inte fungerar på grund av Node-versionen:

```bash
# Använd nvm för att växla till Node 22
nvm use 22

# Eller kör vårt hjälpscript
./start-vue-app.sh
```

## 🛠️ Helix ↔ FKUI Bridge System

### Intelligent Semantic Mapping

Bridge-systemet använder semantisk analys för att automatiskt mappa FKUI-variabler till Helix design tokens:

```javascript
// Exempel från generate-helix-fkui-bridge.js
function mapFKUIToHelix(fkuiVar) {
  // Primary färger
  if (varName.includes("primary") && varName.includes("background")) {
    return "var(--helix-color-surface-primary-default)";
  }

  // Icon storlekar → Typography tokens
  if (varName.includes("icon") && varName.includes("size")) {
    if (varName.includes("large")) {
      return "var(--helix-typography-font-size-display-xs)"; // 24px
    }
  }

  // Spacing → Helix spacing system
  if (varName.includes("padding")) {
    return "var(--helix-spacing-50)"; // 20px
  }
}
```

### Automatisk Variable Discovery

Scriptet `generate-fkui-variables.js` gör följande:

1. **Skannar FKUI** - Letar igenom alla CSS-filer i `node_modules/@fkui`
2. **Extraherar variabler** - Hittar alla CSS custom properties (`--f-*`, `--fkds-*`)
3. **Kategoriserar intelligent** - Sorterar i kategorier baserat på variabelnamn
4. **Genererar mappningar** - Skapar SCSS-fil med mappningar till dina designtokens

### Intelligent Mappning

Scriptet mappar automatiskt FKUI-variabler till dina tokens baserat på användning:

| FKUI Variabel                       | Mappas till           | Syfte                |
| ----------------------------------- | --------------------- | -------------------- |
| `--f-background-pageheader-primary` | `--my-primary-color`  | Page header bakgrund |
| `--f-button-primary-background`     | `--my-primary-color`  | Primär knapp         |
| `--f-button-primary-hover`          | `--my-primary-hover`  | Knapp hover state    |
| `--f-text-color-secondary`          | `--my-text-secondary` | Sekundär text        |
| `--f-color-success`                 | `--my-success`        | Success meddelanden  |
| `--f-color-warning`                 | `--my-warning`        | Varningar            |
| `--f-color-error`                   | `--my-error`          | Felmeddelanden       |

### Bridge Status

**Helix ↔ FKUI Bridge Generator** hittade **467 FKUI-variabler**:

- 🔍 **Automatiska mappningar:** 423/467 (algoritmen hittar något)
- ⚠️ **Fallback till neutral:** 44/467 (generisk färg)
- 🚧 **Många semantiskt felaktiga** (t.ex. border-width → färg)

⚠️ **Nuvarande begränsningar:**

- Många mappningar är inte visuellt korrekta
- Algoritmen mappar allt till färger som fallback
- Kräver omfattande manuell justering för production-användning

Variabler fördelade på kategorier:

- **Colors**: 216 variabler (primära, sekundära, status-färger)
- **Backgrounds**: 107 variabler (headers, panels, buttons)
- **Typography**: 91 variabler (fonts, text-colors, sizes)
- **Buttons**: 79 variabler (alla knapptyper och states)
- **Borders**: 80 variabler (kanter, separatorer)
- **Spacing**: 61 variabler (margin, padding, spaces)
- **Icons**: 57 variabler (ikon-färger och storlekar)
- **Badges**: 15 variabler (status badges)
- **Shadows**: 9 variabler (box-shadows, focus)
- **Headers**: 6 variabler (page headers, navigation)
- **Navigation**: 1 variabel
- **Other**: 30 variabler (diverse layout-element)

## 📁 Projektstruktur

```
fkui-page-layout-proto/
├── README.md                                    # Denna fil
├── demo.html                                    # Live demonstration
├── generate-fkui-variables.js                  # Huvudscript för variabelgenerering
├── package.json                                 # Dependencies & scripts
├── .nvmrc                                       # Node.js version (22.20.0)
│
├── src/
│   ├── main.ts                                  # Vue app entry point
│   ├── App.vue                                  # Huvudkomponent med layout
│   ├── local.scss                               # FKUI imports & overrides
│   │
│   ├── components/                              # Vue komponenter
│   │   ├── XContextBar.vue                     # Context bar
│   │   ├── XToolbar.vue                        # Toolbar
│   │   └── ...                                 # Andra komponenter
│   │
│   ├── styles/
│   │   ├── generated-fkui-overrides.scss       # 🔄 Auto-genererad mappningsfil
│   │   ├── design-tokens.scss                  # Gamla design tokens
│   │   └── fkui-css-variables-reference.scss   # Dokumentationsreferens
│   │
│   └── views/                                   # Vue route views
│       ├── XDocumentView.vue
│       └── ...
│
└── node_modules/@fkui/                          # FKUI packages
    ├── theme-default/                           # Standard tema
    ├── design/                                  # Design tokens
    └── vue/                                     # Vue komponenter
```

## 🔧 Avancerad Användning

### Uppdatera när FKUI ändras

När FKUI uppdateras med nya variabler:

```bash
npm run generate-fkui-vars
```

Detta kommer att:

- ✅ Hitta nya FKUI-variabler
- ✅ Bevara dina befintliga anpassningar
- ✅ Lägga till mappningar för nya variabler
- ✅ Kategorisera allt intelligent

### Anpassa mappningslogik

Du kan redigera funktionen `mapVariableToDesignToken()` i `generate-fkui-variables.js` för att ändra hur variabler mappas:

```javascript
// Exempel: Alla button-variabler ska använda accent-färg
if (varName.includes("button")) {
  return "--my-accent-color";
}
```

### Ändra enskilda mappningar

I den genererade `generated-fkui-overrides.scss`, ändra bara värdet:

```scss
/* Standard mappning */
--f-background-button-primary: var(--my-primary-color);

/* Ändra till accent-färg istället */
--f-background-button-primary: var(--my-accent-color);
```

## 🔍 CSS Variables Discovery Guide

### Terminal-kommandon för manuell analys

**Hitta alla FKUI variabler:**

```bash
find node_modules/@fkui -name "*.css" -exec grep -ho "\--[a-zA-Z][a-zA-Z0-9-]*:" {} \; | sed 's/:$//' | sort | uniq
```

**Filtrera på specifika kategorier:**

```bash
# Header/layout variabler
find node_modules/@fkui -name "*.css" -exec grep -ho "\--[a-zA-Z][a-zA-Z0-9-]*:" {} \; | sed 's/:$//' | sort | uniq | grep -i "header\|page"

# Bakgrund variabler
find node_modules/@fkui -name "*.css" -exec grep -ho "\--[a-zA-Z][a-zA-Z0-9-]*:" {} \; | sed 's/:$//' | sort | uniq | grep -i "background"

# Knapp variabler
find node_modules/@fkui -name "*.css" -exec grep -ho "\--[a-zA-Z][a-zA-Z0-9-]*:" {} \; | sed 's/:$//' | sort | uniq | grep -i "button"

# Spara till fil
find node_modules/@fkui -name "*.css" -exec grep -ho "\--[a-zA-Z][a-zA-Z0-9-]*:" {} \; | sed 's/:$//' | sort | uniq > all-fkui-variables.txt
```

### Browser Console JavaScript

För att inspektera variabler i realtid, öppna Developer Console på din sida:

```javascript
// Extrahera alla CSS custom properties från sidan
function extractAllCSSVariables() {
  const allVars = new Set();

  // Hämta från stylesheets
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.style) {
          for (let i = 0; i < rule.style.length; i++) {
            const prop = rule.style[i];
            if (prop.startsWith("--")) {
              allVars.add(prop);
            }
          }
        }
      }
    } catch (e) {
      console.log("Kunde inte läsa stylesheet:", sheet.href);
    }
  }

  return Array.from(allVars).sort();
}

// Kör och visa resultat
const vars = extractAllCSSVariables();
console.log("Alla CSS Variables:", vars);

// Filtrera på färg/bakgrund
const colorVars = vars.filter(
  (v) => v.includes("background") || v.includes("color")
);
console.log("Färg/Bakgrund vars:", colorVars);
```

### Inspektera specifika element

```javascript
// Hitta alla variabler på page header
const header = document.querySelector("f-page-header");
const style = getComputedStyle(header);
const headerVars = [];
for (let i = 0; i < style.length; i++) {
  const prop = style[i];
  if (prop.startsWith("--")) {
    headerVars.push(`${prop}: ${style.getPropertyValue(prop)}`);
  }
}
console.log("Page Header Variables:", headerVars);
```

## 🎨 Verifierade FKUI Variabler

Dessa variabler har testats och fungerar:

### Page Header & Layout

```scss
--f-background-pageheader-primary              // Huvudheader bakgrund ✅
--f-border-color-separator-pageheader-primary  // Header separator ✅
```

### Buttons (alla typer)

```scss
--f-background-button-primary         // Primär knapp ✅
--f-background-button-primary-hover   // Primär hover ✅
--f-background-button-secondary       // Sekundär knapp ✅
--f-background-button-secondary-hover // Sekundär hover ✅
--f-background-button-standard        // Standard knapp ✅
--f-background-button-disabled        // Inaktiverad knapp ✅
```

### Status & Badges

```scss
--f-background-badge-success    // Success badge ✅
--f-background-badge-warning    // Warning badge ✅
--f-background-badge-error      // Error badge ✅
--f-background-badge-info       // Info badge ✅
```

### Grid & Tables

```scss
--f-background-grid-header      // Tabell header ✅
--f-border-color-grid-header    // Header border ✅
--f-icon-color-table-header     // Header ikoner ✅
```

## 🚀 NPM Scripts

```json
{
  "scripts": {
    "start": "vite", // Starta Vue dev server
    "build": "vite build --mode development", // Bygga för produktion
    "generate-helix-bridge": "node generate-helix-fkui-bridge.js", // Regenerera bridge
    "generate-all": "npm run generate-fkui-vars && npm run generate-helix-bridge", // Alla scripts
    "generate-fkui-vars": "node generate-fkui-variables.js" // Legacy FKUI scanner
  }
}
```

## 🔧 Teknisk Implementation

### Vue.js Integration

I `App.vue` använder vi Shadow Parts och `:deep()` selectors:

```vue
<style scoped>
/* Shadow Parts styling */
::part(area header) {
  --f-background-pageheader-primary: var(--my-primary-color) !important;
}

/* Deep styling för FKUI komponenter */
:deep(f-page-header) {
  --f-background-pageheader-primary: var(--my-primary-color);
}

/* Layout areas med custom färger */
::part(area contextbar) {
  background: var(--my-secondary-color) !important;
}

::part(area left) {
  background: var(--my-surface) !important;
  border: 2px solid var(--my-accent-color) !important;
}
</style>
```

### SCSS Structure

`src/local.scss` importerar allt:

```scss
/* FKUI tema (måste komma först) */
@use "@fkui/theme-default";
@use "@fkui/design";
@use "@fkui/design/lib/fonts.css";

/* Importera automatiskt genererade overrides */
@import "./styles/generated-fkui-overrides.scss";

/* Resterande anpassningar... */
```

## 🔍 Troubleshooting

### Problem: Node.js version

**Fel:** "You are using Node.js X.X.X. Vite requires Node.js version 20.19+ or 22.12+"

**Lösning:**

```bash
# Använd nvm för att växla version
nvm use 22.20.0

# Eller installera via .nvmrc
nvm use

# Sätt PATH permanent (lägg i ~/.zshrc)
export PATH="$HOME/.nvm/versions/node/v22.20.0/bin:$PATH"
```

### Problem: Ändringar syns inte

1. **Kontrollera import:** Se till att `generated-fkui-overrides.scss` importeras i `local.scss`
2. **CSS specificitet:** Lägg till `!important` om nödvändigt
3. **Browser cache:** Hårt refresh med Cmd/Ctrl + Shift + R
4. **DevTools:** Inspektera elementet för att se vilka variabler som faktiskt används

### Problem: Script kraschar

```bash
# Kontrollera att FKUI är installerat
ls -la node_modules/@fkui

# Reinstallera om det behövs
rm -rf node_modules package-lock.json
npm install

# Kör scriptet manuellt
node generate-fkui-variables.js
```

### Problem: Inga synliga ändringar

**Orsak:** Vissa FKUI-variabler används kanske inte av komponenter du testar.

**Lösning:**

1. Inspektera elementet i DevTools
2. Titta på "Computed" tab
3. Sök efter din variabel
4. Om den inte finns, testa en annan variabel eller komponent

## 🎯 Fördelar med detta system

### ✅ Automatisering

- **467+ variabler** automatiskt kategoriserade och mappade
- **Ett kommando** uppdaterar allt när FKUI ändras
- **Noll manuellt arbete** för att hitta nya variabler

### ✅ Skalbarhet

- Hanterar enkelt hundratals variabler
- Intelligent kategorisering baserat på användning
- Future-proof för FKUI-uppdateringar

### ✅ Underhållsbarhet

- **Centraliserat system** - alla anpassningar på ett ställe
- **Preserved customizations** - dina ändringar bevaras vid uppdatering
- **Clear documentation** - varje mappning är kommenterad

### ✅ Utvecklarupplevelse

- **IntelliSense support** via CSS custom properties
- **Live demo** för att testa ändringar
- **Comprehensive docs** för troubleshooting

## 📚 Ytterligare Resurser

- **FKUI Dokumentation:** [Försäkringskassan Design System](https://designsystem.forsakringskassan.se/)
- **CSS Custom Properties:** [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- **Vue.js Styling:** [Vue Style Guide](https://vuejs.org/guide/essentials/class-and-style.html)
- **Shadow DOM & Parts:** [MDN ::part()](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)

---

## 🎉 Demo

Öppna `demo.html` i din webbläsare eller kör:

```bash
python3 -m http.server 8080
# Gå till http://localhost:8080/demo.html
```

För att se en komplett demonstration av variabelsystemet med interaktiva element och färgexempel!

**Lycka till med ditt FKUI-projekt! 🚀**
