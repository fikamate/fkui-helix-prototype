import fs from "fs";
import path from "path";

const OUTPUT_FILE = "./src/styles/helix-fkui-bridge.scss";
const HELIX_CSS_PATH = "./src/css";

/**
 * Läser Helix design tokens från CSS-filerna
 */
function parseHelixTokens() {
    const semanticCSS = fs.readFileSync(
        path.join(HELIX_CSS_PATH, "semantic.css"),
        "utf8"
    );
    const foundationCSS = fs.readFileSync(
        path.join(HELIX_CSS_PATH, "foundation.css"),
        "utf8"
    );

    const tokens = {};

    // Parse semantiska tokens
    const semanticMatches = semanticCSS.matchAll(
        /--helix-([^:]+):\s*([^;]+);/g
    );
    for (const match of semanticMatches) {
        const [, tokenName, value] = match;
        tokens[`helix-${tokenName}`] = value.trim();
    }

    // Parse foundation tokens
    const foundationMatches = foundationCSS.matchAll(
        /--helix-([^:]+):\s*([^;]+);/g
    );
    for (const match of foundationMatches) {
        const [, tokenName, value] = match;
        tokens[`helix-${tokenName}`] = value.trim();
    }

    return tokens;
}

/**
 * Intelligent mappning mellan FKUI-variabler och Helix tokens
 */
function mapFKUIToHelix(fkuiVar) {
    const varName = fkuiVar.toLowerCase();

    // === FÄRGMAPPNINGAR ===

    // Primary färger (page headers, primary buttons)
    if (varName.includes("primary") && varName.includes("background")) {
        return "var(--helix-color-surface-primary-default)";
    }
    if (varName.includes("primary") && varName.includes("color")) {
        return "var(--helix-color-text-primary-default)";
    }
    if (varName.includes("primary") && varName.includes("border")) {
        return "var(--helix-color-border-primary-default)";
    }

    // Secondary färger
    if (varName.includes("secondary") && varName.includes("background")) {
        return "var(--helix-color-surface-secondary-default)";
    }

    // Neutrala färger
    if (
        varName.includes("background") &&
        (varName.includes("neutral") || varName.includes("default"))
    ) {
        return "var(--helix-color-surface-neutral-default)";
    }

    // Success/Error/Warning/Info
    if (varName.includes("success") && varName.includes("background")) {
        return "var(--helix-color-surface-success-default)";
    }
    if (varName.includes("error") && varName.includes("background")) {
        return "var(--helix-color-surface-error-default)";
    }
    if (varName.includes("warning") && varName.includes("background")) {
        return "var(--helix-color-surface-warning-default)";
    }
    if (varName.includes("info") && varName.includes("background")) {
        return "var(--helix-color-surface-info-default)";
    }

    // Text färger
    if (varName.includes("text") && varName.includes("primary")) {
        return "var(--helix-color-text-primary-default)";
    }
    if (varName.includes("text") && varName.includes("secondary")) {
        return "var(--helix-color-text-neutral-weak)";
    }
    if (varName.includes("text") && varName.includes("error")) {
        return "var(--helix-color-text-error-default)";
    }

    // === SPACING MAPPNINGAR ===

    if (
        varName.includes("padding") ||
        varName.includes("margin") ||
        varName.includes("spacing")
    ) {
        if (varName.includes("small") || varName.includes("sm")) {
            return "var(--helix-spacing-sm)";
        }
        if (varName.includes("medium") || varName.includes("md")) {
            return "var(--helix-spacing-md)";
        }
        if (varName.includes("large") || varName.includes("lg")) {
            return "var(--helix-spacing-lg)";
        }
        return "var(--helix-spacing-md)"; // Default
    }

    // === BORDER RADIUS ===

    if (varName.includes("radius") || varName.includes("border-radius")) {
        if (varName.includes("small") || varName.includes("sm")) {
            return "var(--helix-radius-sm)";
        }
        if (varName.includes("medium") || varName.includes("md")) {
            return "var(--helix-radius-md)";
        }
        if (varName.includes("large") || varName.includes("lg")) {
            return "var(--helix-radius-lg)";
        }
        return "var(--helix-radius-md)"; // Default
    }

    // === TYPOGRAPHY ===

    if (varName.includes("font-family")) {
        return "var(--helix-typography-font-family-font-family-body)";
    }
    if (varName.includes("font-size")) {
        if (varName.includes("small") || varName.includes("sm")) {
            return "var(--helix-typography-font-size-text-sm)";
        }
        if (varName.includes("large") || varName.includes("lg")) {
            return "var(--helix-typography-font-size-text-lg)";
        }
        return "var(--helix-typography-font-size-text-md)"; // Default
    }

    // === BORDERS ===

    if (varName.includes("border") && varName.includes("color")) {
        if (varName.includes("primary")) {
            return "var(--helix-color-border-primary-default)";
        }
        if (varName.includes("secondary")) {
            return "var(--helix-color-border-secondary-default)";
        }
        if (varName.includes("neutral") || varName.includes("default")) {
            return "var(--helix-color-border-neutral-weak)";
        }
        if (varName.includes("success")) {
            return "var(--helix-color-border-success-default)";
        }
        if (varName.includes("error")) {
            return "var(--helix-color-border-error-default)";
        }
        if (varName.includes("warning")) {
            return "var(--helix-color-border-warning-default)";
        }
        if (varName.includes("info")) {
            return "var(--helix-color-border-info-default)";
        }
    }

    // === IKONER ===

    // Icon färger
    if (varName.includes("icon") && varName.includes("color")) {
        if (varName.includes("primary")) {
            return "var(--helix-color-icon-primary-default)";
        }
        if (varName.includes("neutral") || varName.includes("default")) {
            return "var(--helix-color-icon-neutral-default)";
        }
        if (varName.includes("error")) {
            return "var(--helix-color-icon-error-default)";
        }
    }

    // Icon storlekar - NYTT!
    if (varName.includes("icon") && varName.includes("size")) {
        if (varName.includes("x-large") || varName.includes("xlarge")) {
            return "28px"; // Extra large icons
        }
        if (varName.includes("large")) {
            return "var(--helix-typography-font-size-display-xs)"; // 24px
        }
        if (varName.includes("medium") || varName.includes("md")) {
            return "var(--helix-typography-font-size-text-xl)"; // 20px
        }
        if (varName.includes("small") || varName.includes("sm")) {
            return "var(--helix-typography-font-size-text-md)"; // 16px
        }
        if (
            varName.includes("x-small") ||
            varName.includes("xsmall") ||
            varName.includes("xs")
        ) {
            return "var(--helix-typography-font-size-text-xs)"; // 12px
        }
        // Default icon size
        return "var(--helix-typography-font-size-text-md)"; // 16px
    }

    // === SPACING & SIZING ===

    // Padding mappningar
    if (varName.includes("padding")) {
        if (varName.includes("large") || varName.includes("lg")) {
            return "var(--helix-spacing-60)"; // 24px
        }
        if (
            varName.includes("medium") ||
            varName.includes("md") ||
            varName.includes("default")
        ) {
            return "var(--helix-spacing-50)"; // 20px
        }
        if (varName.includes("small") || varName.includes("sm")) {
            return "var(--helix-spacing-40)"; // 16px
        }
        if (varName.includes("x-small") || varName.includes("xs")) {
            return "var(--helix-spacing-30)"; // 12px
        }
        return "var(--helix-spacing-50)"; // Default 20px
    }

    // Margin mappningar
    if (varName.includes("margin")) {
        if (varName.includes("large") || varName.includes("lg")) {
            return "var(--helix-spacing-60)"; // 24px
        }
        if (
            varName.includes("medium") ||
            varName.includes("md") ||
            varName.includes("component")
        ) {
            return "var(--helix-spacing-50)"; // 20px
        }
        if (varName.includes("small") || varName.includes("sm")) {
            return "var(--helix-spacing-40)"; // 16px
        }
        return "var(--helix-spacing-50)"; // Default 20px
    }

    // Space variabler (f-space-small, f-space-medium, etc.)
    if (varName.includes("space")) {
        if (varName.includes("xxx-large")) {
            return "var(--helix-spacing-200)"; // 80px
        }
        if (varName.includes("xx-large")) {
            return "var(--helix-spacing-160)"; // 64px
        }
        if (varName.includes("x-large")) {
            return "var(--helix-spacing-120)"; // 48px
        }
        if (varName.includes("large")) {
            return "var(--helix-spacing-80)"; // 32px
        }
        if (varName.includes("medium")) {
            return "var(--helix-spacing-50)"; // 20px
        }
        if (varName.includes("small")) {
            return "var(--helix-spacing-30)"; // 12px
        }
        if (varName.includes("xx-small")) {
            return "var(--helix-spacing-10)"; // 4px
        }
        if (varName.includes("x-small")) {
            return "var(--helix-spacing-20)"; // 8px
        }
        return "var(--helix-spacing-50)"; // Default 20px
    }

    // Border radius
    if (varName.includes("border") && varName.includes("radius")) {
        if (varName.includes("large") || varName.includes("lg")) {
            return "12px"; // Large radius
        }
        if (varName.includes("medium") || varName.includes("md")) {
            return "8px"; // Medium radius
        }
        if (varName.includes("small") || varName.includes("sm")) {
            return "4px"; // Small radius
        }
        return "8px"; // Default radius
    }

    // === SHADOWS ===

    if (varName.includes("shadow")) {
        if (varName.includes("small") || varName.includes("sm")) {
            return "0 1px 2px var(--helix-color-shadow-neutral-sm-01), 0 1px 3px var(--helix-color-shadow-neutral-sm-02)";
        }
        if (varName.includes("medium") || varName.includes("md")) {
            return "0 4px 6px var(--helix-color-shadow-neutral-md-01), 0 2px 4px var(--helix-color-shadow-neutral-md-02)";
        }
        if (varName.includes("large") || varName.includes("lg")) {
            return "0 10px 15px var(--helix-color-shadow-neutral-lg-01), 0 4px 6px var(--helix-color-shadow-neutral-lg-02)";
        }
        return "0 1px 3px var(--helix-color-shadow-neutral-xs)"; // Default
    }

    // === FALLBACK ===

    // Om ingen mappning hittas, använd neutral färger som fallback
    if (varName.includes("color") || varName.includes("background")) {
        return "var(--helix-color-surface-neutral-default)";
    }

    return null; // Ingen mappning hittad
}

/**
 * Skannar FKUI för CSS-variabler
 */
function findFKUIVariables() {
    const fkuiPath = "./node_modules/@fkui";
    const variables = new Set();

    try {
        // Rekursiv funktion för att hitta CSS-filer
        function scanDirectory(dir) {
            const files = fs.readdirSync(dir);

            for (const file of files) {
                const fullPath = path.join(dir, file);
                const stat = fs.statSync(fullPath);

                if (stat.isDirectory()) {
                    scanDirectory(fullPath);
                } else if (file.endsWith(".css")) {
                    const content = fs.readFileSync(fullPath, "utf8");

                    // Hitta CSS custom properties
                    const matches = content.matchAll(
                        /--([a-zA-Z][a-zA-Z0-9-]*):/g
                    );
                    for (const match of matches) {
                        const varName = match[1];
                        if (
                            varName.startsWith("f-") ||
                            varName.startsWith("fkds-")
                        ) {
                            variables.add(`--${varName}`);
                        }
                    }
                }
            }
        }

        if (fs.existsSync(fkuiPath)) {
            scanDirectory(fkuiPath);
        }
    } catch (error) {
        console.warn("Kunde inte skanna FKUI-variabler:", error.message);
    }

    return Array.from(variables).sort();
}

/**
 * Kategoriserar variabler för bättre organisation
 */
function categorizeVariable(varName) {
    const name = varName.toLowerCase();

    if (name.includes("color") || name.includes("background")) return "colors";
    if (name.includes("button")) return "buttons";
    if (name.includes("text") || name.includes("font")) return "typography";
    if (
        name.includes("spacing") ||
        name.includes("margin") ||
        name.includes("padding")
    )
        return "spacing";
    if (name.includes("border")) return "borders";
    if (name.includes("radius")) return "radius";
    if (name.includes("shadow")) return "shadows";
    if (name.includes("icon")) return "icons";
    if (name.includes("header") || name.includes("pageheader"))
        return "headers";
    if (name.includes("badge")) return "badges";
    if (name.includes("navigation") || name.includes("nav"))
        return "navigation";

    return "other";
}

/**
 * Genererar SCSS-innehåll
 */
function generateSCSS() {
    console.log("🔍 Skannar FKUI-variabler...");
    const fkuiVariables = findFKUIVariables();

    console.log("📊 Läser Helix design tokens...");
    const helixTokens = parseHelixTokens();

    console.log("🎨 Mappar variabler...");

    // Kategorisera variabler
    const categorized = {};
    const mappedCount = { total: 0, mapped: 0, unmapped: 0 };

    for (const fkuiVar of fkuiVariables) {
        const category = categorizeVariable(fkuiVar);
        if (!categorized[category]) categorized[category] = [];

        const helixMapping = mapFKUIToHelix(fkuiVar);
        mappedCount.total++;

        if (helixMapping) {
            mappedCount.mapped++;
            categorized[category].push({
                fkuiVar,
                helixMapping,
                comment: `Automatiskt mappad från Helix designsystem`,
            });
        } else {
            mappedCount.unmapped++;
            categorized[category].push({
                fkuiVar,
                helixMapping: "var(--helix-color-surface-neutral-default)", // Fallback
                comment: `Fallback - ingen direkt mappning hittad`,
            });
        }
    }

    // Generera SCSS
    let scss = `/*
 * HELIX ↔ FKUI Bridge - Automatiskt genererad
 * Genererad: ${new Date().toISOString()}
 * 
 * Detta är en intelligent överlagring som mappar FKUI:s CSS-variabler
 * till ditt Helix designsystem.
 * 
 * Statistik:
 * - Totalt FKUI-variabler: ${mappedCount.total}
 * - Intelligenta mappningar: ${mappedCount.mapped}
 * - Fallback mappningar: ${mappedCount.unmapped}
 * 
 * ANVÄND DENNA FIL genom att importera den i local.scss:
 * @import "./styles/helix-fkui-bridge.scss";
 */

/* === HELIX DESIGN TOKENS IMPORT === */
/* Se till att Helix CSS-filer laddas först */
@import "../css/index.css";

/* === INTELLIGENT FKUI ↔ HELIX MAPPNING === */

:root {
`;

    // Sortera kategorier för bättre organisation
    const sortedCategories = Object.keys(categorized).sort();

    for (const category of sortedCategories) {
        const items = categorized[category];
        if (items.length === 0) continue;

        scss += `\n    /* === ${category.toUpperCase()} (${
            items.length
        } variabler) === */\n`;

        for (const item of items) {
            scss += `    ${item.fkuiVar}: ${item.helixMapping}; /* ${item.comment} */\n`;
        }
    }

    scss += `}

/* === KOMPONENT-SPECIFIKA OVERRIDES === */

/* FKUI Page Header med Helix primary färger */
f-page-header {
    --f-background-pageheader-primary: var(--helix-color-surface-primary-default);
    --f-color-primary-strong: var(--helix-color-text-primary-default);
    
    /* Helix typografi */
    font-family: var(--helix-typography-font-family-font-family-display);
    
    /* Helix shadows */
    box-shadow: 0 4px 6px var(--helix-color-shadow-neutral-md-01), 
                0 2px 4px var(--helix-color-shadow-neutral-md-02);
}

/* FKUI Buttons med Helix färgschema */
f-button[type="primary"],
.f-button--primary {
    --f-background-button-primary: var(--helix-color-surface-primary-default);
    --f-background-button-primary-hover: var(--helix-color-surface-primary-strong);
    --f-text-color-button-primary: var(--helix-color-text-base-white);
    
    border-radius: var(--helix-radius-md);
    font-family: var(--helix-typography-font-family-font-family-body);
    box-shadow: 0 1px 2px var(--helix-color-shadow-neutral-sm-01);
    
    &:hover {
        box-shadow: 0 4px 6px var(--helix-color-shadow-neutral-md-01);
    }
}

f-button[type="secondary"],
.f-button--secondary {
    --f-background-button-secondary: var(--helix-color-surface-secondary-default);
    --f-background-button-secondary-hover: var(--helix-color-surface-secondary-strong);
    --f-border-color-button-secondary: var(--helix-color-border-secondary-default);
    
    border-radius: var(--helix-radius-md);
    font-family: var(--helix-typography-font-family-font-family-body);
}

/* FKUI Badges med Helix status färger */
f-badge[type="success"] {
    --f-background-badge-success: var(--helix-color-surface-success-default);
    --f-border-color-badge-success: var(--helix-color-border-success-default);
    border-radius: var(--helix-radius-sm);
}

f-badge[type="error"] {
    --f-background-badge-error: var(--helix-color-surface-error-default);
    --f-border-color-badge-error: var(--helix-color-border-error-default);
    border-radius: var(--helix-radius-sm);
}

f-badge[type="warning"] {
    --f-background-badge-warning: var(--helix-color-surface-warning-default);
    --f-border-color-badge-warning: var(--helix-color-border-warning-default);
    border-radius: var(--helix-radius-sm);
}

f-badge[type="info"] {
    --f-background-badge-info: var(--helix-color-surface-info-default);
    --f-border-color-badge-info: var(--helix-color-border-info-default);
    border-radius: var(--helix-radius-sm);
}

/* FKUI Tables med Helix styling */
f-interactive-table,
.f-interactive-table {
    --f-background-grid-header: var(--helix-color-surface-neutral-weak);
    --f-border-color-grid: var(--helix-color-border-neutral-weak);
    --f-text-color-default: var(--helix-color-text-neutral-default);
    
    border-radius: var(--helix-radius-lg);
    font-family: var(--helix-typography-font-family-font-family-body);
    box-shadow: 0 1px 3px var(--helix-color-shadow-neutral-xs);
}

/* FKUI Panels med Helix layout */
f-details-panel,
.f-details-panel {
    --f-background-content: var(--helix-color-surface-base-white);
    --f-border-color-panel: var(--helix-color-border-neutral-weak);
    
    border-radius: var(--helix-radius-lg);
    box-shadow: 0 4px 6px var(--helix-color-shadow-neutral-md-01),
                0 2px 4px var(--helix-color-shadow-neutral-md-02);
}

/* === LAYOUT INTEGRATION === */

/* Globala Helix-baserade overrides för konsekvent utseende */
body {
    font-family: var(--helix-typography-font-family-font-family-body);
    color: var(--helix-color-text-neutral-default);
    background-color: var(--helix-color-background-neutral-default);
}

/* Använd Helix spacing system för konsekvent layout */
.helix-spacing {
    --spacing-xs: var(--helix-spacing-xs);
    --spacing-sm: var(--helix-spacing-sm);
    --spacing-md: var(--helix-spacing-md);
    --spacing-lg: var(--helix-spacing-lg);
    --spacing-xl: var(--helix-spacing-xl);
}
`;

    console.log(`✅ Genererat ${mappedCount.total} variabelmappningar:`);
    console.log(`   📍 Intelligenta mappningar: ${mappedCount.mapped}`);
    console.log(`   📍 Fallback mappningar: ${mappedCount.unmapped}`);

    return scss;
}

/**
 * Huvudfunktion
 */
function main() {
    try {
        console.log("🚀 Startar Helix ↔ FKUI Bridge Generator...\n");

        // Kontrollera att Helix CSS-filer finns
        if (!fs.existsSync(HELIX_CSS_PATH)) {
            throw new Error(
                `Helix CSS-mappen hittades inte: ${HELIX_CSS_PATH}`
            );
        }

        // Generera SCSS
        const scss = generateSCSS();

        // Skapa output-mappen om den inte finns
        const outputDir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Skriv filen
        fs.writeFileSync(OUTPUT_FILE, scss);

        console.log(`\n✅ Helix ↔ FKUI Bridge genererad: ${OUTPUT_FILE}`);
        console.log(`\n📋 Nästa steg:`);
        console.log(
            `   1. Importera i local.scss: @import "./styles/helix-fkui-bridge.scss";`
        );
        console.log(`   2. Starta Vue-appen: npm start`);
        console.log(
            `   3. Dina FKUI-komponenter använder nu automatiskt Helix designsystem!`
        );
    } catch (error) {
        console.error("❌ Fel vid generering:", error.message);
        process.exit(1);
    }
}

// Kör scriptet
main();
