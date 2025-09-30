/\*\*

- HELIX DESIGN TOKENS METADATA STRUKTUR
- För 100% korrekt FKUI mappning via Figma API
-
- Detta är det som skulle behöva genereras från Figma API
- för att eliminera alla fallback-mappningar
  \*/

// === KÄRNPROBLEMET ===
// Nuvarande: 87.6% precision (409/467) baserat på textmatchning
// Önskat: 100% precision baserat på semantisk metadata

// === VAD SOM SAKNAS I NUVARANDE HELIX TOKENS ===

1. **SEMANTISKA ROLLER OCH KONTEXT**

   - Varje token behöver explicit "role" och "usage" metadata
   - T.ex: --helix-color-pink-900 → "role: brand-primary, usage: [buttons.primary, headers]"

2. **EXPLICITA FKUI MAPPNINGAR**

   - Direkta referenser till vilka FKUI-variabler som ska mappas
   - T.ex: "fkui-mappings": ["--f-background-button-primary", "--f-color-primary-strong"]

3. **KOMPONENT-SPECIFIK METADATA**

   - Tokens organiserade efter komponentanvändning
   - Inte bara färger, utan spacing, radius, shadows per komponent

4. **HIERARKISK PRIORITERING**
   - När multiple tokens matchar, vilken ska prioriteras
   - T.ex: primary > secondary > neutral för buttons

// === NUVARANDE PROBLEM MED ALGORITMEN ===

function mapFKUIToHelix(fkuiVar) {
// PROBLEM: Gissar baserat på text patterns
if (fkuiVar.includes('primary')) return 'helix-color-pink-900'; // ← GISSNING!
if (fkuiVar.includes('success')) return 'helix-color-green-600'; // ← GISSNING!

// FALLBACK: 58 variabler hamnar här
return 'helix-color-surface-neutral-default'; // ← FALLBACK!
}

// === LÖSNING: SEMANTISK METADATA ===

// I Figma API skulle tokens exporteras med denna struktur:
{
"token": "--helix-color-surface-primary-default",
"value": "#E91E63",
"semantic": {
"role": "brand-primary",
"context": ["interactive", "brand", "emphasis"],
"usage": ["buttons.primary", "headers.main", "links.primary"],
"fkui_mappings": {
"exact": ["--f-background-button-primary"],
"contextual": {
"buttons": ["--f-background-button-primary", "--f-background-button-primary-hover"],
"text": ["--f-color-primary-strong"],
"borders": ["--f-border-color-primary-default"]
}
}
}
}

// === FÖRBÄTTRAD ALGORITM MED METADATA ===

function mapFKUIToHelixWithMetadata(fkuiVar, helixTokens) {
// STEG 1: Sök exact mappings
for (const token of helixTokens) {
if (token.semantic.fkui_mappings.exact.includes(fkuiVar)) {
return token.token; // ← 100% PRECISION!
}
}

// STEG 2: Sök contextual mappings  
 for (const token of helixTokens) {
for (const context in token.semantic.fkui_mappings.contextual) {
if (token.semantic.fkui_mappings.contextual[context].includes(fkuiVar)) {
return token.token; // ← 100% PRECISION!
}
}
}

// STEG 3: Semantisk matchning som fallback
// (Endast för nya FKUI-variabler som inte finns i metadata)
return semanticFallbackMatch(fkuiVar, helixTokens);
}

// === VAD SOM BEHÖVER EXPORTERAS FRÅN FIGMA ===

FOUNDATION TOKENS (foundation.css):

- Behålla befintliga värden
- Lägga till "semantic.role" för varje token
- Lägga till "semantic.usage" array

SEMANTIC TOKENS (semantic.css):

- Behålla befintliga värden
- Lägga till "semantic.fkui_mappings.exact" arrays
- Lägga till "semantic.fkui_mappings.contextual" objects

KOMPONENT MAPPNINGAR (components.json):

- Ny fil med komponent-specifika mappningar
- buttons: { primary: { helix_tokens: [...], fkui_variables: [...] }}
- badges: { success: { helix_tokens: [...], fkui_variables: [...] }}

// === EXEMPEL PÅ FÖRBÄTTRAD FIGMA EXPORT ===

// foundation.css MED METADATA
:root {
--helix-color-pink-900: #AD1457;
/_ metadata: role=brand-primary, usage=[buttons.primary,headers.main] _/

--helix-color-green-600: #43A047;
/_ metadata: role=feedback-positive, usage=[badges.success,alerts.success] _/

--helix-spacing-md: 16px;
/_ metadata: role=component-internal, usage=[buttons.padding,inputs.padding] _/
}

// semantic.css MED FKUI MAPPNINGAR
:root {
--helix-color-surface-primary-default: var(--helix-color-pink-900);
/_ fkui_mappings: exact=[--f-background-button-primary] _/

--helix-color-surface-success-default: var(--helix-color-green-600);  
 /_ fkui_mappings: exact=[--f-background-badge-success] _/
}

// === RESULTAT ===

Med denna struktur skulle mappningsalgoritmen gå från:

- 87.6% precision (409/467) → 100% precision (467/467)
- 58 fallback-mappningar → 0 fallback-mappningar
- Gissningar → Exakta semantiska mappningar
