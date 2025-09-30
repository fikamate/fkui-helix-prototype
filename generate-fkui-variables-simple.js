import fs from "fs";
import path from "path";

const OUTPUT_FILE = "./src/styles/generated-fkui-overrides.scss";

// Skapa basic SCSS-innehåll
const scssContent = `/* === AUTOMATISKT GENERERADE FKUI VARIABLER === */
/* Genererat: ${new Date().toLocaleString()} */

/* === DESIGN TOKENS === */
:root {
    /* Grundläggande färger */
    --my-primary-color: #ff6b35;      /* Orange - primärfärg */
    --my-secondary-color: #4285f4;    /* Blå - sekundärfärg */
    --my-background: #ffffff;         /* Vit bakgrund */
    --my-surface: #f8f9fa;           /* Ljusgrå yta */
    
    /* Text */
    --my-text-primary: #333333;      /* Mörk text */
    --my-text-secondary: #666666;    /* Sekundär text */
    
    /* Status */
    --my-success: #28a745;           /* Grön för success */
    --my-warning: #ffc107;           /* Gul för varningar */
    --my-error: #dc3545;             /* Röd för fel */
    --my-info: #17a2b8;             /* Cyan för info */
    
    /* Layout */
    --my-spacing-sm: 8px;
    --my-spacing-md: 16px;
    --my-spacing-lg: 24px;
    --my-border: 1px;
    --my-shadow: 0 2px 4px rgba(0,0,0,0.1);
    
    /* Typography */
    --my-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --my-font-size-base: 16px;
}

/* === FKUI VARIABLER (Test) === */
:root {
    /* Några test-variabler */
    --f-background-pageheader-primary: var(--my-primary-color);
    --f-background-button-primary: var(--my-primary-color);
    --f-text-color-default: var(--my-text-primary);
    --f-font-family: var(--my-font-family);
    --f-font-size-default: var(--my-font-size-base);
}
`;

try {
    // Skapa katalog om den inte finns
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Skriv filen
    fs.writeFileSync(OUTPUT_FILE, scssContent, "utf8");

    console.log(`✅ Genererade SCSS-fil: ${OUTPUT_FILE}`);
    console.log("🎨 Innehåller:");
    console.log("   - Design tokens (färger, spacing, typography)");
    console.log("   - Test FKUI-variabler");
    console.log("\n🚀 Nästa steg:");
    console.log("   1. Kontrollera att filen skapades korrekt");
    console.log("   2. Testa att Vue-appen startar");
} catch (error) {
    console.error("❌ Fel vid generering:", error);
    process.exit(1);
}
