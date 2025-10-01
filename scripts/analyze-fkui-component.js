#!/usr/bin/env node

// FKUI KOMPONENT SCSS ANALYS
// Analyserar FKUI:s SCSS-filer för att hitta komponenter-specifika variabler

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hitta FKUI design-katalogen
const fkuiDesignPath = path.join(__dirname, '..', 'node_modules', '@fkui', 'design', 'src', 'components');

function analyzeComponentSCSS(componentName) {
    const componentPath = path.join(fkuiDesignPath, componentName);
    
    if (!fs.existsSync(componentPath)) {
        console.error(`❌ Komponent '${componentName}' hittades inte i: ${componentPath}`);
        console.log('\n📁 Tillgängliga komponenter:');
        const components = fs.readdirSync(fkuiDesignPath).filter(dir => 
            fs.statSync(path.join(fkuiDesignPath, dir)).isDirectory()
        );
        components.forEach(comp => console.log(`   - ${comp}`));
        return;
    }

    console.log(`🔍 Analyserar FKUI komponent: ${componentName}`);
    console.log(`📁 Katalog: ${componentPath}`);

    const scssFiles = findSCSSFiles(componentPath);
    const variables = new Set();
    const variableDefinitions = [];

    scssFiles.forEach(scssFile => {
        console.log(`\n📄 Läser: ${path.relative(componentPath, scssFile)}`);
        const content = fs.readFileSync(scssFile, 'utf8');
        
        // Hitta SCSS-variabler ($variabel)
        const scssVarMatches = content.match(/\$[\w-]+\s*:/g);
        if (scssVarMatches) {
            scssVarMatches.forEach(match => {
                const varName = match.replace(':', '').trim();
                variables.add(varName);
            });
        }

        // Hitta CSS custom properties (--variabel)
        const cssVarMatches = content.match(/--[\w-]+/g);
        if (cssVarMatches) {
            cssVarMatches.forEach(varName => {
                variables.add(varName);
            });
        }

        // Extrahera hela variabel-definitioner för mappning
        const varDefinitions = content.match(/\$[\w-]+\s*:\s*[^;]+;/g);
        if (varDefinitions) {
            varDefinitions.forEach(def => {
                variableDefinitions.push({
                    file: path.relative(componentPath, scssFile),
                    definition: def.trim()
                });
            });
        }
    });

    // Visa resultat
    console.log(`\n📊 RESULTAT för ${componentName}:`);
    console.log(`Hittade ${variables.size} unika variabler i ${scssFiles.length} SCSS-filer`);

    // Generera Helix override-fil
    generateHelixOverride(componentName, variableDefinitions);
}

function findSCSSFiles(dir) {
    const scssFiles = [];
    
    function scanDirectory(currentDir) {
        const files = fs.readdirSync(currentDir);
        
        files.forEach(file => {
            const fullPath = path.join(currentDir, file);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                scanDirectory(fullPath);
            } else if (file.endsWith('.scss')) {
                scssFiles.push(fullPath);
            }
        });
    }
    
    scanDirectory(dir);
    return scssFiles;
}

function generateHelixOverride(componentName, variableDefinitions) {
    const fileName = `_${componentName}-helix-overrides.scss`;
    const outputPath = path.join(__dirname, '..', 'src', 'styles', 'components', fileName);
    
    console.log(`\n🎨 Genererar Helix override-fil: ${fileName}`);
    
    // Kategorisera variabler
    const categories = {
        background: [],
        border: [],
        text: [],
        icon: [],
        spacing: [],
        other: []
    };

    variableDefinitions.forEach(({ file, definition }) => {
        const defLower = definition.toLowerCase();
        
        if (defLower.includes('background')) {
            categories.background.push({ file, definition });
        } else if (defLower.includes('border')) {
            categories.border.push({ file, definition });
        } else if (defLower.includes('text') || defLower.includes('color-text')) {
            categories.text.push({ file, definition });
        } else if (defLower.includes('icon')) {
            categories.icon.push({ file, definition });
        } else if (defLower.includes('padding') || defLower.includes('margin') || defLower.includes('space')) {
            categories.spacing.push({ file, definition });
        } else {
            categories.other.push({ file, definition });
        }
    });

    // Generera SCSS-innehåll
    let scssContent = `// =============================================\n`;
    scssContent += `// ${componentName.toUpperCase()} HELIX OVERRIDES\n`;
    scssContent += `// Genererad från FKUI SCSS-analys\n`;
    scssContent += `// ${new Date().toISOString()}\n`;
    scssContent += `// =============================================\n\n`;

    Object.entries(categories).forEach(([category, vars]) => {
        if (vars.length === 0) return;

        scssContent += `// ${category.toUpperCase()}\n`;
        vars.forEach(({ file, definition }) => {
            const originalVar = definition.match(/\$[\w-]+/)[0];
            const helixMapping = mapToHelixVar(definition, category);
            
            scssContent += `${originalVar}: ${helixMapping}; // från ${file}\n`;
        });
        scssContent += `\n`;
    });

    // Skapa katalog om den inte finns
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Skriv fil
    fs.writeFileSync(outputPath, scssContent);
    
    console.log(`✅ Override-fil skapad: ${outputPath}`);
    console.log(`\n📋 Innehåll:\n`);
    console.log(scssContent);
}

function mapToHelixVar(definition, category) {
    const defLower = definition.toLowerCase();
    
    // Extrahera FKUI-variabel från definitionen  
    const fkuiVarMatch = definition.match(/var\((--fkds-[\w-]+)\)/);
    const fkuiVar = fkuiVarMatch ? fkuiVarMatch[1] : '';
    
    // Intelligent mappning baserat på FKUI-variabelnamn
    if (fkuiVar.includes('background-primary')) {
        return 'var(--helix-color-surface-primary-default)';
    }
    if (fkuiVar.includes('background-disabled')) {
        return 'var(--helix-color-surface-neutral-disabled)';
    }
    if (fkuiVar.includes('border-primary')) {
        return 'var(--helix-color-border-default)';
    }
    if (fkuiVar.includes('border-negative')) {
        return 'var(--helix-color-border-error)';
    }
    if (fkuiVar.includes('text-primary')) {
        return 'var(--helix-color-text-base-default)';
    }
    if (fkuiVar.includes('text-disabled')) {
        return 'var(--helix-color-text-base-disabled)';
    }
    
    // Fallback baserat på kategori
    switch (category) {
        case 'background':
            return 'var(--helix-color-surface-neutral-default)';
        case 'border':
            return 'var(--helix-color-border-default)';
        case 'text':
            return 'var(--helix-color-text-base-default)';
        case 'icon':
            return 'var(--helix-color-icon-default)';
        case 'spacing':
            return 'var(--helix-spacing-50)';
        default:
            return '/* TODO: Mappa till lämplig Helix-variabel */';
    }
}

// ANVÄNDNING
if (import.meta.url === `file://${process.argv[1]}`) {
    const componentName = process.argv[2];
    
    if (!componentName) {
        console.log('🎯 FKUI KOMPONENT SCSS ANALYS');
        console.log('');
        console.log('Användning:');
        console.log('  node scripts/analyze-fkui-component.js <komponent-namn>');
        console.log('');
        console.log('Exempel:');
        console.log('  node scripts/analyze-fkui-component.js text-field');
        console.log('  node scripts/analyze-fkui-component.js button');
        console.log('  node scripts/analyze-fkui-component.js badge');
        console.log('');
        
        // Lista tillgängliga komponenter
        if (fs.existsSync(fkuiDesignPath)) {
            console.log('📁 Tillgängliga komponenter:');
            const components = fs.readdirSync(fkuiDesignPath).filter(dir => 
                fs.statSync(path.join(fkuiDesignPath, dir)).isDirectory()
            );
            components.forEach(comp => console.log(`   - ${comp}`));
        }
        
        process.exit(1);
    }
    
    analyzeComponentSCSS(componentName);
}

export { analyzeComponentSCSS };