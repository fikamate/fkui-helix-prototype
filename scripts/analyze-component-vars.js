// KOMPONENT-SPECIFIK CSS VARIABEL ANALYS
// Analyserar vilka CSS-variabler en specifik FKUI-komponent använder

function analyzeComponentVariables(componentSelector, componentName = 'Component') {
  console.log(`🔍 Analyserar ${componentName} (${componentSelector})`);
  
  const componentVars = new Set();
  const elements = document.querySelectorAll(componentSelector);
  
  if (elements.length === 0) {
    console.warn(`❌ Hittade inga element för selector: ${componentSelector}`);
    console.log('💡 Tillgängliga FKUI-komponenter på sidan:');
    const allFKUI = document.querySelectorAll('[class*="f-"], [is*="f-"], f-*');
    allFKUI.forEach(el => console.log(`   - ${el.tagName.toLowerCase()} (${el.className})`));
    return [];
  }

  console.log(`✅ Hittade ${elements.length} instanser av ${componentName}`);

  // Analysera varje instans av komponenten
  elements.forEach((element, index) => {
    console.log(`\n📋 Instans ${index + 1}: ${element.tagName.toLowerCase()}`);
    
    // Hämta computed styles
    const computed = getComputedStyle(element);
    const elementVars = [];
    
    // Extrahera CSS custom properties
    for (let i = 0; i < computed.length; i++) {
      const prop = computed[i];
      if (prop.startsWith('--') && (prop.includes('f-') || prop.includes('fkui'))) {
        componentVars.add(prop);
        elementVars.push(prop);
      }
    }
    
    // Analysera även child elements för komplexa komponenter
    const children = element.querySelectorAll('*');
    children.forEach(child => {
      const childComputed = getComputedStyle(child);
      for (let i = 0; i < childComputed.length; i++) {
        const prop = childComputed[i];
        if (prop.startsWith('--') && (prop.includes('f-') || prop.includes('fkui'))) {
          componentVars.add(prop);
        }
      }
    });
    
    console.log(`   Variabler: ${elementVars.length}`);
  });

  const sortedVars = Array.from(componentVars).sort();
  
  console.log(`\n📊 RESULTAT för ${componentName}:`);
  console.log(`Totalt: ${sortedVars.length} unika CSS-variabler`);
  console.log('\n🎨 CSS-variabler:');
  sortedVars.forEach(v => console.log(`   ${v}`));
  
  // Generera SCSS override-fil
  generateSCSSOverride(componentName, sortedVars);
  
  return sortedVars;
}

function generateSCSSOverride(componentName, variables) {
  const fileName = `${componentName.toLowerCase()}-overrides.scss`;
  
  console.log(`\n📁 SCSS Override Template (${fileName}):`);
  console.log('/* ========================================');
  console.log(`   ${componentName.toUpperCase()} HELIX OVERRIDES`);
  console.log('   Genererad från komponent-analys');
  console.log(`   ${new Date().toISOString()}`);
  console.log('   ======================================== */\n');
  
  // Kategorisera variabler
  const categories = {
    colors: variables.filter(v => v.includes('color') || v.includes('background')),
    spacing: variables.filter(v => v.includes('padding') || v.includes('margin') || v.includes('space')),
    typography: variables.filter(v => v.includes('font') || v.includes('text')),
    borders: variables.filter(v => v.includes('border') || v.includes('outline')),
    other: variables.filter(v => 
      !v.includes('color') && !v.includes('background') && 
      !v.includes('padding') && !v.includes('margin') && !v.includes('space') &&
      !v.includes('font') && !v.includes('text') &&
      !v.includes('border') && !v.includes('outline')
    )
  };
  
  // Generera SCSS för varje kategori
  Object.entries(categories).forEach(([category, vars]) => {
    if (vars.length === 0) return;
    
    console.log(`// ${category.toUpperCase()}`);
    vars.forEach(variable => {
      const helixVar = mapToHelixVariable(variable, category);
      console.log(`${variable}: ${helixVar};`);
    });
    console.log('');
  });
  
  console.log('\n💾 Kopiera ovan kod till:');
  console.log(`   src/styles/components/${fileName}`);
}

function mapToHelixVariable(fkuiVar, category) {
  // Intelligent mappning baserat på kategori och variabelnamn
  const varLower = fkuiVar.toLowerCase();
  
  if (category === 'colors') {
    if (varLower.includes('primary')) return 'var(--helix-color-surface-primary-default)';
    if (varLower.includes('success')) return 'var(--helix-color-surface-success-default)';
    if (varLower.includes('error') || varLower.includes('danger')) return 'var(--helix-color-surface-error-default)';
    if (varLower.includes('warning')) return 'var(--helix-color-surface-warning-default)';
    if (varLower.includes('text')) return 'var(--helix-color-text-base-default)';
    return 'var(--helix-color-surface-neutral-default)';
  }
  
  if (category === 'spacing') {
    if (varLower.includes('small') || varLower.includes('sm')) return 'var(--helix-spacing-30)';
    if (varLower.includes('medium') || varLower.includes('md')) return 'var(--helix-spacing-50)';
    if (varLower.includes('large') || varLower.includes('lg')) return 'var(--helix-spacing-80)';
    return 'var(--helix-spacing-50)';
  }
  
  if (category === 'typography') {
    if (varLower.includes('small') || varLower.includes('sm')) return 'var(--helix-typography-font-size-text-sm)';
    if (varLower.includes('large') || varLower.includes('lg')) return 'var(--helix-typography-font-size-text-lg)';
    if (varLower.includes('weight')) {
      if (varLower.includes('bold')) return 'var(--helix-typography-font-weight-bold)';
      return 'var(--helix-typography-font-weight-medium)';
    }
    return 'var(--helix-typography-font-size-text-md)';
  }
  
  return '/* TODO: Mappa till lämplig Helix-variabel */';
}

// ============================================================================
// ANVÄNDNING - kör dessa kommandon i console:
// ============================================================================

console.log('🎯 KOMPONENT ANALYS VERKTYG');
console.log('');
console.log('Använd dessa kommandon:');
console.log('');
console.log('📝 TextField:');
console.log('   analyzeComponentVariables("f-text-field, input[class*=f-text-field]", "TextField")');
console.log('');
console.log('🔘 Button:'); 
console.log('   analyzeComponentVariables("f-button, button[class*=f-button]", "Button")');
console.log('');
console.log('📊 Badge:');
console.log('   analyzeComponentVariables("f-badge, .f-badge", "Badge")');
console.log('');
console.log('🏷️  Label:');
console.log('   analyzeComponentVariables("f-label, .f-label", "Label")');
console.log('');