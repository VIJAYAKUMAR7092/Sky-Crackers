import re

file_path = 'app/admin/(dashboard)/products/components/ProductForm.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add useCallback to imports if missing
if "useCallback" not in content:
    content = content.replace("import React, { useState }", "import React, { useState, useCallback }")
    if "import React, { useState }" not in content:
        content = content.replace("import React, { useState", "import React, { useState, useCallback")

# Wrap handleNameChange
content = re.sub(
    r'const handleNameChange = \(e: React\.ChangeEvent<HTMLInputElement>\) => \{.*?\};',
    lambda m: m.group(0).replace('const handleNameChange = (', 'const handleNameChange = useCallback((').replace('};', '}, [initialData]);'),
    content,
    flags=re.DOTALL
)

# Wrap handleChange
content = re.sub(
    r'const handleChange = \(e: React\.ChangeEvent<HTMLInputElement \| HTMLSelectElement \| HTMLTextAreaElement>\) => \{.*?\};',
    lambda m: m.group(0).replace('const handleChange = (', 'const handleChange = useCallback((').replace('};', '}, []);'),
    content,
    flags=re.DOTALL
)

# Wrap handleSubmit
# It depends on state, so useCallback is harder without specifying all deps, 
# but it's only called on submit, not on every keystroke, so it's less critical.
# Let's focus on input handlers!

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Added useCallback to ProductForm")
