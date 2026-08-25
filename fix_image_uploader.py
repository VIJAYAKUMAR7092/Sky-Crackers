import re

file_path = 'components/ui/ImageUploader.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the end of the file if it's missing the closing parenthesis for React.memo
if "export const ImageUploader = React.memo(" in content and not content.rstrip().endswith(");"):
    content = content.rstrip()
    if content.endswith("}"):
        content += ");\n"

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Syntax fixed")
