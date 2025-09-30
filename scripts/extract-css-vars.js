// Kör detta i browser console för att hitta alla CSS custom properties
function extractAllCSSVariables() {
  const allVars = new Set();

  // Hämta från alla stylesheets
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.style) {
          for (let i = 0; i < rule.style.length; i++) {
            const prop = rule.style[i];
            if (prop.startsWith('--')) {
              allVars.add(prop);
            }
          }
        }
      }
    } catch (e) {
      console.log('Kunde inte läsa stylesheet:', sheet.href);
    }
  }

  // Hämta från computed styles på viktiga element
  const selectors = [
    'f-page-header',
    'f-navigation-menu',
    'f-button',
    '.f-page-layout',
  ];
  selectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      const computed = getComputedStyle(el);
      for (let i = 0; i < computed.length; i++) {
        const prop = computed[i];
        if (prop.startsWith('--')) {
          allVars.add(prop);
        }
      }
    });
  });

  const sortedVars = Array.from(allVars).sort();
  console.log('Alla CSS Custom Properties:');
  sortedVars.forEach((v) => console.log(v));

  // Skapa CSS template
  console.log('\n/* CSS Override Template */');
  console.log(':root {');
  sortedVars
    .filter((v) => v.includes('background') || v.includes('color'))
    .forEach((v) => {
      console.log(`    ${v}: var(--helix-color-surface-primary-default);`);
    });
  console.log('}');

  return sortedVars;
}

extractAllCSSVariables();
