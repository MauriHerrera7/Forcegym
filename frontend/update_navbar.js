const fs = require('fs');

// Read the backup file
const content = fs.readFileSync('src/components/Navbar.tsx.backup', 'utf8');

// Split into lines
const lines = content.split('\n');

// Find and update desktop navigation (around line 52-56)
let desktopUpdated = false;
let mobileUpdated = false;

for (let i = 0; i < lines.length; i++) {
  // Desktop navigation update
  if (!desktopUpdated && lines[i].includes("{ href: '/subscripcions', label: 'Planes' },") && 
      i > 50 && i < 60 && lines[i+1].includes("{ href: '/contact', label: 'Contacto' }")) {
    lines.splice(i + 1, 0, "                ...(isAuthenticated ? [{ href: '/videos', label: 'Videos' }] : []),");
    desktopUpdated = true;
    i++; // Skip the line we just added
  }
  
  // Mobile navigation update  
  if (!mobileUpdated && lines[i].includes("{ href: '/subscripcions', label: 'Planes' },") && 
      i > 180 && i < 200 && lines[i+1].includes("{ href: '/contact', label: 'Contacto' }")) {
    lines.splice(i + 1, 0, "                ...(isAuthenticated ? [{ href: '/videos', label: 'Videos' }] : []),");
    mobileUpdated = true;
  }
}

// Write the modified content
fs.writeFileSync('src/components/Navbar.tsx', lines.join('\n'), 'utf8');

console.log('Navbar.tsx updated successfully!');
console.log('Desktop navigation updated:', desktopUpdated);
console.log('Mobile navigation updated:', mobileUpdated);
