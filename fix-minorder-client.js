const fs = require('fs');
const p = 'app/admin/(dashboard)/minimum-order/MinimumOrderClient.tsx';
let code = fs.readFileSync(p, 'utf8');

code = code.replace(
  `export function MinimumOrderClient({ initialZones }: { initialZones: any[] }) {
  const router = useRouter();
  const [zones, setZones] = useState(initialZones);`,
  `export function MinimumOrderClient({ initialZones, defaultMinOrder }: { initialZones: any[], defaultMinOrder: number }) {
  const router = useRouter();
  const [zones, setZones] = useState(initialZones);`
);

code = code.replace(
  `<tbody className="divide-y divide-border">`,
  `<tbody className="divide-y divide-border">
          <ZoneRow 
            zone={{ id: "default", name: "Default (Rest of India)", state: "All unconfigured states", minimumOrder: defaultMinOrder }} 
            isSaving={isSaving === "default"} 
            onSave={handleUpdate} 
          />`
);

fs.writeFileSync(p, code);
console.log('Fixed MinimumOrderClient');
