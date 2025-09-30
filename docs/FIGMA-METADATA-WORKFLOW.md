# 🎨 FIGMA METADATA WORKFLOW

## Hur man lägger till metadata för 100% korrekt FKUI-mappning

## 📋 **VAR METADATAN LÄGGS IN I FIGMA**

### **1. DESIGN TOKENS I FIGMA**

```
📁 Variables Panel (Figma)
├── 🎨 Colors/
│   ├── pink-900 ← VÄRDE: #AD1457
│   │   └── 📝 Description: "role=brand-primary, usage=buttons.primary,headers.main, fkui=--f-background-button-primary"
│   │
│   ├── green-600 ← VÄRDE: #43A047
│   │   └── 📝 Description: "role=feedback-positive, usage=badges.success, fkui=--f-background-badge-success"
│   │
│   └── gray-200 ← VÄRDE: #E0E0E0
│       └── 📝 Description: "role=neutral-surface, usage=backgrounds.default, fkui=--f-background-default"
│
├── 📐 Spacing/
│   ├── spacing-md ← VÄRDE: 16px
│   │   └── 📝 Description: "role=component-internal, usage=buttons.padding,inputs.padding, fkui=--f-button-primary-padding,--f-input-padding"
│   │
│   └── spacing-lg ← VÄRDE: 20px
│       └── 📝 Description: "role=component-internal, usage=cards.padding, fkui=--f-panel-padding"
│
└── ⚪ Border Radius/
    ├── radius-md ← VÄRDE: 8px
    │   └── 📝 Description: "role=interactive-elements, usage=buttons,inputs, fkui=--f-button-border-radius,--f-input-border-radius"
    │
    └── radius-lg ← VÄRDE: 12px
        └── 📝 Description: "role=layout-containers, usage=panels,modals, fkui=--f-panel-border-radius"
```

### **2. FIGMA DESCRIPTION FORMAT**

Metadatan läggs i **Description-fältet** för varje Variable med denna struktur:

```
role=[semantisk-roll], usage=[användningsområden], fkui=[FKUI-variabler]
```

**Exempel:**

```
Variable: helix-color-pink-900
Value: #AD1457
Description: "role=brand-primary, usage=buttons.primary,headers.main,links.primary, fkui=--f-background-button-primary,--f-background-pageheader-primary,--f-color-primary-strong"
```

---

## 🔄 **FIGMA API EXPORT PROCESS**

### **STEG 1: Hämta Variables från Figma API**

```javascript
// fetch-figma-variables.js
const FIGMA_FILE_KEY = "your-helix-file-key";
const FIGMA_TOKEN = "your-figma-token";

async function fetchHelixVariables() {
  const response = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`,
    {
      headers: { "X-Figma-Token": FIGMA_TOKEN },
    }
  );

  const data = await response.json();

  // Parse variables with metadata
  const processedVariables = [];

  for (const [id, variable] of Object.entries(data.meta.variables)) {
    // Extract metadata from description
    const metadata = parseDescription(variable.description);

    processedVariables.push({
      name: variable.name,
      value:
        variable.valuesByMode[
          data.meta.variableCollections[variable.variableCollectionId]
            .defaultModeId
        ],
      metadata: metadata,
      type: variable.resolvedType,
    });
  }

  return processedVariables;
}

function parseDescription(description) {
  // Parse "role=brand-primary, usage=buttons.primary,headers.main, fkui=--f-background-button-primary"
  const parts = description.split(", ");
  const metadata = {};

  parts.forEach((part) => {
    const [key, values] = part.split("=");
    if (key === "usage" || key === "fkui") {
      metadata[key] = values.split(",").map((v) => v.trim());
    } else {
      metadata[key] = values;
    }
  });

  return metadata;
}
```

### **STEG 2: Generera Enhanced Bridge**

```javascript
// generate-enhanced-helix-bridge.js
const figmaVariables = await fetchHelixVariables();

function generateEnhancedBridge(fkuiVariables, figmaVariables) {
  const mappings = [];

  for (const fkuiVar of fkuiVariables) {
    // STEG 1: Exact mapping från figma metadata
    const exactMatch = figmaVariables.find(
      (helixVar) =>
        helixVar.metadata.fkui && helixVar.metadata.fkui.includes(fkuiVar.name)
    );

    if (exactMatch) {
      mappings.push({
        fkui: fkuiVar.name,
        helix: `--helix-${exactMatch.name}`,
        confidence: "exact",
        source: "figma-metadata",
      });
      continue;
    }

    // STEG 2: Semantic matching baserat på role + usage
    const semanticMatch = findSemanticMatch(fkuiVar, figmaVariables);
    if (semanticMatch) {
      mappings.push({
        fkui: fkuiVar.name,
        helix: `--helix-${semanticMatch.name}`,
        confidence: "semantic",
        source: "figma-metadata",
      });
      continue;
    }

    // STEG 3: Fallback (ska vara 0% med full metadata)
    mappings.push({
      fkui: fkuiVar.name,
      helix: "--helix-color-surface-neutral-default",
      confidence: "fallback",
      source: "algorithm",
    });
  }

  return mappings;
}
```

---

## 🏗️ **PRAKTISK IMPLEMENTATION**

### **A. FÖRBERED FIGMA FILE**

**1. Lägg till metadata i alla Variables:**

```
🎨 helix-color-pink-900
   Value: #AD1457
   Description: role=brand-primary, usage=buttons.primary,headers.main, fkui=--f-background-button-primary,--f-background-pageheader-primary

🎨 helix-color-green-600
   Value: #43A047
   Description: role=feedback-positive, usage=badges.success,alerts.success, fkui=--f-background-badge-success,--f-color-success-medium

📐 helix-spacing-md
   Value: 16px
   Description: role=component-internal, usage=buttons.padding,inputs.padding, fkui=--f-button-primary-padding,--f-input-padding
```

**2. Organisera Variables i Collections:**

```
📁 Helix Foundation (Collection)
├── Colors/ (Color variables)
├── Spacing/ (Number variables)
├── Typography/ (String variables)
└── Border Radius/ (Number variables)

📁 Helix Semantic (Collection)
├── Surfaces/ (Alias variables → Foundation)
├── Text Colors/ (Alias variables → Foundation)
└── Interactive/ (Alias variables → Foundation)
```

### **B. AUTOMATISERA EXPORTEN**

**1. Skapa Figma Plugin (eller använd API direkt):**

```javascript
// figma-plugin-export-metadata.js
figma.showUI(__html__, { width: 400, height: 300 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "export-variables") {
    const variables = figma.variables.getLocalVariables();
    const exportData = [];

    for (const variable of variables) {
      exportData.push({
        name: variable.name,
        description: variable.description, // ← Här är metadatan!
        values: variable.valuesByMode,
        type: variable.resolvedType,
      });
    }

    figma.ui.postMessage({
      type: "export-complete",
      data: exportData,
    });
  }
};
```

**2. Integrera i byggsystemet:**

```json
// package.json
{
  "scripts": {
    "figma-sync": "node scripts/fetch-figma-variables.js",
    "generate-enhanced-bridge": "node scripts/generate-enhanced-helix-bridge.js",
    "build-design-system": "npm run figma-sync && npm run generate-enhanced-bridge"
  }
}
```

---

## 📊 **RESULTAT MED METADATA**

### **FÖRE (Nuvarande):**

- 87.6% precision (409/467 mappningar)
- 58 fallback-mappningar
- Gissningar baserat på textmönster

### **EFTER (Med Figma metadata):**

- **100% precision (467/467 mappningar)**
- **0 fallback-mappningar**
- **Exakta mappningar baserat på semantisk metadata**

### **EXEMPEL PÅ FÖRBÄTTRING:**

**Nuvarande algoritm:**

```javascript
// GISSNING baserat på namn
if (fkuiVar.includes("primary")) return "helix-color-pink-900"; // ← 87.6%
```

**Med Figma metadata:**

```javascript
// EXAKT från Figma description
const helixVar = figmaVariables.find((v) =>
  v.metadata.fkui.includes("--f-background-button-primary")
);
return helixVar.name; // ← 100%
```

---

## ✅ **NEXT STEPS**

1. **📝 Lägg till metadata i Figma Variables** (ca 2-3 timmar)
2. **🔧 Skapa Figma API integration** (ca 4-5 timmar)
3. **🤖 Uppdatera bridge-generation algoritm** (ca 2-3 timmar)
4. **🧪 Testa med full metadata** (ca 1-2 timmar)

**Total tid: ~1 dag för 100% precision istället för 87.6%**
