import re

# Read the backup file
with open('src/components/Navbar.tsx.backup', 'r', encoding='utf-8') as f:
    content = f.read()

# First replacement - desktop navigation (around line 52-56)
desktop_pattern = r"(\{\/\* Centered Navigation \(desktop\) \*\/\}.*?)\{\[\s*\{ href: '/', label: 'Inicio' \},\s*\{ href: '/subscripcions', label: 'Planes' \},\s*\{ href: '/contact', label: 'Contacto' \}\s*\]\.map\(\(item\) => \{"
desktop_replacement = r"\1{[\n                { href: '/', label: 'Inicio' },\n                { href: '/subscripcions', label: 'Planes' },\n                ...(isAuthenticated ? [{ href: '/videos', label: 'Videos' }] : []),\n                { href: '/contact', label: 'Contacto' }\n              ].map((item) => {"

content = re.sub(desktop_pattern, desktop_replacement, content, flags=re.DOTALL)

# Second replacement - mobile navigation (around line 184-188)
mobile_pattern = r"(\{\/\* Mobile Navigation \*\/\}.*?)\{\[\s*\{ href: '/', label: 'Inicio' \},\s*\{ href: '/subscripcions', label: 'Planes' \},\s*\{ href: '/contact', label: 'Contacto' \}\s*\]\.map\(\(item\) => \{"
mobile_replacement = r"\1{[\n                { href: '/', label: 'Inicio' },\n                { href: '/subscripcions', label: 'Planes' },\n                ...(isAuthenticated ? [{ href: '/videos', label: 'Videos' }] : []),\n                { href: '/contact', label: 'Contacto' }\n              ].map((item) => {"

content = re.sub(mobile_pattern, mobile_replacement, content, flags=re.DOTALL)

# Write the modified content
with open('src/components/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Navbar.tsx updated successfully!")
