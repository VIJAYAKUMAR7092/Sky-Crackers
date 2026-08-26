const fs = require('fs');
const p = 'app/admin/(dashboard)/combos/components/ComboClient.tsx';
let code = fs.readFileSync(p, 'utf8');

code = code.replace(
  "import { Plus, Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';",
  "import { Plus, Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';\nimport { updateComboDate } from '../actions';"
);

code = code.replace(
  /const handleSaveDate = async \(\) => \{[\s\S]*?finally \{\n\s*setIsSavingDate\(false\);\n\s*\}\n\s*\};/,
  `const handleSaveDate = async () => {
    setIsSavingDate(true);
    try {
      const res = await updateComboDate(dateValue);
      if (res.success) {
        alert("Validity date updated successfully!");
        router.refresh();
      } else {
        alert("Failed to update date: " + res.error);
      }
    } catch (err) {
      alert("Failed to update date");
    } finally {
      setIsSavingDate(false);
    }
  };`
);

fs.writeFileSync(p, code);
console.log('Action fixed');
