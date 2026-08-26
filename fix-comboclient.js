const fs = require('fs');
const p = 'app/admin/(dashboard)/combos/components/ComboClient.tsx';
let code = fs.readFileSync(p, 'utf8');

code = code.replace(
  'interface ComboClientProps {\n  data: ProductWithCategory[];\n}',
  'interface ComboClientProps {\n  data: ProductWithCategory[];\n  validUpto: string;\n}'
);

code = code.replace(
  'export function ComboClient({ data }: ComboClientProps) {',
  'export function ComboClient({ data, validUpto }: ComboClientProps) {'
);

code = code.replace(
  'const [isUpdating, setIsUpdating] = useState(false);',
  'const [isUpdating, setIsUpdating] = useState(false);\n  const [dateValue, setDateValue] = useState(validUpto);\n  const [isSavingDate, setIsSavingDate] = useState(false);\n\n  const handleSaveDate = async () => {\n    setIsSavingDate(true);\n    try {\n      await fetch("/api/admin/combos/validity", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ validUpto: dateValue }) });\n      alert("Validity date updated successfully!");\n      router.refresh();\n    } catch (err) {\n      alert("Failed to update date");\n    } finally {\n      setIsSavingDate(false);\n    }\n  };'
);

code = code.replace(
  '<div className="space-y-4">',
  `<div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-card p-4 rounded-xl border border-border/60 shadow-sm gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Validity Configuration</h2>
          <p className="text-sm text-muted-foreground">Set the "Valid up to" text shown on the website for Combo Packages.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <input type="text" value={dateValue} onChange={e => setDateValue(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="e.g. 13TH AUGUST" />
          <Button onClick={handleSaveDate} disabled={isSavingDate} className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap">
            {isSavingDate ? "Saving..." : "Save Date"}
          </Button>
        </div>
      </div>`
);

fs.writeFileSync(p, code);
console.log('Done');
