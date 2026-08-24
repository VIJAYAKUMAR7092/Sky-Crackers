import os

file_path = 'app/admin/(dashboard)/categories/components/CategoryClient.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add isFiltered check
old_component_start = """export function CategoryClient({ initialData, searchParams }: CategoryClientProps) {
  const router = useRouter();"""
new_component_start = """export function CategoryClient({ initialData, searchParams }: CategoryClientProps) {
  const router = useRouter();
  
  const isFiltered = !!searchParams.search || (searchParams.active && searchParams.active !== 'all');"""
content = content.replace(old_component_start, new_component_start)

# Disable buttons if filtered
old_up_button = """              onClick={() => handleMove(index, 'up')}
              disabled={index === 0 || isUpdating}"""
new_up_button = """              onClick={() => handleMove(index, 'up')}
              disabled={index === 0 || isUpdating || isFiltered}
              title={isFiltered ? "Cannot reorder while filtered" : ""}"""
content = content.replace(old_up_button, new_up_button)

old_down_button = """              onClick={() => handleMove(index, 'down')}
              disabled={index === items.length - 1 || isUpdating}"""
new_down_button = """              onClick={() => handleMove(index, 'down')}
              disabled={index === items.length - 1 || isUpdating || isFiltered}
              title={isFiltered ? "Cannot reorder while filtered" : ""}"""
content = content.replace(old_down_button, new_down_button)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed CategoryClient.tsx filtering reorder logic")
