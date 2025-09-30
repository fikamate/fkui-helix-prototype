#!/usr/bin/env node

/**
 * FKUI CSS Variables Generator
 *
 * Detta script:
 * 1. Hittar alla CSS custom properties i FKUI
 * 2. Kategoriserar dem (header, button, color osv)
 * 3. Genererar en SCSS-fil med mappningar till dina egna variabler
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// Konfiguration
const OUTPUT_FILE = "src/styles/generated-fkui-overrides.scss";
const FKUI_PATH = "node_modules/@fkui";

console.log("🔍 Söker efter FKUI CSS custom properties...");

try {
    // 1. Hitta alla CSS custom properties i FKUI
    const command = `find ${FKUI_PATH} -name "*.css" -exec grep -ho "\\--[a-zA-Z][a-zA-Z0-9-]*:" {} \\; | sed 's/:$//' | sort | uniq`;
    const allVariables = execSync(command, { encoding: "utf-8" })
        .trim()
        .split("\n")
        .filter((v) => v.startsWith("--f-") || v.startsWith("--fkds-")) // Bara FKUI-specifika
        .filter((v) => v.length > 3); // Filter bort tomma rader

    console.log(`✅ Hittade ${allVariables.length} FKUI CSS variabler`);

    // 2. Kategorisera variablerna
    const categories = {
        colors: allVariables.filter(
            (v) => v.includes("color") && !v.includes("background")
        ),
        backgrounds: allVariables.filter((v) => v.includes("background")),
        headers: allVariables.filter(
            (v) => v.includes("header") || v.includes("pageheader")
        ),
        buttons: allVariables.filter((v) => v.includes("button")),
        badges: allVariables.filter((v) => v.includes("badge")),
        navigation: allVariables.filter((v) => v.includes("nav")),
        borders: allVariables.filter(
            (v) => v.includes("border") && !v.includes("background")
        ),
        spacing: allVariables.filter(
            (v) =>
                v.includes("space") ||
                v.includes("margin") ||
                v.includes("padding")
        ),
        typography: allVariables.filter(
            (v) => v.includes("font") || v.includes("text")
        ),
        icons: allVariables.filter((v) => v.includes("icon")),
        shadows: allVariables.filter((v) => v.includes("shadow")),
        other: allVariables.filter(
            (v) =>
                !v.includes("color") &&
                !v.includes("background") &&
                !v.includes("header") &&
                !v.includes("button") &&
                !v.includes("badge") &&
                !v.includes("nav") &&
                !v.includes("border") &&
                !v.includes("space") &&
                !v.includes("margin") &&
                !v.includes("padding") &&
                !v.includes("font") &&
                !v.includes("text") &&
                !v.includes("icon") &&
                !v.includes("shadow")
        ),
    };

    // 3. Generera SCSS innehåll
    const scssContent = generateSCSS(categories);

    // 4. Skriv till fil
    fs.writeFileSync(OUTPUT_FILE, scssContent);

    console.log(`🎨 Genererade SCSS-fil: ${OUTPUT_FILE}`);
    console.log("📝 Kategorier skapade:");
    Object.entries(categories).forEach(([category, vars]) => {
        if (vars.length > 0) {
            console.log(`   ${category}: ${vars.length} variabler`);
        }
    });

    console.log("\\n✨ Klart! Nu kan du:");
    console.log(`1. Öppna ${OUTPUT_FILE}`);
    console.log("2. Anpassa dina design tokens i :root sektionen");
    console.log("3. Importera filen i din local.scss");
} catch (error) {
    console.error("❌ Fel vid generering:", error.message);
    process.exit(1);
}

function generateSCSS(categories) {
    const timestamp = new Date().toISOString();

    let scss = `/*
 * FKUI CSS Variables Override - Automatiskt genererad
 * Genererad: ${timestamp}
 * 
 * Detta är en automatiskt genererad fil. Kör 'npm run generate-fkui-vars' för att uppdatera.
 */

/* === DINA DESIGN TOKENS === */
:root {
    /* Definiera dina egna designvariabler här */
    
    /* Primära färger */
    --my-primary-color: #2563eb;
    --my-primary-hover: #1d4ed8;
    --my-secondary-color: #7c3aed;
    --my-accent-color: #059669;
    
    /* Neutrala färger */
    --my-background: #ffffff;
    --my-surface: #f8fafc;
    --my-text-primary: #1f2937;
    --my-text-secondary: #6b7280;
    --my-border: #e5e7eb;
    
    /* Status färger */
    --my-success: #10b981;
    --my-warning: #f59e0b;
    --my-error: #ef4444;
    --my-info: var(--my-primary-color);
    
    /* Typografi */
    --my-font-family: 'Inter', system-ui, sans-serif;
    --my-font-size-sm: 0.875rem;
    --my-font-size-base: 1rem;
    --my-font-size-lg: 1.125rem;
    
    /* Spacing */
    --my-spacing-xs: 0.25rem;
    --my-spacing-sm: 0.5rem;
    --my-spacing-md: 1rem;
    --my-spacing-lg: 1.5rem;
    
    /* Andra element */
    --my-border-radius: 0.375rem;
    --my-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

/* === FKUI VARIABLE OVERRIDES === */
`;

    // Generera varje kategori
    Object.entries(categories).forEach(([categoryName, variables]) => {
        if (variables.length === 0) return;

        scss += `\\n/* === ${categoryName.toUpperCase()} (${
            variables.length
        } variabler) === */\\n:root {\\n`;

        variables.forEach((variable) => {
            const mappedVar = mapVariableToDesignToken(variable, categoryName);
            scss += `    ${variable}: var(${mappedVar}); /* TODO: Anpassa mappning */\\n`;
        });

        scss += `}\\n`;
    });

    scss += `
/* === ANVÄNDNING === */
/*
 * Importera denna fil i din local.scss:
 * @import "./generated-fkui-overrides.scss";
 * 
 * Anpassa sedan värdena för --my-primary-color osv enligt ditt designsystem.
 * 
 * Regenerera filen med: npm run generate-fkui-vars
 */
`;

    return scss;
}

function mapVariableToDesignToken(variable, category) {
    // Intelligent mappning baserat på variabelnamn och kategori
    const varName = variable.toLowerCase();

    // Headers
    if (varName.includes("pageheader") || varName.includes("header")) {
        if (varName.includes("background")) return "--my-primary-color";
        if (varName.includes("text") || varName.includes("color"))
            return "--my-text-primary";
        if (varName.includes("border")) return "--my-border";
    }

    // Buttons
    if (varName.includes("button")) {
        if (varName.includes("primary") && varName.includes("background"))
            return "--my-primary-color";
        if (varName.includes("primary") && varName.includes("hover"))
            return "--my-primary-hover";
        if (varName.includes("secondary") && varName.includes("background"))
            return "--my-secondary-color";
        if (varName.includes("disabled")) return "--my-text-secondary";
        if (varName.includes("text") || varName.includes("color"))
            return "--my-text-primary";
    }

    // Status/Badges
    if (varName.includes("success")) return "--my-success";
    if (varName.includes("warning")) return "--my-warning";
    if (varName.includes("error")) return "--my-error";
    if (varName.includes("info")) return "--my-info";

    // Bakgrunder
    if (varName.includes("background")) {
        if (varName.includes("primary")) return "--my-primary-color";
        if (varName.includes("secondary")) return "--my-surface";
        return "--my-background";
    }

    // Färger
    if (varName.includes("color")) {
        if (varName.includes("primary")) return "--my-primary-color";
        if (varName.includes("secondary")) return "--my-text-secondary";
        return "--my-text-primary";
    }

    // Borders
    if (varName.includes("border")) return "--my-border";

    // Spacing
    if (
        varName.includes("space") ||
        varName.includes("margin") ||
        varName.includes("padding")
    ) {
        return "--my-spacing-md";
    }

    // Font
    if (varName.includes("font")) {
        if (varName.includes("family")) return "--my-font-family";
        if (varName.includes("size")) return "--my-font-size-base";
    }

    // Shadow
    if (varName.includes("shadow")) return "--my-shadow";

    // Default fallback
    return "--my-primary-color";
}
