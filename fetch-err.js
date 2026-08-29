fetch("http://localhost:3000/api/admin/test-checkout").then(r => r.json()).then(d => console.log(d.error));
