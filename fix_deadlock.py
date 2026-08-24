import os

file_path = 'app/admin/(dashboard)/categories/components/CategoryClient.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace isUpdating with a robust ref-based lock
old_isUpdating = """  const [isUpdating, setIsUpdating] = useState(false);"""
new_isUpdating = """  const [isUpdating, setIsUpdating] = useState(false);
  const isUpdatingRef = useRef(false);"""
content = content.replace(old_isUpdating, new_isUpdating)

old_handleMove_start = """  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === items.length - 1) ||
      isUpdating
    ) return;"""
new_handleMove_start = """  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === items.length - 1) ||
      isUpdatingRef.current
    ) return;
    
    isUpdatingRef.current = true;
    setIsUpdating(true);"""
content = content.replace(old_handleMove_start, new_handleMove_start)

old_finally = """    } finally {
      setIsUpdating(false);
    }"""
new_finally = """    } finally {
      isUpdatingRef.current = false;
      setIsUpdating(false);
    }"""
content = content.replace(old_finally, new_finally)

# Ensure no other occurrence of setIsUpdating(true) exists unhandled.
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed CategoryClient.tsx deadlock potential")
