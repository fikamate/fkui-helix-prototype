# 🚀 HELIX + FKUI Automatiserat Arbetsflöde

## 🎯 **REVOLUTIONEN: Automatisk designsystem-integration!**

Du har nu ett **fullständigt automatiserat system** som mappar ditt
Helix-designsystem till FKUI-komponenter. Ingen manuell CSS krävs längre!

## 📊 **Vad systemet gjorde:**

✅ **Skannade 467 FKUI-variabler** automatiskt  
✅ **Intelligenta mappningar: 409** (87.6% smart matchning!)  
✅ **Fallback mappningar: 58** (12.4% använder neutrala färger)  
✅ **Genererade komplett bridge** mellan Helix och FKUI

---

## 🔄 **Ditt nya arbetsflöde (SUPER ENKELT!):**

### **🎨 Ändra designsystem (Helix-tokens)**

**Fil:** `src/css/semantic.css` eller `src/css/foundation.css`

```scss
/* Ändra dina Helix färger här: */
--helix-color-surface-primary-default: var(--helix-color-pink-900);     ← Ändra till din färg
--helix-color-surface-secondary-default: var(--helix-color-yellow-300); ← Ändra till din färg
--helix-spacing-md: 16px;                                               ← Ändra spacing
--helix-radius-md: 8px;                                                 ← Ändra border-radius
```

**✅ Resultat:** ALLA FKUI-komponenter uppdateras automatiskt!

### **🔄 Regenerera bridge (vid Helix-ändringar)**

```bash
# När du ändrat Helix tokens, regenerera bridge:
npm run generate-helix-bridge

# Eller regenerera allt:
npm run generate-all

# Starta/restarta servern:
npm start
```

**✅ Resultat:** Alla mappningar uppdateras automatiskt!

### **🆕 Nya FKUI-komponenter (sällan)**

```bash
# När FKUI uppdateras med nya komponenter:
npm run generate-all    # Regenererar både FKUI-scan och Helix-bridge
```

---

## 🧠 **Intelligenta mappningar som systemet gjorde:**

### **🎨 Färgmappningar:**

| FKUI Variabel                   | Helix Token                             |
| ------------------------------- | --------------------------------------- |
| `--f-background-button-primary` | `--helix-color-surface-primary-default` |
| `--f-background-badge-success`  | `--helix-color-surface-success-default` |
| `--f-background-badge-error`    | `--helix-color-surface-error-default`   |
| `--f-background-badge-warning`  | `--helix-color-surface-warning-default` |
| `--f-text-color-primary`        | `--helix-color-text-primary-default`    |
| `--f-border-color-primary`      | `--helix-color-border-primary-default`  |

### **📏 Spacing mappningar:**

| FKUI Variabel                | Helix Token          |
| ---------------------------- | -------------------- |
| `--f-button-primary-padding` | `--helix-spacing-md` |
| `--f-spacing-sm`             | `--helix-spacing-sm` |
| `--f-spacing-lg`             | `--helix-spacing-lg` |

### **🔲 Border radius:**

| FKUI Variabel              | Helix Token         |
| -------------------------- | ------------------- |
| `--f-border-radius-medium` | `--helix-radius-md` |
| `--f-border-radius-small`  | `--helix-radius-sm` |

### **💧 Shadows:**

| FKUI Variabel       | Helix Token         |
| ------------------- | ------------------- |
| `--f-button-shadow` | Helix shadow system |
| `--f-modal-shadow`  | Helix shadow system |

---

## 📁 **Aktiv filstruktur (uppdaterad):**

### ✅ **AUTOMATISKT GENERERADE:**

```
src/styles/
├── helix-fkui-bridge.scss     ← 🤖 HUVUDFILEN - Intelligent bridge
├── fkui-css-variables-reference.scss ← 🤖 FKUI variabel-referens
└── components/                ← 🤖 Komponent-specifika stilar
    ├── text-field/
    │   ├── _text-field.scss   ← Helix-anpassade text field stilar
    │   ├── variations.scss    ← Size/state variations
    │   └── text-field.scss    ← Index fil
    ├── label/
    │   ├── _label.scss        ← Helix-anpassade label stilar
    │   └── label.scss         ← Index fil
    └── page-layout/
        └── page-layout.scss   ← Layout-specifika stilar
```

### 🎨 **DITT DESIGNSYSTEM:**

```
src/css/
├── foundation.css             ← 🎨 Dina grund-tokens (färger, spacing)
├── semantic.css              ← 🎨 Dina semantiska tokens (primary, success, etc)
└── index.css                 ← 🎨 Import av ovan
```

### 🛠️ **MANUELLT REDIGERBARA:**

```
src/
├── local.scss                ← 🛠️ Huvudimport-fil för alla stilar
├── components/
│   ├── index.scss            ← 🛠️ Import av komponent-stilar
│   └── _all.scss             ← 🛠️ Forward av alla komponenter
└── App.vue                   ← 🛠️ Layout-specifik styling
```

---

## 💡 **Fördelarna med nya systemet:**

### 🎯 **Designsystem-driven:**

- **Ändra en gång** → Påverkar alla komponenter
- **Konsekvent** → Samma spacing/färger överallt
- **Skalbart** → Enkelt att underhålla

### 🤖 **Automatiserat:**

- **467 variabler** mappade automatiskt
- **87.6% intelligent matchning** baserat på semantik
- **Bara 58 fallbacks** som använder neutrala färger

### 🧠 **Intelligent:**

---

## 🆕 **Lägga till nya Helix-komponenter:**

### **1. Skapa komponent-mapp:**
```bash
mkdir src/styles/components/ny-komponent
```

### **2. Skapa komponent-stilar:**
```scss
// src/styles/components/ny-komponent/_ny-komponent.scss
@use '@fkui/design/src/core' as core;

.ny-komponent {
  // Använd Helix variabler
  background: var(--helix-color-surface-primary-default);
  color: var(--helix-color-text-base-white);
  padding: core.densify(var(--helix-spacing-md));
  border-radius: var(--helix-radius-md);
}
```

### **3. Skapa index-fil:**
```scss
// src/styles/components/ny-komponent/ny-komponent.scss
@use '_ny-komponent';
```

### **4. Lägg till i _all.scss:**
```scss
// src/components/_all.scss
@forward '../styles/components/text-field/text-field';
@forward '../styles/components/label/label';
@forward '../styles/components/ny-komponent/ny-komponent';  ← Lägg till denna
```

### **5. Starta om servern:**
```bash
npm start
```

**✅ Resultat:** Din nya komponent använder automatiskt Helix Design System!

- **Semantisk mappning** → "primary" → "primary", "success" → "success"
- **Kategoriserad** → Buttons, badges, spacing, shadows grupperade
- **Komponent-specifik** → Olika mappning för olika komponenttyper

---

## 🎨 **Exempel på hur enkelt det nu är:**

### **Scenario: Ändra all primary färg från rosa till blå**

**Innan (manuellt):**

```scss
/* Du behövde ändra 50+ variabler manuellt: */
--helix-color-surface-primary-default: #2563eb;
--f-background-button-primary: var(--helix-color-surface-primary-default);
--f-background-pageheader-primary: var(--helix-color-surface-primary-default);
--f-icon-color-primary: var(--helix-color-icon-primary-default);
/* + 47 fler... */
```

**Nu (automatiskt):**

```scss
/* src/css/semantic.css - BARA EN ÄNDRING: */
--helix-color-surface-primary-default: var(--helix-color-blue-600);
```

**✅ Alla 50+ FKUI-variabler uppdateras automatiskt!**

### **Scenario: Ändra alla border-radius från 4px till 8px**

**Före:**

```scss
/* Manuellt hitta och ändra alla radius-variabler */
--helix-radius-md: 8px;
--f-border-radius-medium: var(--helix-radius-md);
--f-border-radius-small: var(--helix-radius-sm);
/* + många fler... */
```

**Nu:**

```scss
/* src/css/foundation.css - EN ÄNDRING: */
--helix-spacing-20: 8px; /* = --helix-radius-md */
```

**✅ Alla border-radius uppdateras automatiskt!**

---

## 🚀 **Konkret exempel för dig idag:**

### **1. Testa den rosa/gul färgschemat (redan aktivt):**

```bash
# Kolla Helix tokens:
code src/css/semantic.css

# Leta efter dessa rader:
--helix-color-surface-primary-default: var(--helix-color-pink-900);     # Rosa primary
--helix-color-surface-secondary-default: var(--helix-color-yellow-300); # Gul secondary

# Starta appen:
npm start

# Gå till http://localhost:5173 och se resultatet!
```

### **2. Ändra till blå/grön schema:**

```scss
/* src/css/semantic.css - Ändra bara dessa: */
--helix-color-surface-primary-default: var(--helix-color-blue-600);     # Blå primary
--helix-color-surface-secondary-default: var(--helix-color-green-300);  # Grön secondary
```

### **3. Regenerera och se förändringen:**

```bash
npm run generate-helix-bridge  # Uppdatera bridge
# Browsern uppdaterar automatiskt!
```

---

## 🎯 **Sammanfattning: Ditt arbetsflöde nu:**

### **90% av tiden:**

```bash
1. Öppna: src/css/semantic.css
2. Ändra: --helix-color-surface-primary-default
3. Spara: Cmd+S
4. Se: Alla FKUI-komponenter uppdateras automatiskt!
```

### **5% av tiden:**

```bash
npm run generate-helix-bridge  # Vid större Helix-ändringar
```

### **5% av tiden:**

```bash
npm run generate-all           # Vid nya FKUI-komponenter
```

**Det är det! Maximalt automatiserat, minimalt manuellt arbete.** 🚀✨

---

**🎉 Du har nu ett professionellt, skalbart designsystem som automatiskt håller
FKUI och Helix synkroniserade!**
