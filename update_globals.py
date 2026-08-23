import os

with open('app/globals.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Change --primary
content = content.replace('--primary: #FF4500;', '--primary: #DF260C;')
# Change --secondary-foreground (which was amber/orange text)
content = content.replace('--secondary-foreground: #B45309;', '--secondary-foreground: #DC2626;')

with open('app/globals.css', 'w', encoding='utf-8') as f:
    f.write(content)
